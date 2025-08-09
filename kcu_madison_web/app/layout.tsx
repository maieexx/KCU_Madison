import './globals.css';
import Footer from './components/footer/page';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full">
      <body className="flex flex-col min-h-screen">
        {/* 메인 섹션 */}
        <main className="flex-grow">{children}</main>

        {/* 푸터 섹션 */}
        <Footer />
      </body>
    </html>
  );
}
