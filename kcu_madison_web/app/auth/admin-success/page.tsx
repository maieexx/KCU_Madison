'use client';
import Link from 'next/link';
import Image from 'next/image';
import '../../globals.css';

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-black text-white relative">
        
            {/* Top Decor */}
            < div className='absolute top-[20px] left-[100px]'>
                <p style={{  color: '#FFFC65'  }} className='font-navbar'>@</p>
            </div>
            <div className='absolute top-[50px] left-[160px]'>
                <p style={{  color: '#FFFC65', fontSize:'20px', wordSpacing:'15px' }} className='font-decor'>◆ ◆ ◆ ◆ ◆</p>
            </div>

            {/* Success Message */}
            <div className='white-rectangle left-[480px] top-[250px] absolute px-2'>
                <p style={{ fontSize: '25px' }} className="font-decor">◆ System Control.Auth</p>
                <p style={{ fontSize: '60px' }} className="font-navbar mt-[70px] ml-[250px]">Hello, Administrator.</p>
                <Link href='/' style={{ fontSize: '50px', color: 'white' }} className='font-navbar mt-[50px] ml-[280px] auth-link block'>
                    &lt; Start from Home
                </Link>
            </div>
        </div>
        
    );
}