'use client';
import Link from 'next/link';
import '../globals.css';
import Footer from '../components/footer/page';

{/* About KCU Text */}
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

{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎' },
  { href: '/aboutKCU/boardMembers', label: 'Board Members' },
  { href: '/aboutKCU/logo', label: 'Logo' },
  { href: '/aboutKCU/history', label: 'History' },
  { href: '/aboutKCU/contactUs', label: 'Contact Us' },
];


export default function AboutKCU() {
  return (
    <div className="min-h-screen relative">
      
      {/* Title Section */}
      <div className="absolute top-[70px] left-[100px]">
        <h1 style={{ color: '#F24D00' }} className='font-title' >About KCU</h1>
      </div>

      {/* Main Section */}
      <div className='green-rectangle left-[120px] top-[200px] absolute px-2'>
          <p style={{ fontSize: '19px', lineHeight:'33px', whiteSpace: 'pre-line' }} className="font-body mt-[10px] ml-[10px]">
            {ABOUT_TEXT}
          </p>

          <video
            className="w-[350px] h-auto ml-[730px] mt-[-450px]"
            autoPlay
            loop
            muted
        >
          <source src="/assets/logo_rotating.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

        {/* Right Navigation Section */}
        <div className='white-line absolute right-[330px]'/>
        <nav className="absolute right-[50px] top-[30px]">
            <ul style={{ fontSize: '35px' }} className="font-decor text-right">
                {NAVIGATION_LINKS.map(({ href, label }, idx) => (
                    <li key={href} className={idx === 0 ? '' : 'mt-[20px]'}>
                        <Link href={href} className="hover:text-[var(--hover-orange)] page-nav block">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
          </nav>
        {/* Footer */}
        <Footer />
    </div>
  );
}
