import "./globals.css";
import { OrderProvider } from "./context/OrderContext";
import Footer from "@/components/Footer";

export const metadata = {
  title: "드론 배송 주문",
  description: "드론 배송 주문 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <OrderProvider>
          {children}
          <Footer />
        </OrderProvider>
      </body>
    </html>
  );
}
