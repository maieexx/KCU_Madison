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

      <div 
        className="flex justify-start px-2 pb-[50px] sm:px-4 md:px-[100px] lg:px-[120px] pt-12 sm:pt-16 md:pt-[210px] lg:pt-[230px] lg:pb-[80px] xl:pb-[118px]"
      > 
      {/* Pink Rectangle with responsive positioning and sizing */}
        <div 
            className="pink-rectangle relative p-2 sm:p-3 mt-20 md:p-4 lg:p-6 xl:p-8"
        >
          <p 
            className="font-decor text-white leading-tight"
            style={{ 
              fontSize: 'clamp(16px, 4vw, 85px)',
              marginTop: 'clamp(8px, 2vh, 20px)',
              marginLeft: 'clamp(12px, 4vw, 80px)'
            }}
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
          {/* <div className="font-decor text-center" style={{ 
            fontSize: 'clamp(18px, 5vw, 80px)', 
            color: 'white',
            marginTop: 'clamp(8px, 2vh, 20px)'
          }}>
            <p>Click here to join the KCU!!</p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 'clamp(30px, 10vw, 200px)',
              marginTop: 'clamp(8px, 2vh, 16px)'
            }}>
              <span>⇩</span>
              <span>⇩</span>
            </div>
          </div> */}

          {/* <a
            href="https://docs.google.com/forms/d/1qsmoWASdvBehrFeqIYWHMvF7brHCSpX6apoWsVoPcx8/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="font-decor text-center underline hover:text-[var(--yellow)] blink-yellow block"
            style={{ 
              fontSize: 'clamp(18px, 5vw, 80px)',
              marginTop: 'clamp(16px, 4vh, 80px)',
              marginLeft: 'clamp(100px, 25vw, 340px)'
            }}
          >
          ☆ Sign-Up Link ☆
          </a> */}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="page-navigation">
        <div className="white-line absolute" />
        <nav className="nav-yellow">
          <ul>
            {NAVIGATION_LINKS.map(({ href, label }) => (
              <li key={href}>
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
                className="hover:text-[var(--yellow)] transition-colors duration-200 px-2 py-1"
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