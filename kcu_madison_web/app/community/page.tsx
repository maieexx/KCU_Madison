'use client';
import Link from 'next/link';
import '../globals.css';

export default function Community() {
  return (
    <main className="min-h-screen relative">
      {/* Title Section */}
      <h1 className="font-title absolute top-[70px] left-[100px]" style={{ color: '#17B74C' }}>
          Community
      </h1>

      {/* Main Section */}
      <div className="font-decor absolute left-[220px] top-[300px]" style={{ fontSize: '60px'}}>
        Comming Soon!
      </div>
      <div className="font-decor absolute left-[600px] top-[300px]" style={{ fontSize: '60px', color: 'var(--magenta)' }}>
      ⌘⌘
      </div>

      {/* Right Navigation Section */}
      <nav className="absolute right-[50px] top-[30px]">
        <ul className="font-decor text-right" style={{ fontSize: 35 }}>
            <li>
              <Link href="/" className="hover:text-[#17B74C] page-nav block">
                ⏎
              </Link>
            </li>
        </ul>
      </nav>
    </main>
  );
}