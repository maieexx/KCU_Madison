import { Project } from '../../../types/projects';

export default async function IndividualPage({
  params,
}: {
  params: { semester: string; projectId: string };
}) {
  const { semester, projectId } = params;

  // Fetch the project from your API (use Vercel base URL or environment variable)
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5001';
  const res = await fetch(`${base}/api/projects/${projectId}`, { cache: 'no-store' });

  if (!res.ok) {
    return <p className="text-red-500">Failed to load project.</p>;
  }

  const project: Project = await res.json();

  return (
    <div className="projects-specific p-10 bg-black text-white min-h-screen">
      <h1 className="font-title text-4xl mb-6" style={{ color: '#8F4EFF' }}>
        PROJECTS [{semester.replace('-', ' ')}]
      </h1>

      <div className="project-details space-y-4">
        <h2 className="text-2xl font-bold">
          {project.title} {project.isWinner ? '⭐ Semester Winner!' : ''}
        </h2>

        {/* Presentation thumbnail */}
        <div className="w-full max-w-md">
          <img
            src={project.presentation || '/thumb-fallback-ppt.png'}
            alt="Presentation"
            className="w-full h-auto object-cover rounded-md shadow-lg"
          />
        </div>

        <p>{project.description}</p>

        <p>
          <strong>Used Languages:</strong> {project.languages.join(', ')}
        </p>

        <p>
          <strong>GitHub:</strong>{' '}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-cyan-400"
            >
              {project.github}
            </a>
          ) : (
            'Not available'
          )}
        </p>
      </div>
    </div>
  );
}
