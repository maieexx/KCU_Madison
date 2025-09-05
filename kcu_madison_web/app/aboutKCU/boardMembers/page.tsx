'use client';
import Link from 'next/link';
import '../../globals.css';

const MEMBERS_TOP = [
  { title: 'President' },
  { title: 'Vice President' },
  { title: 'Treasurer' },
  { title: `Event\nCoordinator` },
  { title: `Operation\nCoordinator` },
];

const MEMBERS_BOTTOM = [
  { title: 'S/W Coordinator' },
  { title: 'S/W Coordinator' },
  { title: 'S/W Coordinator' },
  { title: 'S/W Coordinator' },
];

const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' },
  { href: '/aboutKCU', label: 'About KCU' },
  { href: '/aboutKCU/logo', label: 'Logo' },
  { href: '/aboutKCU/history', label: 'History' },
  { href: '/aboutKCU/contactUs', label: 'Contact Us' },
];

export default function BoardMembers() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      
      {/* Title Section */}
      <div className="absolute top-4 left-4 md:top-[70px] md:left-[100px] z-10">
        <h1 
          style={{ 
            color: '#F24D00',
            fontSize: 'clamp(2rem, 5vw, 6.25rem)' // 32px → 100px
          }}
          className="font-title"
        >
          Board Members
        </h1>
      </div>

      {/* Main Content Section */}
      <div 
        className="flex justify-start"
        style={{
          paddingTop: 'clamp(1.5rem, 12vw, 14rem)',  // 24px → 220px
          paddingLeft: 'clamp(0.25rem, 10vw, 12rem)', // 4px → 190px
          paddingRight: 'clamp(0.25rem, 5vw, 12rem)',
          paddingBottom: 'clamp(8rem, 20vw, 17rem)', // 128px → 275px
        }}
      >        
        {/* Members Container */}
        <div 
          className="w-full flex flex-col items-start"
          style={{ 
            gap: 'clamp(1rem, 4vw, 4rem)',
            marginTop: 'clamp(4rem, 8vw, 10rem)'
          }} // vertical spacing
        >
          
          {/* Top Row */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            style={{ gap: 'clamp(0.5rem, 5vw, 5rem)' }} // grid gap
          >
            {MEMBERS_TOP.map(({ title }, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="green-square" />
                <p 
                  className="font-title text-center whitespace-pre-line text-[var(--neongreen)]"
                  style={{
                    fontSize: 'clamp(0.75rem, 2vw, 1.25rem)', // 12px → 20px
                    marginTop: 'clamp(0.25rem, 1vw, 0.5rem)', // smooth spacing
                    lineHeight: 1.2
                  }}
                >
                  {title}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4"
            style={{ 
              gap: 'clamp(0.5rem, 5vw, 5rem)', 
              paddingLeft: 'clamp(0rem, 6vw, 7rem)'
            }}
          >
            {MEMBERS_BOTTOM.map(({ title }, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="green-square" />
                <p 
                  className="font-title text-center whitespace-pre-line text-[var(--neongreen)]"
                  style={{
                    fontSize: 'clamp(0.75rem, 2vw, 1.25rem)',
                    marginTop: 'clamp(0.25rem, 1vw, 0.5rem)',
                    lineHeight: 1.2
                  }}
                >
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="page-navigation">
        <div className="white-line" />
        <nav className="nav-orange">
          <ul>
            {NAVIGATION_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link 
                  href={href} 
                  className="page-nav block transition-colors duration-200"
                >
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
    </div>
  );
}
