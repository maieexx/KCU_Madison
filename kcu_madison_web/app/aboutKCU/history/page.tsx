'use client';
import Link from 'next/link';
import '../../globals.css';

const HISTORY_EVENTS = [
  {
    year: '22 FA',
    title: 'Established KCU',
    position: 'left'
  },
  {
    year: '24 FA', 
    title: 'Registered as an official\nUW-Madison CS club',
    position: 'center'
  },
  {
    year: '25 SP',
    title: 'Created KCU\nofficial website', 
    position: 'right'
  },
  {
    year: '25 FA',
    title: 'Future Plans',
    position: 'end'
  }
];

const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' },
  { href: '/aboutKCU', label: 'About KCU' },
  { href: '/aboutKCU/boardMembers', label: 'Board Members' },
  { href: '/aboutKCU/logo', label: 'Logo' },
  { href: '/aboutKCU/contactUs', label: 'Contact Us' },
];

export default function History() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* Title Section */}
      <div className="absolute top-4 left-4 md:top-[70px] md:left-[100px] z-10">
        <h1 
          style={{ color: '#F24D00' }}
          className="font-title text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px]"
        >
          History
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="px-[30px] sm:px-[50px] md:px-[120px] lg:px-[280px] pt-[100px] sm:pt-[100px] md:pt-[200px] lg:pt-[450px] pb-24 md:pb-64 lg:pb-[400px] xl:pb-[450px] flex justify-center">
        
        {/* Timeline Container */}
        <div className="w-full max-w-5xl">
          
          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {HISTORY_EVENTS.map((event, idx) => (
              <div key={event.year} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-[var(--neongreen)] rounded-full"></div>
                  {idx < HISTORY_EVENTS.length - 1 && (
                    <div className="w-0.5 h-16 bg-[var(--neongreen)] mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-decor text-2xl md:text-3xl text-[var(--neongreen)] mb-2">
                    {event.year}
                  </div>
                  <div 
                    className="font-body text-sm md:text-base text-[var(--foreground)] leading-tight whitespace-pre-line"
                    style={{ fontSize: '14px', lineHeight: '18px' }}
                  >
                    {event.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            
            {/* Start Symbol */}
            <div className="absolute left-0 top-1/2 transform  -translate-x-[65px] -translate-y-1/2 text-[var(--neongreen)] font-decor" style={{ fontSize: 'clamp(36px, calc(36px + (80 - 36) * ((100vw - 1024px) / (1280 - 1024))), 60px)' }}>
              ǁ
            </div>

            {/* Main Timeline Line */}
            <div className="relative mx-4 -translate-x-[70px] translate-y-2">
              <div 
                className="h-2 border-t-8 border-dashed border-[var(--neongreen)]"
                style={{ 
                  marginTop: '1rem',
                  width: 'clamp(510px, calc(510px + (880 - 510) * ((100vw - 1024px) / (1280 - 1024))), 880px)'
                }}
              >
              </div>

              {/* Timeline Events */}
              <div className="absolute inset-0 flex justify-between items-center">
                
                {/* Event 1 - 22 FA */}
                <div className="absolute transform -translate-y-[40px]" style={{ left: 'calc(5% - 130px)' }}>
                  <div className="text-center mb-16">
                    <div 
                      className="font-body font-semibold text-[var(--foreground)] whitespace-pre-line mb-2"
                      style={{ fontSize: '16px', lineHeight: '20px' }}
                    >
                      Established KCU
                    </div>
                    <div className="font-decor text-[var(--neongreen)]" style={{ fontSize: 'clamp(40px, calc(40px + (48 - 40) * ((100vw - 1024px) / (1280 - 1024))), 40px)' }}>22 FA</div>
                  </div>
                </div>

                {/* Event 2 - 24 FA */}
                <div className="absolute transform -translate-x-1/2 -translate-y-[75px]" style={{ left: '50%' }}>
                  <div className="text-center mt-12">
                    <div 
                      className="font-body font-semibold text-[var(--foreground)] whitespace-pre-line"
                      style={{ fontSize: '16px', lineHeight: '20px' }}
                    >
                      {`Registered as an official
UW-Madison CS club`}
                    </div>
                    <div className="font-decor text-[var(--neongreen)] translate-y-[10px]" style={{ fontSize: 'clamp(40px, calc(40px + (48 - 40) * ((100vw - 1024px) / (1280 - 1024))), 40px)' }}>24 FA</div>
                    <div className="text-[var(--neongreen)] font-decor" style={{ fontSize: 'clamp(36px, calc(36px + (96 - 36) * ((100vw - 1024px) / (1280 - 1024))), 60px)' }}>◆</div>
                  </div>
                </div>

                {/* Event 3 - 25 SP */}
                <div className="absolute transform -translate-x-1/2 -translate-y-[35px]" style={{ left: '70%' }}>
                  <div className="text-center mb-16">
                    <div 
                      className="font-body font-semibold text-[var(--foreground)] whitespace-pre-line translate-y-[180px]"
                      style={{ fontSize: '16px', lineHeight: '20px' }}
                    >
                      {`Created KCU
official website`}
                    </div>
                    <div className="font-decor translate-y-[80px] text-[var(--neongreen)]" style={{ fontSize: 'clamp(40px, calc(40px + (48 - 40) * ((100vw - 1024px) / (1280 - 1024))), 40px)' }}>25 SP</div>
                  </div>
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-[var(--neongreen)] font-decor" style={{ fontSize: 'clamp(36px, calc(36px + (96 - 36) * ((100vw - 1024px) / (1280 - 1024))), 60px)' }}>◆</div>
                </div>

                {/* Event 4 - 25 FA */}
                <div className="absolute transform -translate-x-1 -translate-y-[55px]" style={{ left: '85%' }}>
                  <div className="text-center mt-12">
                    <div className="font-decor text-[var(--neongreen)] translate-y-[10px]" style={{ fontSize: 'clamp(40px, calc(40px + (48 - 40) * ((100vw - 1024px) / (1280 - 1024))), 40px)' }}>25 FA</div>
                    <div className="text-[var(--neongreen)] font-decor" style={{ fontSize: 'clamp(18px, calc(18px + (96 - 18) * ((100vw - 1024px) / (1280 - 1024))), 60px)' }}>◆</div>
                  </div>
                </div>
              </div>
            </div>

            {/* End Arrow */}
            <div className="absolute right-0 top-2/3 transform -translate-x-[160px] -translate-y-1/2 text-[var(--neongreen)] font-decor" style={{ left: 'calc(100% - 30px)', fontSize: 'clamp(30px, 4vw, 60px)' }}>
              →
            </div>
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