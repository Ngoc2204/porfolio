"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Activity, Eye, Heart } from "lucide-react";

type Stats = { active: number; visitors: number; likes: number; liked: boolean };
type Action = "visit" | "heartbeat" | "like" | "unlike";

async function updateStats(action: Action): Promise<Stats | null> {
  const response = await fetch("/api/portfolio-stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
    cache: "no-store",
  });
  if (!response.ok) return null;
  return (await response.json()) as Stats;
}

export default function PortfolioStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [likePending, setLikePending] = useState(false);
  const alive = useRef(false);

  const send = useCallback(async (action: Action) => {
    const nextStats = await updateStats(action).catch(() => null);
    if (alive.current && nextStats) setStats(nextStats);
    return nextStats;
  }, []);

  useEffect(() => {
    alive.current = true;
    void send("visit");
    const heartbeat = window.setInterval(() => void send("heartbeat"), 20_000);
    return () => {
      alive.current = false;
      window.clearInterval(heartbeat);
    };
  }, [send]);

  const toggleLike = async () => {
    if (!stats || likePending) return;
    setLikePending(true);
    await send(stats.liked ? "unlike" : "like");
    setLikePending(false);
  };

  if (!stats) return null;

  const number = (value: number) => new Intl.NumberFormat("vi-VN").format(value);
  const metricClass = "inline-flex items-center gap-1.5 whitespace-nowrap";

  return (
    <div
      className="flex items-center justify-center gap-3 rounded-full border border-border/70 bg-background/75 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur sm:gap-4"
      aria-label="Thống kê người xem portfolio"
      title="Số lượt xem và thả tim được khử trùng lặp theo IP đã băm"
    >
      <span className={metricClass} aria-label={`${stats.active} người đang xem`}>
        <Activity className="size-3.5 text-emerald-500" aria-hidden="true" />
        {number(stats.active)} đang xem
      </span>
      <span className={metricClass} aria-label={`${stats.visitors} lượt xem duy nhất`}>
        <Eye className="size-3.5" aria-hidden="true" />
        {number(stats.visitors)} lượt xem
      </span>
      <button
        type="button"
        onClick={toggleLike}
        disabled={likePending}
        aria-pressed={stats.liked}
        aria-label={stats.liked ? `Đã thả tim, ${stats.likes} lượt` : `Thả tim, ${stats.likes} lượt`}
        className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-rose-500 disabled:cursor-wait"
      >
        <Heart
          className={`size-3.5 transition-transform ${stats.liked ? "fill-rose-500 text-rose-500" : ""} ${likePending ? "scale-90" : ""}`}
          aria-hidden="true"
        />
        {number(stats.likes)} tim
      </button>
    </div>
  );
}
