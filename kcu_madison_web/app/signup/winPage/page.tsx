'use client';
import Link from 'next/link';
import '../../globals.css';

{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎' },
  { href: '/signup', label: 'Sign-Up Form' },
];

export default function signUpPage() {
    return (
        <main className="min-h-screen bg-black text-white relative">
            
            {/* Title Section */}
            <h1 className="font-title absolute top-[70px] left-[100px]" style={{ color: '#FFD400' }}>
                WIN SIGN-UP
            </h1>

            {/* Main Section */}
            <p style={{ color: '#FF3A96', fontSize: '50px' }} className="font-decor absolute left-[130px] top-[230px]">
                [ KCU WIN ]
            </p>
            <div className='pink-rectangle left-[120px] top-[300px] absolute px-2'>
                <div className="font-decor ml-[80px] mt-[30px] text-left" style={{ color: 'white', fontSize: '55px' }}>
                    <div style={{ display: 'flex', gap: '30px', alignItems: 'baseline' }}>
                        <span>
                            Follow the link and . .
                        </span>
                        <span>
                            don't forget to
                        </span>
                        <span style={{ color: '#FFD400', fontSize: '85px' }}>  ☆ WIN ☆ </span>
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px' }} className='ml-[800px]'>
                        <span>⇙</span>
                    </div>
                </div>

                <a
                    href="https://win.wisc.edu/organization/kcu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-decor ml-[200px] mt-[80px] text-center underline hover:text-[var(--yellow)]"
                    style={{ fontSize: '50px'}}
                >
                https://win.wisc.edu/organization/kcu
                </a>
            </div>

            {/* Right Navigation Section */}
            <div className='white-line absolute right-[330px]'/>
            <nav className="absolute right-[50px] top-[200px] -translate-y-1/2 overflow-hidden">
                <ul className="font-decor text-right" style={{ fontSize: 35 }}>
                    {NAVIGATION_LINKS.map(({ href, label }, idx) => (
                        <li key={href} className={idx === 0 ? '' : 'mt-[20px]'}>
                            <Link href={href} className="hover:text-[var(--yellow)] page-nav block">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </main>
    );
}