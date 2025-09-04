'use client';
import Link from 'next/link';
import '../globals.css';

const ABOUT_TEXT = `The Korean Undergraduate Computer Science Union
(KCU) at UW–Madison supports students primarily in
Computer Science and Data Science by fostering
academic and professional growth.

We create a collaborative space to develop technical
skills, spark innovation, and connect with peers
and industry experts.

Through monthly workshops and networking events,
members gain hands-on experience. For group projects,
students choose topics based on their interests—ranging
from AI and web development to data analysis and beyond.

Our seminars and competitions foster an inclusive
community where students share resources, collaborate on
projects, and prepare for internships and research opportunities.`;

const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' },
  { href: '/aboutKCU/boardMembers', label: 'Board Members' },
  { href: '/aboutKCU/logo', label: 'Logo' },
  { href: '/aboutKCU/history', label: 'History' },
  { href: '/aboutKCU/contactUs', label: 'Contact Us' },
];

export default function AboutKCU() {
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
          About KCU
        </h1>
      </div>

      {/* Main Content Section */}
      <div 
        className="flex justify-start px-2 pb-[50px] sm:px-4 md:px-8 lg:px-[120px] pt-12 sm:pt-16 md:pt-20 lg:pt-[120px] lg:pb-[80px] xl:pb-[118px]"
      >        
        {/* Text Content with Video Inside */}
        <div className="green-rectangle relative p-2 sm:p-3 mt-20 md:p-4 lg:p-6 xl:p-8">
          
          {/* Text Content */}
          <div className="pr-0 sm:pr-4 md:pr-8 lg:pr-0 xl:pr-96 -mt-2 sm:-mt-1 md:-mt-2 lg:-mt-4">
            <p 
              className="font-body whitespace-pre-line"
              style={{ 
                color: 'var(--foreground)',
                fontSize: 'clamp(12px, 1.5vw, 19px)',   // 12px → 19px
                lineHeight: 'clamp(1.4, 2vw, 1.9)'      // smooth line-height
              }}
            >
              {ABOUT_TEXT}
            </p>
          </div>

          {/* Video Positioned Inside Rectangle */}
          <div className="mt-4 sm:mt-6 md:mt-8 lg:absolute lg:top-24 lg:right-12 xl:top-36 xl:right-20 flex justify-center">
            <video
              className="h-auto"
              style={{ width: 'clamp(8rem, 20vw, 25rem)' }} // 128px → 400px
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/assets/logo_rotating.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
