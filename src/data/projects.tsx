import { ReactNode } from "react";
import Link from "next/link";
import { SiNextdotjs, SiReact, SiTypescript, SiNestjs, SiPostgresql, SiPrisma, SiRedis, SiDocker, SiLaravel, SiFlutter, SiMysql, SiPython, SiScikitlearn, SiPandas } from "react-icons/si";

export type Skill = { title:string; bg:string; fg:string; icon:ReactNode; };
export type Project = { id:string; category:string; title:string; src:string; screenshots:string[]; skills:{frontend:Skill[];backend:Skill[]}; content:ReactNode; github?:string; live:string; };
const chip=(title:string, icon:ReactNode):Skill=>({title,icon,bg:"black",fg:"white"});
const ProjectText=({children}:{children:ReactNode})=><div className="space-y-5 text-base leading-relaxed text-muted-foreground">{children}</div>;
const profile=<Link href="https://github.com/Ngoc2204" target="_blank" rel="noopener noreferrer" className="inline-block underline underline-offset-4">GitHub cá nhân ↗</Link>;
const projects:Project[]=[
 { id:"uply",category:"SaaS Monorepo · 2026",title:"UPLY",src:"/assets/projects-screenshots/ngoc/uply.svg",screenshots:[],live:"https://uply-web.vercel.app/",
 skills:{frontend:[chip("TypeScript",<SiTypescript/>),chip("Next.js",<SiNextdotjs/>),chip("React",<SiReact/>)],backend:[chip("NestJS",<SiNestjs/>),chip("PostgreSQL",<SiPostgresql/>),chip("Prisma",<SiPrisma/>),chip("Redis / BullMQ",<SiRedis/>),chip("Docker",<SiDocker/>)]},
 content:<ProjectText><h3 className="text-2xl font-bold text-foreground">Multi-Tenant Website & API Monitoring Platform</h3><p>Nền tảng SaaS cho doanh nghiệp và agency giám sát uptime HTTP 24/7, kiểm thử API nhiều bước (multi-step API journeys) và tự động cảnh báo sự cố.</p><ul className="list-disc space-y-3 pl-5"><li>Kiến trúc Turborepo tách biệt Next.js Dashboard, NestJS REST API và Autonomous Background Worker.</li><li>BullMQ + Redis lập lịch health check định kỳ và thực thi assertions.</li><li>Mã hóa AES-256-GCM cho API credentials, signed HttpOnly cookies; Row-level Multi-tenancy trên PostgreSQL qua Prisma ORM.</li><li>Docker Compose, Caddy Auto SSL và zero-downtime deployment pipelines.</li></ul><Link href="https://uply-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block underline underline-offset-4">Trải nghiệm Live Demo ↗</Link><div>{profile}</div></ProjectText>},
 {id:"conduct",category:"Khóa luận · Lead Developer · 2025",title:"Hệ thống quản lý điểm rèn luyện",src:"/assets/projects-screenshots/ngoc/conduct.svg",screenshots:[],live:"",
 skills:{frontend:[chip("Flutter",<SiFlutter/>)],backend:[chip("Laravel",<SiLaravel/>),chip("MySQL",<SiMysql/>)]},
 content:<ProjectText><h3 className="text-2xl font-bold text-foreground">Số hóa quy trình đánh giá điểm rèn luyện</h3><p>Đảm nhiệm vai trò Lead Developer, dẫn dắt đội ngũ số hóa toàn bộ quy trình đánh giá điểm rèn luyện của trường đại học bằng Web Admin dashboard và Flutter mobile app.</p><p>Stack: Laravel, Flutter, MySQL, REST API và GetX.</p><p className="text-xl font-semibold text-foreground">Điểm bảo vệ khóa luận: 8.8 / 10.0</p>{profile}</ProjectText>},
 {id:"recommendation",category:"Nghiên cứu khoa học · HUIT",title:"Gợi ý hoạt động bằng Machine Learning",src:"/assets/projects-screenshots/ngoc/recommendation.svg",screenshots:[],live:"",
 skills:{frontend:[],backend:[chip("Python",<SiPython/>),chip("Scikit-learn",<SiScikitlearn/>),chip("Pandas",<SiPandas/>)]},
 content:<ProjectText><h3 className="text-2xl font-bold text-foreground">Cá nhân hóa hoạt động ngoại khóa</h3><p>Đề tài nghiên cứu khoa học ứng dụng Machine Learning để phân tích sở thích và cá nhân hóa gợi ý hoạt động ngoại khóa cho sinh viên.</p><p>Được tuyển chọn vào vòng chung kết cấp khoa CNTT, Trường Đại học Công Thương TP.HCM (HUIT).</p><p>Stack: Python, Scikit-learn, Pandas và các thuật toán Machine Learning.</p></ProjectText>},
];
export default projects;

