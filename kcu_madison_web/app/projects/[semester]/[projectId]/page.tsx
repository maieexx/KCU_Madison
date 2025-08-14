import { Project } from '../../../types/projects';
import { useParams } from 'next/navigation';

export default async function IndividualPage() {
  const { semester, projectId } = useParams<{ semester: string; projectId: string }>();
  const res = await fetch(`http://localhost:5000/api/project/${projectId}`);
  const project = await res.json();

  return (
    <div className="projects-specific">
      <h1>PROJECTS [{semester}]</h1>
      <div className="project-details">
        <h2>{project.title} {project.isWinner ? '⭐ Semester Winner!' : ''}</h2>
        <img src={project.presentation} alt="Presentation" />
        <p>{project.description}</p>
        <p>Used Languages: {project.languages.join(', ')}</p>
        <p>Project GitHub: <a href={project.github || '#'} target="_blank" rel="noopener noreferrer">{project.github || 'Not available'}</a></p>
      </div>
    </div>
  );
}