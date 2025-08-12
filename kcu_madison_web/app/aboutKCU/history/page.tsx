'use client';
import Link from 'next/link';
import '../../globals.css';



{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎' },
  { href: '/aboutKCU', label: 'About KCU' },
  { href: '/aboutKCU/boardMembers', label: 'Board Members' },
  { href: '/aboutKCU/logo', label: 'Logo' },
  { href: '/aboutKCU/contactUs', label: 'Contact Us' },
];


export default function History() {
    return (
        <div className='min-h-screen bg-black text-white relative'>

            {/* Title Section */}
            <div className="absolute top-[70px] left-[100px]">
                <h1 style={{ color: '#F24D00' }} className='font-title' >History</h1>
            </div>

            {/* Main Section */}
            <div style={{ color: '#21FF58' }} className="font-decor absolute left-[200px] top-[400px] flex items-center space-x-5">
                <div className="text-center">
                    <div>ǁ</div>
                </div>

                {/* Dashed Line */}
                <div className="w-[980px] translate-x-[-13px] top-[50px] absolute" 
                    style={{
                        borderTop: '8px dashed'
                    }}>
                    <div className="absolute left-[600px] -top-[48px] transform -translate-x-1/2 -translate-y-1/2">
                        <div className='text-center translate-x-[-610px] translate-y-[50px]'>
                            <div style={{ fontSize: '19px', lineHeight: '25px' }}
                            className='font-body font-semibold whitespace-pre-line translate-y-[10px]'>
                                {`Established KCU`}
                            </div>
                            <div style={{ fontSize: '40px' }} className='translate-y-[10px]'>22 FA</div>
                        </div>
                        <div className="text-center translate-y-[-40px]">
                            <div style={{ fontSize: '19px', lineHeight: '25px' }}
                            className='font-body font-semibold whitespace-pre-line'>
                                {`Registered as an official
                                UW-Madison CS club`}
                            </div>
                            <div style={{ fontSize: '40px' }} className='translate-y-[-5px]'>24 FA</div>
                            <div className='-mt-[40px]'>◆</div>
                        </div>
                    </div>
                    <div className="absolute left-[800px] -top-[10px] transform -translate-x-1/2 -translate-y-1/2 px-2">
                        ◆
                    </div>
                    <div style={{ fontSize: '40px' }} className='translate-x-[760px] translate-y-[10px]'> 25 SP</div>
                        <div
                            style={{ fontSize: '19px', lineHeight: '25px' }}
                            className="font-body font-semibold whitespace-pre-line text-center translate-x-[310px] translate-y-[10px]"
                        >
                            {`Created KCU
                            official website`}
                        </div>
                    <div style={{ fontSize: '40px' }} className='translate-x-[950px] translate-y-[-188px]'>25 FA</div>
                    <div className="absolute left-[990px] -top-[10px] transform -translate-x-1/2 -translate-y-1/2 px-2">
                        ◆
                    </div>
                </div>
                <div className='translate-x-[960px]'>→</div>
                
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