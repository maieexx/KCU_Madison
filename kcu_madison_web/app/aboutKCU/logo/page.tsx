'use client';
import Link from 'next/link';
import Image from 'next/image';
import '../../globals.css';




const CORRECT_LOGOS = [
  {
    src: '/assets/logo_original.png',
    alt: 'Original Logo',
    width: 250,
    height: 180,
    className: 'mt-[20px] ml-[20px]',
    label: '☑ original',
    labelClassName: 'mb-[10px] -ml-[90px]'
  },
  {
    src: '/assets/kcu_white.png',
    alt: 'Dark Mode',
    width: 250,
    height: 180,
    className: 'mt-[35px] ml-[60px]',
    label: '☑ darkmode',
    labelClassName: 'mb-[10px] -ml-[10px]'
  },
];

const INCORRECT_LOGOS = [
  { src: '/assets/logo_keepcol.png',
    alt: 'Red Logo',
    className: '-mt-[20px] ml-[20px]'
},
  { src: '/assets/logo_keepcol2.png',
    alt: 'Black Logo',
    className: '-mt-[20px] ml-[20px]'
},
  {
    src: '/assets/logo_dontfillwhite.png',
    alt: 'Filled Logo',
    className: 'mt-[30px] ml-[100px]',
    hasLabel: true,
    label: '☒ do not fill the logo',
    labelClass: '-ml-[200px]',
    labelClassName: 'mb-[5px] ml-[200px] text-center'
  },
];

const COLOR_CODES = [
  { hex: '#c5050c', bg: 'bg-[#c5050c]' },
  { hex: '#000000', bg: 'bg-black' },
  { hex: '#ffffff', bg: 'bg-white' },
];

{/* Right Navigation List */}
const NAVIGATION_LINKS = [
  { href: '/', label: '⏎' },
  { href: '/aboutKCU', label: 'About KCU' },
  { href: '/aboutKCU/boardMembers', label: 'Board Members' },
  { href: '/aboutKCU/history', label: 'History' },
  { href: '/aboutKCU/contactUs', label: 'Contact Us' },
];


export default function LogoPage() {
    return(
        <div className="min-h-screen bg-black text-white relative">
        
        {/* Title Section */}
        <div className="absolute top-[70px] left-[100px]">
            <h1 style={{ color: '#F24D00' }} className='font-title' >Logo</h1>
        </div>

        {/* Correct Use of Logo Section */}
        <div
            className="green-rectangle absolute left-[120px] top-[230px]"
            style={{ width: '650px', height: '230px' }}
        >
            <div className="flex items-start space-x-10">
                {CORRECT_LOGOS.map((logo) => (
                    <div key={logo.src} className="flex flex-col items-center">
                    <Image
                        src={logo.src}
                        width={250}
                        height={180}
                        alt={logo.alt}
                        className={logo.className}
                    />
                    <p style={{ fontSize:'25px' }} className={`font-decor text-center text-[#21FF58] ${logo.labelClassName}`}>
                        {logo.label}
                    </p>
                    </div>
                ))}
            </div>
        </div>



        {/* Incorrect Use of Logo Section */}
        <div
            className="absolute left-[120px] top-[480px] border-[3px] flex items-center"
            style={{ borderColor: '#FC0000', width: '930px', height: '230px' }}
        >
            {INCORRECT_LOGOS.map((logo, index) => (
                <div key={logo.src} className="flex flex-col items-center">
                    <Image
                        src={logo.src}
                        width={250}
                        height={180}
                        alt={logo.alt}
                        className={logo.className}
                    />
                    {logo.hasLabel && (
                        <p style={{ fontSize:'25px' }} className={`font-decor text-[#FC0000] ml-[60px] ${logo.labelClassName}`}>
                            {logo.label}
                        </p>
                    )}
                </div>
            ))}

            {/* Label */}
            <p
                className="font-decor -mb-[170px] -ml-[850px]"
                style={{ fontSize: '25px', color: '#FC0000'}}
            >
                ☒ do not change the color of the border
            </p>
        </div>

        {/* Color Code Info */}
        <div style={{ fontSize: '40px' }} className="absolute right-[560px] top-[220px] font-decor flex items-start">
            <h2 className="mr-[10px] min-w-[80px]">color code:</h2>

            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#c5050c] border-[3px] border-white"></div>
                    <span>#c5050c</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black border-[3px] border-white"></div>
                    <span>#000000</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white border-[3px] border-white"></div>
                    <span>#ffffff</span>
                </div>
            </div>
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