'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../globals.css';

const NAVIGATION_LINKS = [
  { href: '/', label: '⏎', mobileLabel: 'Home' }
];

type SemesterLike = string | { name: string };

function toSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')       // spaces -> dashes
    .replace(/[^a-z0-9-]/g, ''); // strip other chars
}

export default function ProjectsPage() {
  const [semesters, setSemesters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/semesters', { cache: 'no-store' });
        const data = await res.json();

        // Accept either ["2024 Spring", ...] or { semesters: [...] } or object map
        let arr: SemesterLike[] = data?.semesters ?? data;
        if (!Array.isArray(arr) && arr && typeof arr === 'object') {
          arr = Object.values(arr);
        }
        const names = (arr as SemesterLike[]).map((s) =>
          typeof s === 'string' ? s : s?.name
        ).filter(Boolean) as string[];

        setSemesters(names);
      } catch (e) {
        console.error('Failed to fetch semesters', e);
        setSemesters([]); // fail safely
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Title Section */}
      <h1 
        className="font-title absolute top-4 left-4 md:top-[70px] md:left-[100px] text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] z-10" 
        style={{ color: '#8F4EFF' }}
      >
        Projects
      </h1>

      {/* Main Content Container */}
      <div className="px-4 sm:px-8 md:px-12 pt-[200px] sm:pt-[250px] md:pt-[300px] lg:pt-[350px] xl:pt-[400px] pb-[420px] md:pb-[450px]">
        
        {/* Subtitle */}
        <p
          className="font-decor text-center md:text-left md:absolute md:left-[200px] md:top-[250px] lg:left-[300px] xl:left-[500px] mb-8 md:mb-0"
          style={{ 
            color: '#C2C2C2', 
            fontSize: 'clamp(20px, 4vw, 50px)', 
            letterSpacing: 'clamp(1px, 0.3vw, 5px)' 
          }}
        >
          Select a semester to explore!
        </p>

        {/* Semesters Grid */}
        <div
          className="font-decor grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-20 justify-items-center md:absolute md:top-[400px] md:left-[270px] lg:left-[320px] xl:left-[400px] md:flex md:flex-wrap md:justify-start"
          style={{ fontSize: 'clamp(24px, 5vw, 60px)' }}
        >
          {loading && (
            <span 
              className="col-span-full text-center" 
              style={{ fontSize: 'clamp(20px, 4vw, 50px)', color: '#C2C2C2' }}
            >
              Loading…
            </span>
          )}
          
          {!loading && semesters.length === 0 && (
            <span 
              className="col-span-full text-center" 
              style={{ fontSize: 'clamp(18px, 3vw, 28px)', color: '#C2C2C2' }}
            >
              No semesters found.
            </span>
          )}
          
          {!loading &&
            semesters.map((name) => {
              const slug = toSlug(name);
              return (
                <Link
                  key={slug}
                  href={`/projects/${slug}`}
                  className="star-link relative hover:text-[var(--cyan)] inline-block text-center md:text-left transition-colors duration-200 p-2 hover:scale-105 transform"
                >
                  <span className="whitespace-nowrap">{name}</span>
                </Link>
              );
            })}
        </div>
      </div>

      {/* Desktop Navigation Section */}
      <div className="page-navigation">
        <nav className="nav-purple">
          <ul>
            <li>
              <Link
                href="/"
                className="page-nav block"
                style={{ '--nav-hover-color': 'var(--purple)' } as React.CSSProperties}
              >
                ⏎
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--foreground)] z-20"
        style={{
          padding: 'clamp(12px, 2vh, 16px)'
        }}
      >
        <ul 
          className="flex justify-around items-center font-decor"
          style={{
            fontSize: 'clamp(20px, 4vw, 30px)'
          }}
        >
          {NAVIGATION_LINKS.map(({ href, label, mobileLabel }) => (
            <li key={href}>
              <Link 
                href={href} 
                className="hover:text-[var(--purple)] transition-colors duration-200 px-2 py-1"
              >
                {mobileLabel || label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}