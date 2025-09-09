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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="min-h-screen relative px-4 flex items-center justify-center">
      {/* Exit Symbol */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 lg:left-16 xl:left-24">
        <Link
          href="/"
          className="font-decor"
          style={{ color: '#F56CCE', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          ☒
        </Link>
      </div>

      {/* White Rectangle wrapping all content */}
      <div className="
        white-rectangle
        relative flex items-center justify-center
      ">
        {/* Authentication Header */}
        <p className="font-decor absolute left-4 mt-[-10px]"
           style={{
             fontSize: 'clamp(0.8rem, 2vw, 1.7rem)',
             top: 'clamp(0.5rem, 1vw, 1.5rem)'
           }}>
          ◆ System Control.Auth
        </p>

        {/* Password Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 mt-[45px]">
          <p className="text-center font-navbar mb-4 sm:mb-6 md:mb-6 lg:mb-8 xl:mb-8"
             style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
            Type the password.
          </p>

          <input
            type="password"
            value={password}
            onChange={handleChange}
            disabled={isLoading}
            autoFocus
            required
            className="mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-6 w-[60%] sm:w-[60%] md:w-[60%] lg:w-[60%] xl:w-[60%]"
            style={{
              fontFamily: 'sporty',
              fontSize: 'clamp(1rem, 2.8vw, 1.5rem)',
              color: 'var(--foreground)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: 'clamp(2px, 0.8vw, 5px) dashed var(--foreground)',
              outline: 'none',
              letterSpacing: 'clamp(4px, 1vw, 10px)',
              paddingBottom: 'clamp(4px, 1vw, 9px)',
              lineHeight: '1',
              textAlign: 'start'
            }}
          />

          <p className="font-decor text-center mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-6"
             style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
            ♬ hint: iykyk
          </p>

          {/* Enter Button */}
            <div className="flex justify-center 
                            mt-[20px] sm:mt-[-10px] md:mt-[30px] lg:mt-[50px] xl:mt-[50px]">
              <button
              type="submit"
              className="cyan-rectangle flex items-center justify-center transition-all duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              <span
                className="font-navbar"
                style={{ fontSize: 'clamp(1.8rem, 3.3vw, 3.3rem)', lineHeight: '0.5' }}
              >
                {isLoading ? '...' : 'Enter'}
              </span>
            </button>
          </div>

          {/* Status Messages */}
          <div className="px-4 text-center mt-4 sm:mt-5 md:mt-6 lg:mt-6 xl:mt-6">
            {isAuthenticated && (
              <p
                className="text-green-500 font-decor"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
              >
                Access Granted!
              </p>
            )}
            {error && (
              <p
                className="text-red-500 font-decor"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
              >
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
