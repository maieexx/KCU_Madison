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
      <div className="absolute z-10" style={{
        top: 'clamp(16px, 4vh, 70px)',
        left: 'clamp(16px, 7vw, 100px)'
      }}>
        <h1 
          style={{ 
            color: '#F24D00',
            fontSize: 'clamp(32px, 8vw, 100px)'
          }}
          className="font-title"
        >
          History
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="flex justify-center pt-[200px] sm:pt-2[250px] md:pt-[250px] lg:pt-[450px] xl:pt-[450px] pb-14 sm:pb-16 md:pb-20 lg:pb-[450px] xl:pb-[450px]" style={{
        paddingLeft: 'clamp(30px, 20vw, 280px)',
        paddingRight: 'clamp(30px, 20vw, 280px)',
      }}>
        
        {/* Timeline Container */}
        <div className="w-full max-w-5xl">
          
          {/* Mobile Timeline */}
          <div className="lg:hidden" style={{ gap: 'clamp(10px, 4vh, 15px)' }}>
            {HISTORY_EVENTS.map((event, idx) => (
              <div key={event.year} className="flex items-start" style={{ gap: 'clamp(12px, 2vw, 16px)', marginBottom: 'clamp(24px, 4vh, 32px)' }}>
                <div className="flex flex-col items-center">
                  <div style={{
                    width: 'clamp(12px, 2vw, 16px)',
                    height: 'clamp(12px, 2vw, 16px)',
                    backgroundColor: 'var(--neongreen)',
                    borderRadius: '50%'
                  }}></div>
                  {idx < HISTORY_EVENTS.length - 1 && (
                    <div style={{
                      width: '2px',
                      height: 'clamp(48px, 8vh, 64px)',
                      backgroundColor: 'var(--neongreen)',
                      marginTop: '8px'
                    }}></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-decor text-[var(--neongreen)]" style={{
                    fontSize: 'clamp(20px, 4vw, 24px)',
                    marginBottom: '8px'
                  }}>
                    {event.year}
                  </div>
                  <div 
                    className="font-body text-[var(--foreground)] leading-tight whitespace-pre-line"
                    style={{ 
                      fontSize: 'clamp(12px, 2.5vw, 16px)',
                      lineHeight: 'clamp(16px, 3vw, 20px)'
                    }}
                  >
                    {event.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">

            {/* Main Timeline Container */}
            <div 
              className="relative" 
              style={{ 
                transform: 'translateX(-70px) translateY(10px)'
                }}
            >
              {/* Main Timeline Line */}
              <div 
                className="border-t-8 border-dashed border-[var(--neongreen)] translate-y-[40px] translate-x-[10px]"
                style={{width: 'clamp(510px, 60vw, 880px)' }}
              ></div>

              {/* Timeline Events */}
              <div className="absolute inset-0 flex justify-between items-center">

                {/* Start Symbol + First Event */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-center"
                  style={{ transform: 'translateX(-65px) translateY(-50%)' }}
                >
                  <div className="-mb-[5px]">
                    <div 
                      className="font-body font-semibold text-[var(--foreground)] whitespace-pre-line mb-2"
                      style={{ fontSize: '16px', lineHeight: '20px' }}
                    >
                      Established KCU
                    </div>
                    <div 
                      className="font-decor text-[var(--neongreen)]"
                      style={{ fontSize: 'clamp(32px, 3.5vw, 40px)' }}
                    >
                      22 FA
                    </div>
                  </div>
                  <div 
                    className="text-[var(--neongreen)] font-decor"
                    style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}
                  >
                    ǁ
                  </div>
                </div>

                {/* Event 2 - 24 FA */}
                <div 
                  className="absolute" 
                  style={{
                    left: 'calc(clamp(510px, 60vw, 880px) * 0.5)',
                    top: '-120px',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="text-center mt-12">
                    <div 
                      className="font-body font-semibold text-[var(--foreground)] whitespace-pre-line"
                      style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '20px' }}
                    >
                      {`Registered as an official
              UW-Madison CS club`}
                    </div>
                    <div className="font-decor text-[var(--neongreen)] translate-y-[10px]" style={{ fontSize: 'clamp(32px, 3.5vw, 40px)' }}>
                      24 FA
                    </div>
                    <div className="text-[var(--neongreen)] font-decor" style={{ fontSize: 'clamp(24px, 4.5vw, 60px)' }}>
                      ◆
                    </div>
                  </div>
                </div>

                {/* Event 3 - 25 SP */}
                <div
                  className="absolute"
                  style={{
                    left: 'calc(clamp(510px, 60vw, 880px) * 0.75)',
                    top: '5px',        // 부모 컨테이너 top 고정
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // 가로 중앙 정렬
                  }}
                >
                  {/* ◆ Symbol on top */}
                  <div 
                    className="text-[var(--neongreen)] font-decor mb-2"
                    style={{ fontSize: 'clamp(24px, 4.5vw, 60px)' }}
                  >
                    ◆
                  </div>

                  {/* 25 SP */}
                  <div 
                    className="font-decor text-[var(--neongreen)] mt-[-5px]"
                    style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}
                  >
                    25 SP
                  </div>

                  {/* Description */}
                  <div 
                    className="font-body font-semibold text-[var(--foreground)] whitespace-pre-line text-center mt-3"
                    style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: '20px' }}
                  >
                    {`Created KCU
                official website`}
                  </div>
                </div>

                {/* Event 4 - 25 FA */}
                <div
                  className="absolute"
                  style={{
                    left: 'calc(clamp(510px, 60vw, 880px) * 1)',
                    top: '-35px',              // 라인 기준 고정
                    transform: 'translateX(-50%)',
                    height: '100px',           // 충분히 높이 확보
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start', 
                    alignItems: 'center',
                  }}
                >
                  {/* 25 FA on one line */}
                  <div 
                    className="font-decor text-[var(--neongreen)]"
                    style={{ fontSize: 'clamp(24px, 4vw, 40px)', whiteSpace: 'nowrap' }}
                  >
                    25 FA
                  </div>
                  {/* ◆ symbol */}
                  <div 
                    className="text-[var(--neongreen)] font-decor mb-1"
                    style={{ fontSize: 'clamp(24px, 4.5vw, 60px)' }}
                  >
                    ◆
                  </div>
                </div>

                {/* End Arrow */}
                <div 
                  className="absolute translate-y-[-2px] text-[var(--neongreen)] font-decor"
                  style={{ left: 'calc(clamp(510px, 60vw, 880px) * 1.0)', top: '8px', fontSize: 'clamp(60px, 4vw, 60px)' }}
                >
                  →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="page-navigation">
        <div className="white-line absolute" />
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