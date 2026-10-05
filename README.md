# Portfolio Nguyễn Tất Ngọc

Portfolio Next.js với bàn phím 3D Spline, cuộn GSAP và giao diện từ [Naresh Khatri](https://github.com/Naresh-Khatri/3d-portfolio). Lịch sử Git gốc đã được xóa.

## Chạy dự án

```sh
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Deploy lên Vercel

Ứng dụng dùng Next.js server và API route, nên deploy dưới dạng Next.js project, không dùng static export. Có thể import repo từ GitHub trong Vercel, hoặc deploy trực tiếp từ thư mục local bằng CLI:

```sh
npx vercel login
npx vercel
npx vercel --prod
```

Lệnh đầu tạo preview để kiểm tra; lệnh cuối đưa bản hiện tại lên production. Khi hỏi framework, chọn Next.js. Build và install command có thể để Vercel tự nhận diện từ `pnpm-lock.yaml`. Dự án không cần biến môi trường để chạy mặc định: form liên hệ mở email, WebSocket và analytics tắt. Nếu cần đổi canonical URL hoặc dùng domain riêng, đặt `NEXT_PUBLIC_SITE_URL=https://ten-mien-cua-ban` trong Project Settings → Environment Variables rồi deploy lại. Trên Vercel, domain production được phát hiện tự động.

Render cũng chạy được dưới dạng Node Web Service với Build Command `pnpm install --frozen-lockfile && pnpm build` và Start Command `pnpm start`.

Nội dung cá nhân nằm ở src/data/config.ts, constants.ts, projects.tsx và src/components/sections/about.tsx. CV: public/NGUYENTATNGOC_FULLSTACK.pdf.

Form liên hệ mặc định mở ứng dụng email để người dùng tự gửi. Muốn gửi qua Resend, cấu hình .env.local theo .env.example, đặt NEXT_PUBLIC_CONTACT_MODE=resend, RESEND_API_KEY và RESEND_FROM_EMAIL với tên miền đã xác minh.

Bàn phím dùng model Spline của template, có logo được gắn sẵn. Các công nghệ bổ sung được hiển thị dưới bàn phím; thay toàn bộ logo cần chỉnh model Spline. Ảnh bìa dự án là hình minh họa, không phải ảnh chụp sản phẩm.
