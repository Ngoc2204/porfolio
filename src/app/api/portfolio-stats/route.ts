import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const VISITORS_KEY = "ngoc-portfolio:visitors:v1";
const LIKES_KEY = "ngoc-portfolio:likes:v1";
const ACTIVE_KEY = "ngoc-portfolio:active:v1";
const ACTIVE_WINDOW_MS = 45_000;

type RedisResult = { result?: number | string | null; error?: string };
type Action = "visit" | "heartbeat" | "like" | "unlike";

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return { url: url.replace(/\/+$/, ""), token };
}

function getVisitorId(request: NextRequest, secret: string) {
  // Vercel overwrites x-forwarded-for with the public client IP.
  const ip = request.headers.get("x-forwarded-for")?.split(",", 1)[0]?.trim();
  if (!ip) return null;
  return createHmac("sha256", process.env.PORTFOLIO_STATS_IP_SECRET || secret)
    .update(ip)
    .digest("hex");
}

async function runPipeline(
  config: NonNullable<ReturnType<typeof getRedisConfig>>,
  commands: (string | number)[][],
) {
  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Stats storage request failed");

  const results = (await response.json()) as RedisResult[];
  const failed = results.find((item) => item.error);
  if (failed?.error) throw new Error("Stats storage command failed");
  return results.map((item) => item.result ?? null);
}

async function readStats(
  config: NonNullable<ReturnType<typeof getRedisConfig>>,
  visitorId: string,
) {
  const now = Date.now();
  const [active, visitors, likes, isLiked] = await runPipeline(config, [
    ["ZREMRANGEBYSCORE", ACTIVE_KEY, "-inf", now - ACTIVE_WINDOW_MS],
    ["ZCARD", ACTIVE_KEY],
    ["SCARD", VISITORS_KEY],
    ["SCARD", LIKES_KEY],
    ["SISMEMBER", LIKES_KEY, visitorId],
  ]).then((results) => [results[1], results[2], results[3], results[4]]);

  return {
    active: Number(active ?? 0),
    visitors: Number(visitors ?? 0),
    likes: Number(likes ?? 0),
    liked: Number(isLiked ?? 0) === 1,
  };
}

function unavailable() {
  return NextResponse.json(
    { enabled: false },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET(request: NextRequest) {
  const config = getRedisConfig();
  if (!config) return unavailable();

  const visitorId = getVisitorId(request, config.token);
  if (!visitorId) return unavailable();

  try {
    const stats = await readStats(config, visitorId);
    return NextResponse.json(stats, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return unavailable();
  }
}

export async function POST(request: NextRequest) {
  const config = getRedisConfig();
  if (!config) return unavailable();

  const visitorId = getVisitorId(request, config.token);
  if (!visitorId) return unavailable();

  let action: Action;
  try {
    const body = (await request.json()) as { action?: unknown };
    if (
      body.action !== "visit" &&
      body.action !== "heartbeat" &&
      body.action !== "like" &&
      body.action !== "unlike"
    ) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    action = body.action;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const now = Date.now();
    const commands: (string | number)[][] = [];
    if (action === "visit") commands.push(["SADD", VISITORS_KEY, visitorId]);
    if (action === "like") commands.push(["SADD", LIKES_KEY, visitorId]);
    if (action === "unlike") commands.push(["SREM", LIKES_KEY, visitorId]);
    if (action === "visit" || action === "heartbeat") {
      commands.push(["ZADD", ACTIVE_KEY, now, visitorId]);
      commands.push([
        "ZREMRANGEBYSCORE",
        ACTIVE_KEY,
        "-inf",
        now - ACTIVE_WINDOW_MS,
      ]);
    }
    await runPipeline(config, commands);

    const stats = await readStats(config, visitorId);
    return NextResponse.json(stats, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return unavailable();
  }
}
