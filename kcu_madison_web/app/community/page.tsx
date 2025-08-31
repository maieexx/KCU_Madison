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

      {/* Right Navigation Section */}
      <div className='white-line absolute right-[330px]'/>
      <nav className="absolute right-[50px] top-[200px] -translate-y-[180px] overflow-hidden">
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