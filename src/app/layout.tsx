import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "600", "700", "900"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Minh Huyền Ceramic - Tinh Hoa Gốm Sứ Bát Tràng 700 Năm",
  description: "Xưởng gốm thủ công Bát Tràng cao cấp: Đồ thờ cúng men rạn dát vàng, bộ ấm chén hoàng gia, bình hút lộc phong thủy, nung củi 1300°C khử chì hoàn toàn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF7F2] text-[#2A2421] selection:bg-[#B8860B]/20 selection:text-[#8B1E1F]">
        {children}
      </body>
    </html>
  );
}
