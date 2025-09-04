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
          style={{ color: '#F24D00' }}
          className="font-title text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px]"
        >
          Board Members
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="px-1 sm:px-2 md:px-4 lg:px-[190px] pt-6 sm:pt-8 md:pt-10 lg:pt-[220px] pb-32 md:pb-48 lg:pb-[275px] flex justify-start">        
        {/* Members Container */}
        <div className="w-full flex flex-col items-start space-y-4 md:space-y-6 lg:space-y-16">
          
          {/* Top Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-20">
            {MEMBERS_TOP.map(({ title }, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="green-square" />
                <p className="font-title mt-2 text-[var(--neongreen)] text-center whitespace-pre-line text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight">
                  {title}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-20 ml-0 sm:ml-4 md:ml-12 lg:ml-24">
            {MEMBERS_BOTTOM.map(({ title }, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="green-square" />
                <p className="font-title mt-2 text-[var(--neongreen)] text-center whitespace-pre-line text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight">
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

    </div>
  );
}