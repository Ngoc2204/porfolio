import SectionWrapper from "../ui/section-wrapper";

export default function AboutSection() {
  return <SectionWrapper id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
    <div className="grid items-center gap-12 md:grid-cols-[1fr_2fr]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/nguyen-tat-ngoc.jpg" alt="Nguyễn Tất Ngọc" width={360} height={440} className="mx-auto aspect-[4/5] w-full max-w-xs rounded-3xl object-cover" />
      <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl md:p-10"><p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">Giới thiệu · TP. Hồ Chí Minh</p><h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">Từ kiến trúc hệ thống đến trải nghiệm người dùng.</h2><p className="leading-8 text-muted-foreground">Tôi là Nguyễn Tất Ngọc, Full-Stack Software Engineer. Tôi xây dựng ứng dụng web và di động với TypeScript, Next.js, NestJS, Laravel và Flutter, tập trung vào hiệu năng, bảo mật và khả năng vận hành thực tế.</p><div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6"><h3 className="mb-2 text-lg font-semibold">Trường Đại học Công Thương TP.HCM · HUIT</h3><p className="text-muted-foreground">Kỹ thuật phần mềm · 10/2022–01/2026</p><p className="mt-2">Tốt nghiệp loại Giỏi · GPA 3.37/4 · Bảo vệ đồ án 8.8/10</p></div></div>
    </div>
  </SectionWrapper>;
}
