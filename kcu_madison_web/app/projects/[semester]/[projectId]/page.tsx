import Image from "next/image";
import Link from "next/link";
import connectMongo from "@/lib/db";
import Project, { IProject } from "@/lib/projectModel";
import { toSlug } from "@/lib/slug";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ semester: string; projectId: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const { semester, projectId } = resolvedParams;

  await connectMongo();

  // Debug: Log collection name and all projects
  console.log(`Collection name: ${Project.collection.name}`);
  const allProjects = (await Project.find<IProject>()
    .select("_id semester title")
    .lean()) as unknown as IProject[];
  console.log(`All projects: ${JSON.stringify(allProjects.map(p => ({ _id: p._id.toString(), semester: p.semester, title: p.title })))}`);

  // Debug: Log the projectId and semester being queried
  console.log(`Querying project with ID: ${projectId}, Semester: ${semester}`);

  // Validate ObjectId format first
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    console.log(`Invalid ObjectId format: ${projectId}`);
    return renderNotFound(semester);
  }

  // Query using ObjectId with better error handling
  let project: IProject | null = null;
  try {
    // Try multiple query approaches
    console.log(`Attempting to find project by ObjectId: ${projectId}`);
    
    // First attempt: using findById
    project = (await Project.findById(projectId)
      .select("title teamName teamMembers description languages github presentation presentationThumb isWinner semester")
      .lean()) as unknown as IProject | null;
    
    console.log(`FindById result: ${project ? 'found' : 'not found'}`);
    
    // If not found, try findOne with ObjectId
    if (!project) {
      console.log(`Trying findOne with ObjectId...`);
      project = (await Project.findOne({ _id: new mongoose.Types.ObjectId(projectId) })
        .select("title teamName teamMembers description languages github presentation presentationThumb isWinner semester")
        .lean()) as unknown as IProject | null;
      
      console.log(`FindOne with ObjectId result: ${project ? 'found' : 'not found'}`);
    }
    
    // If still not found, try findOne with string comparison
    if (!project) {
      console.log(`Trying findOne with string comparison...`);
      project = (await Project.findOne({ 
        $expr: { $eq: [{ $toString: "$_id" }, projectId] }
      })
        .select("title teamName teamMembers description languages github presentation presentationThumb isWinner semester")
        .lean()) as unknown as IProject | null;
      
      console.log(`FindOne with string comparison result: ${project ? 'found' : 'not found'}`);
    }

  } catch (error: unknown) {
    console.error(`Error querying project with ObjectId ${projectId}:`, error instanceof Error ? error.message : String(error));
    console.error(`Full error:`, error);
  }

  // Debug: Log the query result
  console.log(`Final project result: ${JSON.stringify(project ? { ...project, _id: project._id.toString() } : null)}`);

  // Additional debugging: Check if project exists in the list of all projects
  const projectExistsInList = allProjects.find(p => p._id.toString() === projectId);
  console.log(`Project exists in all projects list: ${projectExistsInList ? 'yes' : 'no'}`);
  if (projectExistsInList) {
    console.log(`Found in list: ${JSON.stringify(projectExistsInList)}`);
  }

  if (!project) {
    console.log(`Project not found with ID: ${projectId}`);
    return renderNotFound(semester);
  }

  // Check semester mismatch
  const projectSemesterSlug = toSlug(project.semester);
  const expectedSemesterSlug = toSlug(semester);
  
  console.log(`Semester comparison - Project: ${projectSemesterSlug}, Expected: ${expectedSemesterSlug}`);
  
  if (projectSemesterSlug !== expectedSemesterSlug) {
    console.log(`Semester mismatch. Project semester: ${project.semester}, Expected semester: ${semester}`);
    return renderNotFound(semester);
  }

  const getPresentationId = (presentation: string) => {
    const match = presentation.match(/\/d\/([a-zA-Z0-9_-]+)/) || presentation.match(/^([a-zA-Z0-9_-]+)$/);
    return match ? match[1] : null;
  };

  const presentationId = getPresentationId(project.presentation);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      {/* Title Section */}
      <div className="absolute top-[70px] left-[100px]">
        <h1 style={{ color: '#8F4EFF' }} className="font-title">PROJECTS</h1>
      </div>
      {/* Semester and Navigation */}
      <p className="absolute left-[130px] top-[230px] font-decor text-[#00FFFF] text-5xl">
        [ {project.semester.replace("-", " ").toUpperCase()} ]
      </p>
      <nav className="absolute right-[50px] top-[30px]">
        <ul className="font-decor text-right" style={{ fontSize: '35px' }}>
          <li className="mb-[20px]">
            <Link href={`/projects/${semester}`} className="hover:text-[var(--cyan)] page-nav block">
              ⏎
            </Link>
          </li>
        </ul>
      </nav>

      {/* Project Details Section */}
      <div className="absolute top-[350px] left-[180px] flex gap-12">
        {/* Slides Thumbnail */}
        <div className="flex flex-col gap-4">
          {presentationId ? (
            <Link
              href={`https://docs.google.com/presentation/d/${presentationId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-[30rem] h-[18rem] border-4 border-white flex justify-center items-center p-1 hover:border-[#00FFFF] transition-colors">
                <Image
                  src={project.presentationThumb || `/api/slides/first-thumb?pid=${presentationId}`}
                  alt={`${project.title} thumbnail`}
                  width={480}
                  height={288}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </Link>
          ) : (
            <div className="text-zinc-400">No presentation available</div>
          )}
        </div>

        {/* Project Information */}
        <div className="max-w-[30rem] font-pt text-white">
          <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
          {project.isWinner && (
            <span className="inline-block bg-[#00FFFF] text-black px-2 py-1 mb-4 rounded">Winner</span>
          )}
          <p className="mb-2"><strong>Team:</strong> {project.teamName}</p>
          <p className="mb-2"><strong>Members:</strong> {project.teamMembers.join(", ")}</p>
          <p className="mb-2"><strong>Description:</strong> {project.description}</p>
          <p className="mb-2"><strong>Languages:</strong> {project.languages.join(", ")}</p>
          {project.github && (
            <p className="mb-2">
              <strong>GitHub:</strong>{" "}
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00FFFF] hover:underline"
              >
                View on GitHub
              </Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

// Helper function to render not found page
function renderNotFound(semester: string) {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="absolute top-[70px] left-[100px]">
        <h1 style={{ color: '#8F4EFF' }} className="font-title">PROJECTS</h1>
      </div>
      <p className="absolute left-[130px] top-[230px] font-decor text-[#00FFFF] text-5xl">
        Project Not Found
      </p>
      <nav className="absolute right-[50px] top-[30px]">
        <ul className="font-decor text-right" style={{ fontSize: '35px' }}>
          <li className="mb-[20px]">
            <Link href={`/projects/${semester}`} className="hover:text-[var(--cyan)] page-nav block">
              ⏎
            </Link>
          </li>
        </ul>
      </nav>
      <div className="absolute white-line right-[330px] top-0 bottom-0" />
    </main>
  );
}