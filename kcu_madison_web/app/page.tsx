'use client';
import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">

      {/* Moon Symbol */}
      <div className="absolute z-10" style={{
        top: 'clamp(8px, 2vh, 20px)',
        left: 'clamp(16px, 7vw, 100px)'
      }}>
        <p style={{ 
          color: '#FFFC65',
          fontSize: 'clamp(32px, 4.5vw, 60px)'
        }} className="font-decor">⏾</p>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row min-h-screen" style={{
        paddingLeft: 'clamp(16px, 4vw, 64px)',
        paddingRight: 'clamp(16px, 4vw, 64px)'
      }}>
        
        {/* Left: Title Section & Logo */}
        <div className="flex-1 flex flex-col items-center lg:items-start justify-center lg:absolute pt-20 lg:pt-0 z-10" style={{
          left: 'clamp(80px, 14vw, 200px)',
          top: 'clamp(80px, 12vh, 120px)'
        }}>
          <div className="text-center lg:text-left" style={{
            marginBottom: 'clamp(24px, 4vh, 32px)'
          }}>
            <h1 className="font-main leading-tight" style={{
              fontSize: 'clamp(50px, 8vw, 190px)'
            }}>
              KCU 2025
            </h1>
            <p className="font-sub tracking-wider" style={{
              fontSize: 'clamp(15px, 2.5vw, 40px)',
              marginTop: 'clamp(24px, 4vh, 48px)'
            }}>
              Korean Undergraduate Computer Science Union
            </p>
          </div>
          
          <div className="w-full flex justify-center" style={{
            marginTop: 'clamp(24px, 6vh, 80px)'
          }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: 'clamp(160px, 22vw, 300px)',
                height: 'auto'
              }}
            >
              <source src="/assets/logo_rotating.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="block">
          {/* Star Pattern */}
          <div className="absolute z-10" style={{
            top: 'clamp(140px, 18vh, 140px)',
            right: 'clamp(60px, 6vw, 100px)'
          }}>
            <p style={{ 
              color: '#FFFC65',
              fontSize: 'clamp(24px, 4.5vw, 60px)'
            }} className="font-decor">☆★☆★☆★</p>
          </div>
          <div className="absolute z-10" style={{
            top: 'clamp(180px, 20vh, 200px)',
            right: 'clamp(70px, 10vw, 140px)'
          }}>
            <p style={{ 
              color: '#FFFC65',
              fontSize: 'clamp(24px, 4.5vw, 60px)'
            }} className="font-decor">☆★☆★☆★</p>
          </div>

          {/* Navigation Links */}
          <div className="absolute transform -translate-y-1/2 z-10 hidden lg:block" style={{
            top: 'clamp(460px, 58vh, 580px)',
            right: 'clamp(60px, 14vw, 100px)'
          }}>
            <nav className="nav-blue relative">
              <ul className="font-navbar list-none p-0 m-0" style={{
                fontSize: 'clamp(48px, 7vw, 100px)',
                lineHeight: '1.2',
                gap: 'clamp(4px, 1vh, 8px)'
              }}>
                <li style={{ marginBottom: 'clamp(4px, 1vh, 8px)' }}>
                  <Link href="/aboutKCU" className="nav-link block transition-colors duration-200">
                    About KCU
                  </Link>
                </li>
                <li style={{ marginBottom: 'clamp(4px, 1vh, 8px)' }}>
                  <Link href="/projects" className="nav-link block transition-colors duration-200">
                    Projects
                  </Link>
                </li>
                <li style={{ marginBottom: 'clamp(4px, 1vh, 8px)' }}>
                  <Link href="/community" className="nav-link block transition-colors duration-200">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="nav-link block transition-colors duration-200">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--foreground)] z-20" style={{
        padding: 'clamp(12px, 2vh, 16px)'
      }}>
        <ul className="flex justify-around items-center font-decor" style={{
          fontSize: 'clamp(20px, 4vw, 30px)'
        }}>
          <li><Link href="/aboutKCU" className="hover:text-[var(--hover-blue)] transition-colors px-1 py-1">About</Link></li>
          <li><Link href="/projects" className="hover:text-[var(--hover-blue)] transition-colors px-1 py-1">Projects</Link></li>
          <li><Link href="/community" className="hover:text-[var(--hover-blue)] transition-colors px-1 py-1">Community</Link></li>
          <li><Link href="/signup" className="hover:text-[var(--hover-blue)] transition-colors px-1 py-1">Sign Up</Link></li>
        </ul>
      </nav>

      {/* Start Button */}
      <div className="fixed text-center z-10" style={{
        bottom: 'clamp(64px, 16vh, 200px)',
        left: 'clamp(50%, 45vw, 620px)',
        transform: 'translateX(-50%)'
      }}>
        <p style={{ 
          color: '#F56CCE',
          fontSize: 'clamp(16px, 3.2vw, 45px)'
        }} className="font-decor blink">
          ⓅⓇⒺⓈⓈ ⓉⓄ ⓈⓉⒶⓇⓉ ▶ ▶
        </p>
      </div>

      {/* Power Symbol */}
      <div className="absolute z-10" style={{
        bottom: 'clamp(12px, 3vh, 40px)',
        right: 'clamp(12px, 6vw, 80px)'
      }}>
        <Link href="/auth" className="auth-link">
          <p style={{ 
            color: '#21FF58',
            fontSize: 'clamp(32px, 4.5vw, 60px)'
          }} className="font-decor">⏻</p>
        </Link>
      </div>
    </div>
  );
}