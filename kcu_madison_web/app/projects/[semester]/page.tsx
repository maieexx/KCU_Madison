// app/projects/[semester]/page.tsx
import Link from 'next/link';

type Project = { 
    id: string;
    title: string;
    slug?: string;
    presentationThumb?: string;
};

function fromSlug(slug: string) {
  const spaced = slug.replace(/-/g, ' ');
  return spaced.replace(/\b[a-z]/g, (m) => m.toUpperCase());
}

async function getProjectsFor(semesterName: string) {
  // Use NEXT_PUBLIC_API_BASE if you set it, otherwise fallback to localhost:3000
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

  try {
    const res = await fetch(
      `${base}/api/projects?semester=${encodeURIComponent(semesterName)}`,
      { cache: 'no-store' } // ensures SSR always fetches fresh data
    );

    if (!res.ok) {
      console.error('Failed to fetch projects:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    return data?.projects ?? data ?? [];
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
}


export default async function SemesterPage({
  params: { semester },
}: {
  params: { semester: string };
}) {
  const humanName = fromSlug(decodeURIComponent(semester));
  const projects: Project[] = await getProjectsFor(humanName);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-title text-4xl" style={{ color: '#8F4EFF' }}>
          {humanName} Projects
        </h1>
        <Link href="/projects" className="hover:underline">← All semesters</Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-300">No projects found for this semester.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => {
            const thumb = p.presentationThumb || "/thumb-fallback-ppt.png"; // 👈 default fallback
            return (
              <li key={p.id} className="relative group rounded-xl overflow-hidden shadow-lg">
                <Link
                  href={`/projects/${encodeURIComponent(semester)}/${encodeURIComponent(p.slug ?? p.id)}`}
                  className="block"
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={thumb}
                      alt={`${p.title} presentation`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 bg-zinc-900">
                    <h2 className="text-lg font-semibold group-hover:text-[var(--cyan)] transition">
                      {p.title}
                    </h2>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
