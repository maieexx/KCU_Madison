// app/projects/[semester]/page.js
import Image from "next/image";
import Link from "next/link";
import connectMongo from "@/lib/db";
import Project from "@/lib/projectModel";
import { toSlug } from "@/lib/slug";

type Props = {
  params: { semester: string };
};

export default async function SemesterPage({ params }: Props) {  
  const resolvedParams = await params;

  await connectMongo();

  const allProjects = await Project.find()
    .select("_id title presentation semester isWinner")
    .lean();

  const projects = allProjects.filter(p => toSlug(p.semester) === resolvedParams.semester);

  const getPresentationId = (presentation: string | undefined) => {
    if (!presentation) return null;
    const match = presentation.match(/\/d\/([a-zA-Z0-9_-]+)/) || presentation.match(/^([a-zA-Z0-9_-]+)$/);
    return match ? match[1] : null;
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
        {/* Title Section */}
        <div className="absolute top-[70px] left-[100px]">
            <h1 style={{ color: '#8F4EFF' }} className='font-title' >PROJECTS</h1>
        </div>
        {/* Selected Semester */}
        <p style={{ color: '#00FFFF', fontSize: '50px' }} className="font-decor absolute left-[130px] top-[230px]">
            [ {resolvedParams.semester.replace("-", " ").toUpperCase()} ]
        </p>

      <div className="top-[200px] grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length ? (
          projects.map(p => {
            const presentationId = getPresentationId(p.presentation);
            if (!presentationId) return null; // presentation 없으면 렌더링 제외

            return (
              <Link
                key={p._id as string}
                href={`/projects/${resolvedParams.semester}/${p._id}`}
              >
                <div className="relative mb-3 w-full max-w-sm h-40 sm:h-48 lg:h-56">
                  <Image
                    src={`/api/slides/first-thumb?pid=${presentationId}`}
                    alt={`${p.title} thumbnail`}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized // API 썸네일 최적화 없이
                  />
                </div>
                <div className="text-lg font-semibold flex items-center gap-2">
                  {p.title}
                  {p.isWinner && <span className="text-cyan-300 text-sm">★</span>}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-zinc-400">No projects for this semester yet.</div>
        )}
      </div>
      {/* Right Navigation Section */}
      <div className='white-line absolute right-[330px]'/>
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
