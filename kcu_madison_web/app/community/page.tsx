'use client';
import Link from 'next/link';
import '../globals.css';

// Navigation links for mobile
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' },
] as const;

export default function Community() {
  return (
    <main className="min-h-screen relative overflow-x-hidden pb-28"> 
      {/* Title Section */}
      <h1 
        className="font-title absolute top-4 left-4 md:top-[70px] md:left-[100px] z-10" 
        style={{ color: 'var(--green)' }}
      >
        Community
      </h1>

      {/* Coming Soon Text */}
      <div 
        className="font-decor absolute top-48 left-4 sm:top-60 sm:left-8 md:top-[300px] md:left-[220px] z-10" 
        style={{ 
          fontSize: 'clamp(24px, 6vw, 60px)',
          color: 'var(--foreground)'
        }}
      >
        Coming Soon!
      </div>

      {/* Symbols */}
      <div 
        className="font-decor absolute top-48 right-4 sm:top-60 sm:right-8 md:top-[300px] md:left-[600px] z-10" 
        style={{ 
          fontSize: 'clamp(24px, 6vw, 60px)', 
          color: 'var(--magenta)' 
        }}
      >
        ⌘⌘
      </div>

      {/* Desktop Navigation */}
      <div className="page-navigation">
        <nav>
          <ul>
            <li>
              <Link 
                href="/" 
                className="page-nav block"
                style={{ '--nav-hover-color': 'var(--green)' } as React.CSSProperties}
              >
                ⏎
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation (over footer, fixed) */}
      <nav className="2xl:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--foreground)] p-4 z-30 mobile-nav">
        <ul className="flex justify-around items-center font-sub">
          {NAVIGATION_LINKS.map(({ href, label, mobileLabel }) => (
            <li key={href}>
              <Link 
                href={href} 
                className="nav-link transition-colors duration-200 px-2 py-1 text-xs sm:text-sm"
                style={{ '--nav-hover-color': 'var(--green)' } as React.CSSProperties}
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
