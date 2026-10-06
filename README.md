# Portfolio học sinh

Portfolio cá nhân một trang, responsive, có giao diện sáng/tối, dự án có bộ lọc và chi tiết, trợ lý trả lời mẫu, biểu mẫu liên hệ và khu vực ủng hộ.

## Chỉnh nội dung

Mở `src/lib/portfolio-data.ts` để thay:
- Tên, chữ viết tắt, email, lời giới thiệu và trạng thái hiện tại.
- Social links, đam mê, kỹ năng, dự án và timeline.
- Placeholder ngân hàng: `BANK_NAME`, `ACCOUNT_NUMBER`, `ACCOUNT_NAME`.

Thay ảnh `src/assets/student-avatar.jpg` bằng ảnh vuông của bạn và giữ nguyên tên tệp, hoặc sửa import trong trang chính. QR hiện chỉ là placeholder trang trí; thay khối QR trong `src/routes/index.tsx` bằng ảnh QR thật khi cần.

## Trợ lý hỏi đáp

Phiên bản hiện tại dùng câu trả lời mẫu cục bộ dựa trên dữ liệu portfolio, không gửi dữ liệu ra ngoài và không giả lập kết nối AI thật. Khi nối AI sau này, tạo một hàm server/điểm gọi phía máy chủ, giữ khóa trong Secrets và thay hàm `localAnswer` trong `src/components/PortfolioChat.tsx`. Không đặt khóa API trong mã giao diện.

## Chạy tại máy

```bash
bun install
bun run dev
```
