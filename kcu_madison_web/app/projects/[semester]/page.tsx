import Image from "next/image";
import Link from "next/link";
import connectMongo from "@/lib/db";
import Project, { IProject } from "@/lib/projectModel";
import { toSlug } from "@/lib/slug";

type Props = {
  params: Promise<{ semester: string }>;
};

// Constants for better maintainability
const COLORS = {
  primary: '#8F4EFF',
  accent: '#00FFFF',
  white: '#FFFFFF'
} as const;

export default async function SemesterPage({ params }: Props) {
  const resolvedParams = await params;
  const semester = resolvedParams.semester;

  await connectMongo();

  const allProjects = (await Project.find<IProject>()
    .select("_id title presentation presentationThumb semester isWinner")
    .lean()) as unknown as IProject[];

  // Extract and sort unique semesters for navigation
  const semesters = Array.from(new Set(allProjects.map((p) => p.semester)))
    .sort((a, b) => {
      const [yearA, termA] = a.split(" ");
      const [yearB] = b.split(" ");
      if (yearA !== yearB) return Number(yearA) - Number(yearB);
      return termA === "SP" ? -1 : 1;
    });

  const projects = allProjects.filter((p) => toSlug(p.semester) === toSlug(semester));

  const getPresentationId = (presentation: string) => {
    const match = presentation.match(/\/d\/([a-zA-Z0-9_-]+)/) || presentation.match(/^([a-zA-Z0-9_-]+)$/);
    return match ? match[1] : null;
  };

  const displaySemester = semester.replace("-", " ").toUpperCase();

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Title Section */}
      <div className="absolute top-4 left-4 md:top-[70px] md:left-[100px] z-10">
        <h1 
          style={{ color: COLORS.primary }} 
          className="font-title text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px]"
        >
          PROJECTS
        </h1>
      </div>

      {/* Semester Badge */}
      <p 
        className="absolute top-16 left-4 md:left-[130px] md:top-[230px] font-decor text-xl md:text-3xl lg:text-4xl xl:text-5xl z-10"
        style={{ color: COLORS.accent }}
      >
        [ {displaySemester} ]
      </p>

      {/* Main Content Container */}
      <div className="px-4 sm:px-8 md:px-12 pt-[200px] sm:pt-[250px] md:pt-[300px] lg:pt-[350px] xl:pt-[400px] pb-[420px] md:pb-[450px]">
        
        {/* Projects Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 justify-items-center md:justify-items-start md:ml-[180px] lg:ml-[200px] xl:ml-[220px]"
        >
          {projects.length ? projects.map(p => {
            const presentationId = getPresentationId(p.presentation);
            if (!presentationId) return null;

            return (
              <Link 
                key={p._id.toString()} 
                href={`/projects/${semester}/${p._id.toString()}`} 
                className="block w-full max-w-[15rem] group"
              >
                <div className="relative w-full aspect-[5/3] mb-3 border-4 border-white flex justify-center items-center p-1 group-hover:border-[var(--cyan)] transition-all duration-200 group-hover:scale-105">
                  <Image
                    src={p.presentationThumb || `/api/slides/first-thumb?pid=${presentationId}`}
                    alt={`${p.title} thumbnail`}
                    width={240}
                    height={144}
                    className="object-contain w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="font-pt text-white text-sm md:text-base group-hover:text-[var(--cyan)] transition-colors duration-200 text-center md:text-left">
                  {p.title}
                </div>
              </Link>
            );
          }) : (
            <div className="col-span-full text-zinc-400 text-center text-lg">
              No projects for this semester yet.
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden xl:block absolute right-[50px] top-[30px]">
        <ul className="font-decor text-right text-2xl lg:text-3xl xl:text-[35px] space-y-5">
          <li>
            <Link 
              href="/projects" 
              className="hover:text-[var(--hover-purple)] page-nav block transition-colors duration-200"
              style={{ '--hover-purple': COLORS.primary } as React.CSSProperties}
            >
              ⏎
            </Link>
          </li>
          {semesters
            .filter(sem => toSlug(sem) !== toSlug(semester))
            .map((sem) => (
              <li key={sem}>
                <Link 
                  href={`/projects/${toSlug(sem)}`} 
                  className="hover:text-[var(--hover-purple)] page-nav block transition-colors duration-200"
                  style={{ '--hover-purple': COLORS.primary } as React.CSSProperties}
                >
                  {sem}
                </Link>
              </li>
            ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <nav className="xl:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--foreground)] p-4 z-20">
        <div className="flex overflow-x-auto space-x-4 pb-2">
          <Link 
            href="/" 
            className="flex-shrink-0 hover:text-[var(--hover-purple)] transition-colors duration-200 px-3 py-2 font-decor"
            style={{ '--hover-purple': COLORS.primary } as React.CSSProperties}
          >
            Home
          </Link>
          {semesters.map((sem) => (
            <Link 
              key={sem}
              href={`/projects/${toSlug(sem)}`} 
              className={`flex-shrink-0 transition-colors duration-200 px-3 py-2 font-decor whitespace-nowrap ${
                toSlug(sem) === toSlug(semester) 
                  ? 'text-[var(--accent)]' 
                  : 'hover:text-[var(--hover-purple)]'
              }`}
              style={{ 
                '--hover-purple': COLORS.primary,
                '--accent': COLORS.accent
              } as React.CSSProperties}
            >
              {sem}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}