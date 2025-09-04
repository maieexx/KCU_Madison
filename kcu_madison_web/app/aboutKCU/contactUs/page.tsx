'use client';
import Link from 'next/link';
import '../../globals.css';

{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' },
  { href: '/aboutKCU', label: 'About KCU' },
  { href: '/aboutKCU/boardMembers', label: 'Board Members' },
  { href: '/aboutKCU/logo', label: 'Logo' },
  { href: '/aboutKCU/history', label: 'History' },
];

export default function contactUs() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">

      {/* Title Section */}
      <h1 
        className="font-title absolute top-4 left-4 md:top-[70px] md:left-[100px] text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] z-10" 
        style={{ color: '#F24D00' }}
      >
        Contact Us
      </h1>

      {/* Centered Contact Info */}
      <section 
        className="font-decor text-left space-y-2 md:space-y-4 absolute px-4 pt-24 sm:pt-32 md:pt-0 md:left-[220px] md:top-[300px] lg:left-[280px] xl:left-[320px] 2xl:left-[400px]"
        style={{ 
          color: 'var(--neongreen)', 
          fontSize: 'clamp(18px, 4vw, 50px)', 
          letterSpacing: 'clamp(1px, 0.3vw, 5px)' 
        }}
      >
        <p className="break-words">· E-mail: kcumadison.org@gmail.com</p>
        <p>· IG: @kcu_madison</p>
        <div>
          <p>· KakaoTalk</p>
          <p className='ml-4 md:ml-[120px]'>President:</p>
          <p className='ml-4 md:ml-[120px]'>Vice President:</p>
        </div>
      </section>

      {/* Desktop Navigation Section */}
      <div className='hidden 2xl:block'>
        <div className='white-line absolute right-[330px]'/>
        <nav className="absolute right-[50px] top-[30px]">
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
      </div>

      {/* Mobile Navigation */}
      <nav className="2xl:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--foreground)] p-4 z-20">
        <ul className="flex justify-around items-center font-decor text-sm md:text-base">
          {NAVIGATION_LINKS.map(({ href, label, mobileLabel }) => (
            <li key={href}>
              <Link 
                href={href} 
                className="hover:text-[var(--hover-orange)] transition-colors duration-200 px-2 py-1"
              >
                {mobileLabel || label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}