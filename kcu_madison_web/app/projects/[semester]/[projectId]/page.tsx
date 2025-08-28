// app/projects/[semester]/[projectId]/page.tsx
import Image from "next/image";
import Link from "next/link";
import connectMongo from "@/lib/db.js";
import ProjectModel from "@/lib/projectModel.js";
import type { Project as ProjectType } from "../../../models/projects";

type Params = { semester: string; projectId: string };

export default async function IndividualPage({
  params,
}: {
  params: Promise<Params>;
}) {
  // Next 15: params is a promise
  const { semester, projectId } = await params;

  // Connect and fetch single document
  await connectMongo();

  // Use .lean() and tell TS the shape returned is ProjectType | null
  const doc = (await ProjectModel.findById(projectId).lean().exec()) as
    | (ProjectType & { _id: any })
    | null;

  if (!doc) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <h1 className="font-title text-3xl">Project not found</h1>
        <Link href={`/projects/${encodeURIComponent(semester)}`} className="underline mt-4 inline-block">
          ← Back to {semester.replace("-", " ")}
        </Link>
      </main>
    );
  }

  // Now TS knows `doc` is a single ProjectType — safe to access `presentation`
  const thumbSrc = doc.presentationThumb
    ? doc.presentationThumb
    : doc.presentation
    ? `/api/slides/first-thumb?url=${encodeURIComponent(doc.presentation)}`
    : "/thumb-fallback.svg";

  return (
    <main className="projects-specific p-10 bg-black text-white min-h-screen">
      <h1 className="font-title text-4xl mb-6" style={{ color: "#8F4EFF" }}>
        PROJECTS [{semester.replace("-", " ")}]
      </h1>

      <article className="space-y-6">
        <h2 className="text-2xl font-bold">
            {p.isWinner && <span className="text-cyan-300 text-sm">★</span>}
        </h2>

        <div className="w-full max-w-3xl aspect-video relative">
          <Image
            src={thumbSrc}
            alt={`${doc.title} presentation`}
            fill
            className="object-cover rounded-xl shadow-lg"
            sizes="(min-width:1024px) 60vw, 100vw"
          />
        </div>

        {doc.description && <p className="text-lg">{doc.description}</p>}

        {Array.isArray(doc.languages) && (
          <p>
            <strong>Used Languages:</strong> {doc.languages.join(", ")}
          </p>
        )}

        {doc.github && (
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={doc.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">
              {doc.github}
            </a>
          </p>
        )}

        <Link href={`/projects/${encodeURIComponent(semester)}`} className="underline">
          ← Back to {semester.replace("-", " ")}
        </Link>
      </article>
    </main>
  );
}
