import Image from "next/image";
import Link from "next/link";
import connectMongo from "@/lib/db";
import Project, { IProject } from "@/lib/projectModel";
import { toSlug } from "@/lib/slug";
import Footer from "@/app/components/footer/page";

type Props = {
  params: Promise<{ semester: string }>;
};

export default async function SemesterPage({ params }: Props) {
  const resolvedParams = await params;
  const semester = resolvedParams.semester;

  await connectMongo();

  const allProjects = (await Project.find<IProject>()
    .select("_id title presentation presentationThumb semester isWinner")
    .lean()) as unknown as IProject[];

    // Extract unique semesters for right nav
    const semesters = Array.from(new Set(allProjects.map((p) => p.semester)))
    .sort((a, b) => {
        const [yearA, termA] = a.split(" ");
        const [yearB] = b.split(" ");

        // Compare years first
        if (yearA !== yearB) return Number(yearA) - Number(yearB);

        // If years are the same, prioritize Spring (SP)
        return termA === "SP" ? -1 : 1;
    });


  const projects = allProjects.filter((p) => toSlug(p.semester) === toSlug(semester));

  const getPresentationId = (presentation: string) => {
    const match = presentation.match(/\/d\/([a-zA-Z0-9_-]+)/) || presentation.match(/^([a-zA-Z0-9_-]+)$/);
    return match ? match[1] : null;
  };

  return (
    <main className="min-h-screen p-8">
      <div className="absolute top-[70px] left-[100px]">
        <h1 style={{ color: '#8F4EFF' }} className="font-title">PROJECTS</h1>
      </div>

      <p className="absolute left-[130px] top-[230px] font-decor text-[#00FFFF] text-5xl">
        [ {semester.replace("-", " ").toUpperCase()} ]
      </p>

      <div className="absolute top-[350px] left-[180px] grid gap-[80px] sm:grid-cols-2 lg:grid-cols-4">
        {projects.length ? projects.map(p => {
          const presentationId = getPresentationId(p.presentation);
          if (!presentationId) return null;

          return (
            <Link key={p._id.toString()} href={`/projects/${semester}/${p._id.toString()}`} className="block w-full">
              <div className="relative w-[15rem] h-36 sm:h-40 lg:h-44 mb-2 border-4 border-white flex justify-center items-center p-1 hover:border-[#00FFFF] transition-colors">
                <Image
                  src={p.presentationThumb || `/api/slides/first-thumb?pid=${presentationId}`}
                  alt={`${p.title} thumbnail`}
                  width={240}
                  height={144}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="font-pt flex items-center gap-2 text-white">{p.title}</div>
            </Link>
          );
        }) : (
          <div className="text-zinc-400">No projects for this semester yet.</div>
        )}
      </div>

      {/* Right Navigation */}
      <nav className="absolute right-[50px] top-[30px]">
        <ul className="font-decor text-right" style={{ fontSize: '35px' }}>
          <li className="mb-[20px]">
            <Link href="/" className="hover:text-[var(--cyan)] page-nav block">⏎</Link>
          </li>
          {semesters.filter(sem => toSlug(sem) !== toSlug(semester)).map((sem, idx) => (
            <li key={sem} className={idx === 0 ? '' : 'mt-[20px]'}>
              <Link href={`/projects/${toSlug(sem)}`} className="hover:text-[#8F4EFF] page-nav block">{sem}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <Footer />
    </main>
  );
}
