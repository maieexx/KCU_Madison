'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../globals.css';


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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                setIsAuthenticated(true);
                sessionStorage.setItem('isAuthenticated', 'true');
                router.push('/auth/admin-success');
            } else {
                setIsAuthenticated(false);
                setError('Wrong password. Try again.');
                router.push('/auth/admin-fail');
            }
            } catch (err: any) {
            setError('An error occurred. Please try again.');
            console.error(err); // now err is used
            } finally {
            setIsLoading(false);
            }
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
                        onChange={(e) => setPassword(e.target.value)}
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
                    {error && (
                        <p className="text-red-500 mt-4 ml-[15px] font-decor">{error}</p>
                    )}
                    <button type="submit" className='cyan-rectangle ml-[120px] mt-[20px] hover:text-[var(--foreground)] enter-button block'>
                        <p style={{ fontSize: '60px' }} className='-mt-[35px]'>Enter</p>
                    </button>
                </div>
            </form>
        </div>
    );
}