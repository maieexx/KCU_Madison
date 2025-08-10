'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../globals.css';
import { set } from 'mongoose';


export default function Admin() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                sessionStorage.setItem('isAuthenticated', 'true');
                router.push('/auth/admin-success');
            } else {
                router.push('/auth/admin-fail');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setPassword('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className='min-h-screen bg-black text-white relative'>
        
            {/* Exit Symbol */}
            < div className='absolute top-[20px] left-[100px]'>
                <Link href='/' style={{ color: '#F56CCE' }} className='font-decor'>
                    ☒
                </Link>
            </div>

            {/* Authentication */}
            <div className='white-rectangle left-[480px] top-[250px] absolute px-2'>
                <p style={{ fontSize: '25px' }} className="font-decor">◆ System Control.Auth</p>
            </div>

            {/* Password Input */}
            <form onSubmit={handleSubmit}>
                <div className="font-navbar absolute left-[680px] top-[320px]">
                    <p style={{ fontSize: '70px' }} className='ml-[50px]'>Type the password.</p>
                    <input 
                        type="text"
                        value={'*'.repeat(password.length)}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoFocus
                        required
                        style={{
                            fontFamily: 'sporty',
                            fontSize: '30px',
                            color: 'white',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderBottom: '10px dashed white',
                            outline: 'none',
                            letterSpacing: '10px',
                            width: '350px',
                            position: 'relative',
                            top: '-50px',
                            paddingBottom: '10px',
                            lineHeight: "20px",
                        }}
                    />
                    <p style={{ fontSize: '19px'}} className='font-decor ml-[15px] -mt-[90px]'>♬ hint: iykyk</p>
                    <button type="submit" className='cyan-rectangle ml-[120px] mt-[20px] hover:text-[var(--foreground)] enter-button block'>
                        <p style={{ fontSize: '60px' }} className='-mt-[35px]'>Enter</p>
                    </button>
                </div>
            </form>
        </div>
    );
}