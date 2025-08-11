'use client';
import Link from 'next/link';
import Image from 'next/image';
import '../../globals.css';

export default function contactUs() {
  return (
    <div className="min-h-screen bg-black text-white relative">
        {/* Right Navigation Section */}
        <div className='white-line absolute right-[330px]'/>
        <div className='absolute right-[50px] top-[200px] transform -translate-y-1/2 overflow-hidden'>
            <nav className="clear-both relative">
            <ul style={{ fontSize: '35px' }} className="font-decor text-right">
                <li>
                <Link href="/" className="hover:text-[var(--hover-orange)] block">
                    ⏎
                </Link>
                </li>
                <li className="mt-[20px]">
                <Link href="/aboutKCU" className="hover:text-[var(--hover-orange)] page-nav block">
                    About KCU
                </Link>
                </li>
                <li className="mt-[20px]">
                <Link href="/aboutKCU/logo" className="hover:text-[var(--hover-orange)] page-nav block">
                    Logo
                </Link>
                </li>
                <li className="mt-[20px]">
                <Link href="/aboutKCU/history" className="hover:text-[var(--hover-orange)] page-nav block">
                    History
                </Link>
                </li>
                <li className="mt-[20px]">
                <Link href="/aboutKCU/history" className="hover:text-[var(--hover-orange)] page-nav block">
                    History
                </Link>
                </li>
            </ul>
            </nav>
        </div>
    </div>
  );
}