import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        {/* 헤더 섹션(네이게이션바) */}
        <header>
          <nav className="bg-white shadow-md text-gray-700">
            <div className="container mx-auto flex justify-between items-center p-4">
              <div className="text-2xl font-bold">
                <Link href="/">KCU</Link>
              </div>
              <ul className="flex space-x-4 text-lg font-medium text-gray-700">
                <li>
                  <Link href="/aboutKCU" className="hover:text-blue-600">
                    About KCU
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-blue-600">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-blue-600">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-blue-600">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {/* 메인 섹션 */}
        <main className="flex-grow">{children}</main>

        {/* 푸터 섹션 */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">© 2024 KCU All rights reserved.</p>
            <p className="text-sm mt-2">
              Contact: kcumadison76@gmail.com | Instagram: @kcu_madison
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
