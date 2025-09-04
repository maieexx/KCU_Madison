'use client';
import Link from 'next/link';
import '../globals.css';

{/*
  IMPORTANT:
  To update the sign-up form link, please go to line 38!
*/}

{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' },
  { href: '/signup/winPage', label: 'WIN Sign-Up', mobileLabel: 'WIN Sign-Up' },
] as const;

export default function signUpPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      
      {/* Title Section */}
      <h1 
        className="font-title absolute top-4 left-4 md:top-[70px] md:left-[100px] z-10" 
        style={{ color: 'var(--yellow)' }}
      >
        Sign-Up
      </h1>

      {/* Sign-Up Page: Not Ready */}
      <p 
        className="font-decor absolute top-20 left-4 sm:top-24 sm:left-6 md:left-[130px] md:top-[230px] z-10" 
        style={{ 
          color: 'var(--pink)', 
          fontSize: 'clamp(18px, 4.5vw, 50px)' 
        }}
      >
        [ Sign-Up Form ]
      </p>
      
      {/* Pink Rectangle with responsive positioning and sizing */}
      <div 
        className="pink-rectangle absolute top-28 left-2 sm:top-32 sm:left-4 md:left-[60px] md:top-[280px] lg:left-[120px] lg:top-[300px] px-1 sm:px-2 z-10"
        style={{
          width: 'clamp(360px, 92vw, 1180px)',
          height: 'clamp(320px, 55vh, 450px)',
          maxWidth: 'calc(100vw - 24px)'
        }}
      >
        <p 
          className="font-decor mt-3 sm:mt-4 md:mt-[12px] lg:mt-[10px] ml-3 sm:ml-4 md:ml-[24px] lg:ml-[80px] text-white leading-tight"
          style={{ fontSize: 'clamp(18px, 4vw, 85px)' }}
        >
          Sorry!!<br />
          We are not accepting<br />
          new members at this time.
        </p>

        {/*
          Sign-Up Page: Not Ready 섹션 주석 처리 하시고
          Sign-Up Page: When the Sign-Up Form is ready 아래 내용 주석 해제하시고
          내부 google doc 링크만 복붙하시면 됩니다!!
        */}

        {/* Sign-Up Page: When the Sign-Up Form is ready */}
        {/* <div className="font-decor mt-[10px] text-center" style={{ fontSize: 'clamp(20px, 6vw, 80px)', color: 'white' }}>
          <p>Click here to join the KCU!!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(50px, 15vw, 200px)' }}>
            <span>⇩</span>
            <span>⇩</span>
          </div>
        </div> */}

        {/* <a
          href="https://docs.google.com/forms/d/1qsmoWASdvBehrFeqIYWHMvF7brHCSpX6apoWsVoPcx8/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="font-decor ml-[340px] mt-[80px] text-center underline hover:text-[var(--yellow)] blink-yellow"
          style={{ fontSize: 'clamp(20px, 6vw, 80px)'}}
        >
        ☆ Sign-Up Link ☆
        </a> */}
      </div>

      {/* Desktop Navigation using existing page-navigation component */}
      <div className="page-navigation">
        <div className="white-line" />
        <nav>
          <ul>
            {NAVIGATION_LINKS.map(({ href, label }, idx) => (
              <li key={href} className={idx === 0 ? '' : 'mt-[20px]'}>
                <Link 
                  href={href} 
                  className="page-nav block"
                  style={{ '--nav-hover-color': 'var(--yellow)' } as React.CSSProperties}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <nav className="2xl:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--foreground)] p-4 z-20 mobile-nav">
        <ul className="flex justify-around items-center font-sub">
          {NAVIGATION_LINKS.map(({ href, label, mobileLabel }) => (
            <li key={href}>
              <Link 
                href={href} 
                className="nav-link transition-colors duration-200 px-2 py-1 text-xs sm:text-sm"
                style={{ '--nav-hover-color': 'var(--yellow)' } as React.CSSProperties}
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