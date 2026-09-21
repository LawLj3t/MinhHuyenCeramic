# Minh Huyền Ceramic - Tinh Hoa Gốm Sứ Bát Tràng 700 Năm

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/LawLj3t/MinhHuyenCeramic)

Website thương mại điện tử chuyên biệt cho xưởng gốm thủ công cao cấp Bát Tràng — **Minh Huyền Ceramic**. Kết hợp hoàn hảo giữa nét vương giả Á Đông, phong thủy truyền thống và trải nghiệm mua sắm hiện đại.

---

## 🌟 Tính Năng Nổi Bật

- **Nghệ thuật & Nhận diện Bát Tràng**: Hệ thống artwork SVG vẽ tay độc bản (hoa văn sóng nước, mây sen, triện son đỏ, họa tiết rồng phượng, men rạn ngàn sợi).
- **Bộ sưu tập gốm sứ tinh tuyển**: 
  - Đồ thờ cúng men rạn dát vàng hoàng gia
  - Bộ ấm chén tử sa & hoàng gia nung củi 1300°C khử chì hoàn toàn
  - Bình hút tài lộc phong thủy chiêu tài tấn bảo
  - Lộc bình phong thủy tứ quý, thuận buồm xuôi gió
  - Tượng phong thủy gốm sứ thế thiêng
- **Cố vấn Phong Thủy thông minh**: Tự động tra cứu bản mệnh (Kim, Mộc, Thủy, Hỏa, Thổ) theo năm sinh để gợi ý màu men và thế gốm phù hợp.
- **Giỏ hàng & Khuyến mãi linh hoạt**: 
  - Cart Drawer mượt mà trượt từ cạnh phải
  - Tự động miễn phí vận chuyển cho đơn hàng từ 1.500.000₫
  - Mã ưu đãi `BATTRANG10` (giảm 10%) và `MINHHUYEN` (giảm 100.000₫)
- **Thanh toán VietQR động**: Tự động sinh mã QR chuẩn Napas247 chứa số tài khoản, số tiền và nội dung chuyển khoản tức thì kèm hiệu ứng pháo hoa Confetti khi đặt hàng thành công.
- **Tra cứu hành trình đơn hàng**: Khách hàng có thể kiểm tra trạng thái đơn qua mã đơn hàng hoặc số điện thoại.
- **Bảng điều khiển Quản trị (Admin Dashboard)**: Theo dõi doanh thu, số đơn, quản lý trạng thái tiếp nhận / chế tác / giao hàng và thêm mới sản phẩm gốm sứ.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + React 19
- **Bundler**: Webpack (được tối ưu cực nhanh 2.4s, chống tràn RAM trên hosting)
- **Styling**: Tailwind CSS v4, Glassmorphism & Oriental Luxury Design System
- **Icons**: Lucide React
- **Animations**: CSS Keyframes + Canvas Confetti
- **Typography**: Playfair Display (Serif vương giả) & Be Vietnam Pro (Sans thuần Việt)

---

## 🚀 Hướng Dẫn Triển Khai Lên Render.com (1-Click)

### Cách 1: Bấm nút 1-Click Deploy
Nhấp vào nút bên dưới:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/LawLj3t/MinhHuyenCeramic)

### Cách 2: Kết nối thủ công
1. Đăng nhập vào [Render Dashboard](https://dashboard.render.com/).
2. Chọn **New +** > **Blueprint**.
3. Kết nối với repo: `https://github.com/LawLj3t/MinhHuyenCeramic`.
4. Render sẽ tự động nạp file `render.yaml` và triển khai dịch vụ tại Region **Singapore**.

---

## 💻 Chạy Local (Môi Trường Phát Triển)

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy môi trường development
npm run dev

# 3. Build kiểm tra sản xuất
npm run build

# 4. Khởi chạy production server
npm start
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để trải nghiệm website.
