'use client';
import Link from 'next/link';
import Image from 'next/image';
import '../../globals.css';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
        
      {/* Top Decor */}
      < div className='absolute top-[20px] left-[100px]'>
        <p style={{  color: '#FFFC65'  }} className='font-decor'>���</p>
      </div>

      {/* Warning Message */}
      <div className='absolute left-[680px] top-[130px]'>
        <p style={{ fontSize: '85px', color: '#FF2121', letterSpacing: '2px'}} className='font-decor blink-warning'>WARNING!!</p>
      </div>

      {/* Error Message */}
      <div className='white-rectangle left-[480px] top-[250px] absolute px-2'>
          <p style={{ fontSize: '25px' }} className="font-decor">◆ System Control.Auth</p>
          <p style={{ fontSize: '80px' }} className="font-navbar mt-[70px] ml-[200px]">Authentication Failed.</p>
          
          <div className="flex flex-col ml-[195px] mt-[50px]">
            <Link href='/auth' className='font-navbar auth-link inline-block' >
              <span style={{ fontSize: '50px', color: 'white' }}>
                &lt; I just remembered the password !
              </span>
            </Link>

            <Link href='/' className='font-navbar auth-link inline-block'>
              <span style={{ fontSize: '50px', color: 'white' }}>
                &lt; Take me back to Home
              </span>
            </Link>
          </div>
        </div>
    </div>
  );
}
