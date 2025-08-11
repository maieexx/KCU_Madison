'use client';
import Link from 'next/link';
import Image from 'next/image';
import '../../globals.css';

{/* Board Members List */}
const MEMBERS_TOP = [
    { title: 'President' },
    { title: 'Vice President' },
    { title: 'Treasurer' },
    { title: `Event\nCoordinator` },
    { title: `Operation\nCoordinator` },
];
const MEMBERS_BOTTOM = [
    { title: 'S/W Coordinator' },
    { title: 'S/W Coordinator' },
    { title: 'S/W Coordinator' },
    { title: 'S/W Coordinator' },
];

{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎' },
  { href: '/aboutKCU', label: 'About KCU' },
  { href: '/aboutKCU/logo', label: 'Logo' },
  { href: '/aboutKCU/history', label: 'History' },
  { href: '/aboutKCU/contactUs', label: 'Contact Us' },
];

export default function BoardMembers() {
  return (
    <div className="min-h-screen bg-black text-white relative">
        
    {/* Title Section */}
    <div className="absolute top-[70px] left-[100px]">
        <h1 style={{ color: '#F24D00' }} className='font-title' >Board Members</h1>
    </div>
    
    {/* Board Members Section */}
    <div className="absolute left-[180px] top-[250px] flex space-x-[60px]">
      {MEMBERS_TOP.map(({ title }, idx) => (
        <div key={idx} className="flex flex-col items-center w-[150px]">
          <div className="green-square" />
          <p
            className="font-title mt-1 !text-[23px] text-[var(--neongreen)] text-center whitespace-pre-line leading-[23px]"
          >
            {title}
          </p>
        </div>
      ))}
    </div>
    
    <div className="absolute left-[280px] top-[500px] flex space-x-[60px]">
        {MEMBERS_BOTTOM.map(({ title }, idx) => (
        <div key={idx} className="flex flex-col items-center w-[150px]">
          <div className="green-square" />
          <p
            className="font-title mt-1 !text-[23px] text-[var(--neongreen)] text-center whitespace-pre-line leading-[23px]"
          >
            {title}
          </p>
        </div>
        ))}
    </div>

        
        
    {/* Right Navigation Section */}
    <div className='white-line absolute right-[330px]'/>
        <div className='absolute right-[50px] top-[200px] transform -translate-y-1/2 overflow-hidden'>
            <nav className="clear-both relative">
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
        </div>
    </div>
  );
}