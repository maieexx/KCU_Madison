'use client';
import Link from 'next/link';
import '../globals.css';

{/*
  IMPORTANT:
  To update the sign-up form link, please edit line 46!
*/}


{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎' },
  { href: '/signup/winPage', label: 'WIN Sign-Up' },
];

export default function signUpPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      
      {/* Title Section */}
      <h1 className="font-title absolute top-[70px] left-[100px]" style={{ color: '#FFD400' }}>
        Sign-Up
      </h1>

      {/* Sign-Up Page: Not Ready */}
      <p style={{ color: '#FF3A96', fontSize: '50px' }} className="font-decor absolute left-[130px] top-[230px]">
        [ Sign-Up Form ]
      </p>
      <div className='pink-rectangle left-[120px] top-[300px] absolute px-2'>
        <p style={{ fontSize: '85px', color: 'white', whiteSpace: 'pre-line' }} className="font-decor mt-[10px] ml-[80px]">
          {`Sorry!!
          We are not accepting
          new members at this moment.`}
        </p>

        {/* Sign-Up Page: When the Sign-Up Form has been made */}
        {/* <div className="font-decor mt-[10px] text-center" style={{ fontSize: '80px', color: 'white' }}>
          <p>Click here to join the KCU!!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '200px' }}>
            <span>⇩</span>
            <span>⇩</span>
          </div>
        </div> */}

        {/* 내부 google doc 링크만 복붙하시면 됩니다!! */}
        {/* <a
          href="https://docs.google.com/forms/d/1qsmoWASdvBehrFeqIYWHMvF7brHCSpX6apoWsVoPcx8/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="font-decor ml-[340px] mt-[80px] text-center underline hover:text-[var(--yellow)] blink-yellow"
          style={{ fontSize: '80px'}}
        >
        ☆ Sign-Up Link ☆
        </a> */}
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