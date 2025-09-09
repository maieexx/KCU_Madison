'use client';
import Link from 'next/link';
import Image from 'next/image';
import '../../globals.css';

const CORRECT_LOGOS = [
  {
    src: '/assets/logo_original.png',
    alt: 'Original Logo',
    label: '☑ original',
  },
  {
    src: '/assets/kcu_white.png',
    alt: 'Dark Mode',
    label: '☑ darkmode',
  },
];

const INCORRECT_LOGOS = [
  { src: '/assets/logo_keepcol.png', alt: 'Red Logo' },
  { src: '/assets/logo_keepcol2.png', alt: 'Black Logo' },
  { src: '/assets/logo_dontfillwhite.png', alt: 'Filled Logo' },
];

const COLOR_CODES = [
  { color: '#c5050c', label: '#c5050c' },
  { color: '#000000', label: '#000000' },
  { color: '#ffffff', label: '#ffffff' },
];

const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' },
  { href: '/aboutKCU', label: 'About KCU' },
  { href: '/aboutKCU/boardMembers', label: 'Board Members' },
  { href: '/aboutKCU/history', label: 'History' },
  { href: '/aboutKCU/contactUs', label: 'Contact Us' },
];

export default function LogoPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* Title Section */}
      <div className="absolute top-4 left-4 md:top-[70px] md:left-[100px] z-10">
        <h1 
          className="font-title"
          style={{ 
            color: '#F24D00',
            fontSize: 'clamp(2.5rem, 5vw, 6.25rem)' // 40px → 100px
          }}
        >
          Logo
        </h1>
      </div>

      {/* Main Content Section */}
      <div
        className="flex flex-col justify-start"
        style={{
          padding: 'clamp(20px, 5vh, 50px) clamp(16px, 5vw, 120px)',
          paddingRight: 'clamp(16px, 25vw, 400px)', // Increased right padding to avoid navigation
          paddingBottom: 'clamp(60px, 15vh, 200px)', // Increased bottom padding
          gap: 'clamp(24px, 5vw, 48px)',
          marginTop: 'clamp(10px, 18vh, 180px)',
        }}
      >        
        {/* Correct Use Section with Color Code */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
          
          {/* Correct Use Section */}
          <div 
            className="border-2 lg:border-3 border-[var(--neongreen)] p-4 md:p-6 lg:p-8"
            style={{
              width: 'clamp(100%, 45vw, 600px)',
              maxWidth: '100%'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 items-start">
              {CORRECT_LOGOS.map((logo) => (
                <div key={logo.src} className="flex flex-col items-center space-y-2">
                  <div className="relative w-full max-w-[150px] md:max-w-[200px] lg:max-w-[250px]">
                    <Image
                      src={logo.src}
                      width={250}
                      height={300}
                      alt={logo.alt}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="font-decor text-[var(--neongreen)] text-center text-lg md:text-xl lg:text-2xl xl:text-[25px]">
                    {logo.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Code Section */}
          <div 
            className="flex-shrink-0"
            style={{
              width: 'clamp(250px, 25vw, 350px)'
            }}
          >
            <h2 className="font-decor text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[40px] mb-4">
              color code:
            </h2>
            <div className="space-y-3">
              {COLOR_CODES.map((item) => (
                <div key={item.label} className="flex items-center space-x-4">
                  <div 
                    className="w-6 h-6 md:w-8 md:h-8 border-2 border-white"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-decor text-sm md:text-base lg:text-lg xl:text-xl">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Incorrect Use Section */}
        <div 
          className="border-2 lg:border-3 border-[#D10000] p-4 md:p-6 lg:p-8"
          style={{
            width: 'clamp(100%, 70vw, 900px)',
            maxWidth: '100%'
          }}
        >
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 items-center mb-6">
            {INCORRECT_LOGOS.map((logo) => (
              <div key={logo.src} className="flex flex-col items-center">
                <div className="relative w-full max-w-[150px] md:max-w-[200px] lg:max-w-[250px]">
                  <Image
                    src={logo.src}
                    width={300}
                    height={250}
                    alt={logo.alt}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Warning Messages - Responsive Layout */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-start">
            <p 
              className="font-decor text-[#D10000] text-center lg:text-left"
              style={{
                fontSize: 'clamp(14px, 2vw, 25px)',
                marginLeft: 'clamp(0px, 5vw, 80px)'
              }}
            >
              ☒ do not change the color of the border
            </p>
            <p 
              className="font-decor text-[#D10000] text-center lg:text-left"
              style={{
                fontSize: 'clamp(14px, 2vw, 25px)',
                marginLeft: 'clamp(0px, 23vw, 400px)'
              }}
            >
              ☒ do not fill the logo
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="page-navigation">
        <div className='white-line absolute' style={{ right: 'clamp(100px, 20vw, 330px)' }}/>
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