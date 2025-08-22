// app/projects/[semester]/page.tsx
import Link from 'next/link';

type Project = { id: string; title: string; slug?: string };

function fromSlug(slug: string) {
  // reverse of toSlug: "2024-spring" -> "2024 spring" (or adjust to your exact stored format)
  const spaced = slug.replace(/-/g, ' ');
  // Capitalize words like "spring" -> "Spring"
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
        <ul className="space-y-4">
          {projects.map((p) => (
            <li key={p.id}>
              <Link
                href={`/projects/${encodeURIComponent(semester)}/${encodeURIComponent(p.slug ?? p.id)}`}
                className="hover:underline"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
