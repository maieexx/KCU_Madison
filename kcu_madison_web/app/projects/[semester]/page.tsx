// app/projects/[semester]/page.tsx
import Image from "next/image";
import Link from "next/link";
import connectMongo from "@/lib/db";
import Project from "@/lib/projectModel";
import { toSlug } from "@/lib/slug";

type Props = {
  params: Promise<{ semester: string }>;
};

export default async function SemesterPage({ params }: Props) {
  const resolvedParams = await params;
  await connectMongo();

  const allProjects = await Project.find()
    .select("_id title presentation semester isWinner")
    .lean();

  const projects = allProjects.filter((p: any) => toSlug(p.semester) === resolvedParams.semester);

  const getPresentationId = (presentation: string) => {
    if (!presentation) return null;
    const match = presentation.match(/\/d\/([a-zA-Z0-9_-]+)/) || presentation.match(/^([a-zA-Z0-9_-]+)$/);
    return match ? match[1] : null;
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="font-title text-[#8F4EFF]">PROJECTS</h1>
      <h2 className="mt-2 text-2xl font-extrabold text-[#00E5FF]">
        [ {resolvedParams.semester.replace("-", " ").toUpperCase()} ]
      </h2>

      <section className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length ? (
          projects.map((p: any) => {
            const presentationId = getPresentationId(p.presentation);
            return (
              <Link
                key={p._id.toString()}
                href={`/projects/${resolvedParams.semester}/${p._id}`}
                className="border border-cyan-500/40 rounded-2xl p-4 hover:border-cyan-300 transition"
              >
                <div className="aspect-video relative mb-3">
                  <Image
                    src={
                      presentationId
                        ? `/api/slides/first-thumb?pid=${presentationId}`
                        : "https://via.placeholder.com/200"
                    }
                    alt={`${p.title} thumbnail`}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized // API 썸네일은 최적화 없이
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
      </section>
    </main>
  );
}
