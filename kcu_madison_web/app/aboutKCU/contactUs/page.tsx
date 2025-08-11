'use client';
import Link from 'next/link';
import Image from 'next/image';
import '../../globals.css';


{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎' },
  { href: '/aboutKCU', label: 'About KCU' },
  { href: '/aboutKCU/boardMembers', label: 'Board Members' },
  { href: '/aboutKCU/logo', label: 'Logo' },
  { href: '/aboutKCU/history', label: 'History' },
];

export default function contactUs() {
  return (
    <div className="min-h-screen bg-black text-white relative">

    {/* Title Section */}
    <div className="absolute top-[70px] left-[100px]">
        <h1 style={{ color: '#F24D00' }} className='font-title' >Contact Us</h1>
    </div>

      {/* Centered Contact Info */}
      <div style={{ color: '#21FF58', fontSize: '50px', letterSpacing: '5px' }} className="font-decor text-left space-y-4 absolute left-[220px] top-[300px]">
        <p>· E-mail: kcumadison.org@gmail.com</p>
        <p>· IG: @kcu_madison</p>
        <div>
          <p>· KakaoTalk</p>
          <p className='ml-[120px]'>President:</p>
          <p className='ml-[120px]'>Vice President:</p>
        </div>
      </div>






    {/* Right Navigation Section */}
    <div className='white-line absolute right-[330px]'/>
        <div className='absolute right-[50px] top-[200px] transform -translate-y-1/2 overflow-hidden'>
            <nav className="clear-both relative">
                <ul style={{ fontSize: '35px' }} className="font-decor text-right">
                    {NAVIGATION_LINKS.map(({ href, label }, idx) => (
                        <li key={href} className={idx === 0 ? '' : 'mt-[20px]'}>
                            <Link href={href} className="hover:text-[var(--hover-orange)] page-nav block">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </div>
  );
}