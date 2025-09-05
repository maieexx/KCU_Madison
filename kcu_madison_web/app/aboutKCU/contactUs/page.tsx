'use client';
import Link from 'next/link';
import '../../globals.css';

/* Right Navigation List */
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' },
  { href: '/aboutKCU', label: 'About KCU' },
  { href: '/aboutKCU/boardMembers', label: 'Board Members' },
  { href: '/aboutKCU/logo', label: 'Logo' },
  { href: '/aboutKCU/history', label: 'History' },
];

export default function ContactUs() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">

      {/* Title Section */}
      <h1 
        className="font-title absolute z-10"
        style={{ 
          color: '#F24D00',
          top: 'clamp(16px, 5vh, 70px)',
          left: 'clamp(16px, 5vw, 100px)',
          fontSize: 'clamp(2rem, 5vw, 6.25rem)' // responsive from ~32px to ~100px
        }}
      >
        Contact Us
      </h1>

      {/* Centered Contact Info */}
      <section 
        className="font-decor text-left space-y-2 md:space-y-4 absolute"
        style={{ 
          color: 'var(--neongreen)', 
          top: 'clamp(150px, 30vh, 300px)',
          left: 'clamp(16px, 15vw, 400px)',
          fontSize: 'clamp(18px, 4vw, 50px)',
          letterSpacing: 'clamp(1px, 0.3vw, 5px)',
          paddingTop: 'clamp(2rem, 5vh, 8rem)'
        }}
      >
        <p className="break-words">· E-mail: kcumadison.org@gmail.com</p>
        <p>· IG: @kcu_madison</p>
        <div>
          <p>· KakaoTalk</p>
          <p style={{ marginLeft: 'clamp(16px, 5vw, 120px)' }}>President:</p>
          <p style={{ marginLeft: 'clamp(16px, 5vw, 120px)' }}>Vice President:</p>
        </div>
      </section>

      {/* Desktop Navigation Section */}
      <div className='page-navigation'>
        <div className='white-line absolute' style={{ right: 'clamp(100px, 20vw, 330px)' }}/>
        <nav className="absolute" style={{ right: 'clamp(20px, 5vw, 50px)', top: 'clamp(20px, 3vh, 30px)' }}>
          <ul className="font-decor text-right" style={{ fontSize: 'clamp(20px, 2vw, 35px)', rowGap: 'clamp(10px, 2vh, 20px)' }}>
            {NAVIGATION_LINKS.map(({ href, label }, idx) => (
              <li key={href} style={{ marginTop: idx === 0 ? 0 : 'clamp(10px, 2vh, 20px)' }}>
                <Link href={href} className="hover:text-[var(--hover-orange)] page-nav block">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--foreground)] z-20"
        style={{
          padding: 'clamp(12px, 2vh, 16px)'
        }}
      >
        <ul 
          className="flex justify-around items-center font-decor"
          style={{
            fontSize: 'clamp(20px, 4vw, 30px)'
          }}
        >
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
