'use client';
import Link from 'next/link';
import '../../globals.css';

{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' },
  { href: '/signup', label: 'Sign-Up Form', mobileLabel: 'Sign-Up Form' },
] as const;

export default function signUpPage() {
    return (
        <main className="min-h-screen relative overflow-x-hidden">
            
            {/* Title Section */}
            <h1 
                className="font-title absolute top-4 left-4 sm:top-8 sm:left-8 md:top-12 md:left-16 lg:top-16 lg:left-20 xl:top-[70px] xl:left-[100px] z-10" 
                style={{ color: 'var(--yellow)' }}
            >
                WIN SIGN-UP
            </h1>

            {/* Main Section */}
            <p 
                className="font-decor absolute top-20 left-4 sm:top-24 sm:left-8 md:top-32 md:left-16 lg:top-36 lg:left-24 xl:left-[130px] xl:top-[230px] z-10" 
                style={{ 
                    color: 'var(--pink)', 
                    fontSize: 'clamp(24px, 5vw, 50px)' 
                }}
            >
                [ KCU WIN ]
            </p>
            
            <div 
                className="pink-rectangle absolute top-36 left-2 sm:top-44 sm:left-4 md:top-52 md:left-8 lg:top-56 lg:left-16 xl:left-[120px] xl:top-[300px] px-1 sm:px-2 z-10"
                style={{
                    width: 'clamp(350px, 95vw, 1180px)',
                    height: 'clamp(300px, 50vh, 450px)',
                    maxWidth: 'calc(100vw - 16px)'
                }}
            >
                <div 
                    className="font-decor mt-4 sm:mt-6 md:mt-8 lg:mt-[20px] xl:mt-[30px] ml-2 sm:ml-4 md:ml-8 lg:ml-12 xl:ml-[80px] text-left text-white"
                    style={{ fontSize: 'clamp(16px, 3.5vw, 55px)' }}
                >
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-[30px] items-start sm:items-baseline">
                        <span>Follow the link and . .</span>
                        <span>don&apos;t forget to</span>
                        <span 
                            style={{ 
                                color: 'var(--yellow)', 
                                fontSize: 'clamp(20px, 5vw, 85px)' 
                            }}
                        >
                            ☆ WIN ☆
                        </span>
                    </div>
                    <div 
                        className="flex mt-2 sm:mt-3 md:mt-4 lg:mt-[6px] xl:mt-[10px] justify-end pr-4 sm:pr-8 md:pr-16 lg:pr-20 xl:ml-[800px]"
                        style={{ fontSize: 'clamp(20px, 4vw, 55px)' }}
                    >
                        <span>⇙</span>
                    </div>
                </div>

                <a
                    href="https://win.wisc.edu/organization/kcu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-decor block mt-4 sm:mt-6 md:mt-12 lg:mt-16 xl:mt-[80px] ml-2 sm:ml-4 md:ml-8 lg:ml-16 xl:ml-[200px] text-center underline hover:text-[var(--yellow)] break-all"
                    style={{ fontSize: 'clamp(12px, 3vw, 50px)' }}
                >
                    https://win.wisc.edu/organization/kcu
                </a>
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