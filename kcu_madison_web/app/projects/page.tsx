'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../globals.css';
import Footer from '../components/footer/page';


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
    <main className="min-h-screen relative">
      {/* Title Section */}
      <h1 className="font-title absolute top-[70px] left-[100px]" style={{ color: '#8F4EFF' }}>
          Projects
      </h1>

      {/* Main Semester Section */}
      <p
        style={{ color: '#C2C2C2', fontSize: '50px', letterSpacing: '5px' }}
        className="font-decor absolute left-[500px] top-[250px]"
      >
        Select a semester to explore!
      </p>

      <div
        style={{fontSize: '60px'}}
        className="font-decor absolute top-[400px] left-[270px] flex flex-wrap gap-20"
      >
        {loading && <span style={{ fontSize: 50, color: '#C2C2C2' }}>Loading…</span>}
        {!loading && semesters.length === 0 && (
          <span style={{ fontSize: 28, color: '#C2C2C2' }}>No semesters found.</span>
        )}
        {!loading &&
          semesters.map((name) => {
            const slug = toSlug(name);
            return (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="star-link relative hover:text-[var(--cyan)] inline-block"
              >
                <span>{name}</span>

              </Link>
            );
          })}
      </div>

      {/* Right Navigation Section */}
      <nav className="absolute right-[50px] top-[30px]">
        <ul className="font-decor text-right" style={{ fontSize: 35 }}>
            <li>
              <Link href="/" className="hover:text-[var(--cyan)] page-nav block">
                ⏎
              </Link>
            </li>
        </ul>
      </nav>

      {/* Footer */}
      <Footer />
    </main>

  );
}