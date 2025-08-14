'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../globals.css';


const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5001';

export default function ProjectsPage() {
  const [semesters, setSemesters] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/semesters')
      .then((res) => res.json())
      .then((data: string[]) => setSemesters(data))
      .catch((err) => console.error('Failed to fetch semesters', err));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Title Section */}
      <h1 className="font-title absolute top-[70px] left-[100px]" style={{ color: '#8F4EFF' }}>
          Projects
      </h1>

      {/* Main Semester Section */}
      <div className="absolute top-[200px] left-[100px] flex flex-wrap gap-10">
        {semesters.map((semester) => (
          <Link
            key={semester}
            href={`/projects/${semester}`}
            className="text-white hover:text-[var(--cyan)]"
          >
            {semester}
          </Link>
        ))}
      </div>

      {/* Right Navigation Section */}
      <nav className="absolute right-[50px] top-[200px] -translate-y-[180px] overflow-hidden">
        <ul className="font-decor text-right" style={{ fontSize: 35 }}>
            <li>
              <Link href="/" className="hover:text-[var(--cyan)] nav-link block">
                ⏎
              </Link>
            </li>
        </ul>
      </nav>


    </main>

  );
}