'use client';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative">

        {/* Moon Symbol */}
        < div className='absolute top-[20px] left-[100px]'>
          <p style={{  color: '#FFFC65'  }} className='font-decor'>⏾</p>
        </div>

        {/* Left: Title Section & Logo */}
        <div className="absolute left-[190px] top-[50px]">
          <h1 style={{ fontSize: '140px'  }} className="font-main">
            KCU 2025
          </h1>
          <p style={{ fontSize: '45px' }} className="font-sub">
            Korean Undergraduate Computer Science Union
          </p>
          <video
            className="w-[300px] h-auto mt-20 items-center mx-auto"
            autoPlay
            loop
            muted
          >
            <source src="/assets/logo_rotating.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Star Pattern */}
        <div className="absolute top-[140px] right-[100px]">
          <p style={{  color: '#FFFC65'  }} className='font-decor'>☆★☆★☆★</p>
        </div>
        <div className="absolute top-[200px] right-[140px]">
          <p style={{  color: '#FFFC65'  }} className='font-decor'>☆★☆★☆★</p>
        </div>

        {/* Right: Navigation Links */}
        <div className='absolute top-[580px] right-[200px] transform -translate-y-1/2 overflow-hidden'>
          <nav className="clear-both relative">
            <ul className="font-navbar space-y-2 list-none p-0 m-0">
              <li>
                <Link href="/aboutKCU" className="hover:text-[var(--hover-blue)] nav-link block">
                  About KCU
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[var(--hover-blue)] nav-link block">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-[var(--hover-blue)] nav-link block">
                  Community
                </Link>
              </li>
            <li>
                <Link href="/signup" className="hover:text-[var(--hover-blue)] nav-link block">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Start */}
        <div className="absolute bottom-[200px] left-[720px] transform -translate-x-1/2 text-center">
          <p style={{  fontSize: '45px', color: '#F56CCE'  }} className='font-decor blink'>ⓅⓇⒺⓈⓈ ⓉⓄ ⓈⓉⒶⓇⓉ ▶ ▶ </p>
        </div>

        {/* Power Symbol */}
        < div className='absolute bottom-[40px] right-[80px]'>
          <Link href="/auth">
            <p style={{  color: '#21FF58'  }} className='font-decor'>⏻</p>
          </Link>
        </div>


        {/* 사진 섹션
        <div className="relative w-full overflow-hidden my-16 px-4">
          <div className="flex animate-slide space-x-4">
            <img src="/assets/image1.jpg" alt="Image 1" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
            <img src="/assets/image2.jpeg" alt="Image 2" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
            <img src="/assets/image3.jpg" alt="Image 3" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
            <img src="/assets/image4.jpg" alt="Image 4" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
            <img src="/assets/image5.jpeg" alt="Image 5" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
            <img src="/assets/image1.jpg" alt="Image 1 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
            <img src="/assets/image2.jpeg" alt="Image 2 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
            <img src="/assets/image3.jpg" alt="Image 3 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
            <img src="/assets/image4.jpg" alt="Image 4 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
            <img src="/assets/image5.jpeg" alt="Image 5 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          </div>
        </div> */}
    </div>
  );
}