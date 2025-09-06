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
            className="flex justify-start px-2 pb-[50px] sm:px-4 md:px-[100px] lg:px-[120px] pt-12 sm:pt-16 md:pt-[210px] lg:pt-[230px] lg:pb-[80px] xl:pb-[118px]"
        > 
            {/* Pink Rectangle with responsive positioning and sizing */}
            <div 
                className="pink-rectangle relative p-2 sm:p-3 mt-20 md:p-4 lg:p-6 xl:p-8"
            >
                <div 
                    className="font-decor text-white leading-tight"
                    style={{ 
                    fontSize: 'clamp(16px, 4vw, 58px)',
                    marginTop: 'clamp(8px, 2vh, 20px)',
                    marginLeft: 'clamp(12px, 4vw, 80px)'
                    }}
                >
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-[30px] items-start sm:items-baseline">
                        <span>Follow the link and . .</span>
                        <span>don&apos;t forget to</span>
                        <span 
                            style={{ 
                                color: 'var(--yellow)', 
                                fontSize: 'clamp(20px, 5vw, 58px)' 
                            }}
                        >
                            ☆ WIN ☆
                        </span>
                    </div>
                    <div 
                        className="flex justify-end pr-4 sm:pr-8 md:pr-16 lg:pr-20"
                        style={{ 
                            fontSize: 'clamp(20px, 4vw, 55px)',
                            marginTop: 'clamp(8px, 2vh, 10px)'
                        }}
                    >
                        <span>⇙</span>
                    </div>
                </div>

                <a
                    href="https://win.wisc.edu/organization/kcu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-decor block text-center underline hover:text-[var(--yellow)] break-all"
                    style={{ 
                        fontSize: 'clamp(12px, 3vw, 50px)',
                        marginTop: 'clamp(16px, 8vh, 80px)',
                        marginLeft: 'clamp(8px, 15vw, 200px)'
                    }}
                >
                    https://win.wisc.edu/organization/kcu
                </a>
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