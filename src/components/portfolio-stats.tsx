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
  const [checked, setChecked] = useState(false);
  const alive = useRef(false);

  const send = useCallback(async (action: Action) => {
    const nextStats = await updateStats(action).catch(() => null);
    if (alive.current) {
      setChecked(true);
      if (nextStats) setStats(nextStats);
    }
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

  const number = (value: number) => new Intl.NumberFormat("vi-VN").format(value);
  const displayNumber = (value?: number) => value === undefined ? "—" : number(value);
  const metricClass = "inline-flex items-center gap-1.5 whitespace-nowrap";
  const status = stats
    ? "Đang cập nhật theo IP đã băm"
    : checked
      ? "Thêm Upstash Redis trên Vercel để bật số liệu"
      : "Đang kết nối bộ đếm";

  return (
    <div
      className="fixed bottom-4 right-4 z-[1001] flex max-w-[calc(100vw-2rem)] items-center justify-center gap-3 rounded-full border border-border/80 bg-background/95 px-3 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur sm:bottom-5 sm:right-5 sm:gap-4"
      aria-label="Thống kê người xem portfolio"
      title={status}
    >
      <span className={metricClass} aria-label={`${displayNumber(stats?.active)} người đang xem`}>
        <Activity className="size-3.5 text-emerald-500" aria-hidden="true" />
        {displayNumber(stats?.active)} đang xem
      </span>
      <span className={metricClass} aria-label={`${displayNumber(stats?.visitors)} lượt xem duy nhất`}>
        <Eye className="size-3.5" aria-hidden="true" />
        {displayNumber(stats?.visitors)} lượt xem
      </span>
      <button
        type="button"
        onClick={toggleLike}
        disabled={!stats || likePending}
        aria-pressed={stats?.liked ?? false}
        aria-label={stats?.liked ? `Đã thả tim, ${stats.likes} lượt` : `Thả tim, ${displayNumber(stats?.likes)} lượt`}
        className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-rose-500 disabled:cursor-wait"
      >
        <Heart
          className={`size-3.5 transition-transform ${stats?.liked ? "fill-rose-500 text-rose-500" : ""} ${likePending ? "scale-90" : ""}`}
          aria-hidden="true"
        />
        {displayNumber(stats?.likes)} tim
      </button>
      <span className="sr-only" aria-live="polite">{status}</span>
    </div>
  );
}
