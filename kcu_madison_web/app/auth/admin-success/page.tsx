'use client';
import Link from 'next/link';
import '../../globals.css';

export default function AdminPage() {
    return (
        <div className="min-h-screen relative">
        
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
                <Link href='/auth/add-project' style={{ fontSize: '50px' }} className='font-navbar mt-[50px] ml-[280px] auth-link block'>
                    &lt; Add project
                </Link>
                <Link href='/auth/edit-project' style={{ fontSize: '50px' }} className='font-navbar mt-[10px] ml-[280px] auth-link block'>
                    &lt; Edit project
                </Link>

            </div>
        </div>
        
    );
}