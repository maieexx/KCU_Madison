import { Project } from '../../types/projects';
import { useParams } from 'next/navigation';

export default async function SemesterPage() {
  const { semester } = useParams<{ semester: string }>();
  const res = await fetch(`http://localhost:5000/api/projects/${encodeURIComponent(semester)}`);
  const projects = await res.json();

  return (
    <div className="projects-semester">
      <h1>PROJECTS [{semester}]</h1>
      <div className="project-cards">
        {projects.map((proj: Project) => (
          <div key={proj._id} className="card">
            <img src={proj.presentation} alt={proj.title} />
            <h2>{proj.title}</h2>
            {proj.isWinner && <span>⭐ Semester Winner!</span>}
            <a href={`/projects/${encodeURIComponent(semester)}/${proj._id}`}>View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
}