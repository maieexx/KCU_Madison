'use client';
import Link from 'next/link';
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
    <main className="min-h-screen bg-black text-white relative">

      {/* Title Section */}
      <h1 className="font-title absolute top-[70px] left-[100px]" style={{ color: '#F24D00' }}>
        Contact Us
      </h1>

      {/* Centered Contact Info */}
      <section style={{ color: '#21FF58', fontSize: '50px', letterSpacing: '5px' }} className="font-decor text-left space-y-4 absolute left-[220px] top-[300px]">
        <p>· E-mail: kcumadison.org@gmail.com</p>
        <p>· IG: @kcu_madison</p>
        <div>
          <p>· KakaoTalk</p>
          <p className='ml-[120px]'>President:</p>
          <p className='ml-[120px]'>Vice President:</p>
        </div>
      </section>


    {/* Right Navigation Section */}
    <div className='white-line absolute right-[330px]'/>
      <nav className="absolute right-[50px] top-[200px] -translate-y-1/2 overflow-hidden">
        <ul className="font-decor text-right" style={{ fontSize: 35 }}>
          {NAVIGATION_LINKS.map(({ href, label }, idx) => (
            <li key={href} className={idx === 0 ? '' : 'mt-[20px]'}>
              <Link href={href} className="hover:text-[var(--hover-orange)] page-nav block">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}