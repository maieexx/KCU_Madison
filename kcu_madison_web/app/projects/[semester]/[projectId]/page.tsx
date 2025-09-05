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
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Title Section */}
      <div className="absolute top-4 left-4 md:top-[70px] md:left-[100px] z-10">
        <h1 style={{ color: 'var(--purple)' }} className="font-title">PROJECTS</h1>
      </div>

      {/* Semester Badge */}
      <p className="absolute top-16 left-4 md:left-[130px] md:top-[230px] font-decor text-xl md:text-3xl lg:text-4xl xl:text-5xl z-10" style={{ color: 'var(--cyan)' }}>
        [ {project.semester.replace("-", " ").toUpperCase()} ]
      </p>

      {/* Desktop Navigation */}
      <div className="page-navigation">
        <nav>
          <ul>
            <li>
              <Link 
                href={`/projects/${semester}`} 
                className="page-nav block"
                style={{ '--nav-hover-color': 'var(--purple)' } as React.CSSProperties}
              >
                ⏎
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Container */}
      <div className="px-4 sm:px-8 md:px-12 pt-[200px] sm:pt-[250px] sm:pb-[50px] md:pt-[300px] md:pb-[100px] lg:pt-[350px] lg:pb-[100px] xl:pt-[400px] xl:pb-[160px] pb-[250px]">
        
        {/* Project Details Section */}
        <div className="w-full max-w-7xl mx-auto">
          <div className=" flex gap-12 border-2 border-[--cyan] p-2">
            <div className="flex gap-12 border-2 border-[--cyan] sm:p-4 md:p-4 lg:p-5 xl:p-6">

            {/* Slides Thumbnail - Mobile */}
            <div className="w-full flex justify-center">
              {presentationId ? (
                <Link
                  href={`https://docs.google.com/presentation/d/${presentationId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full max-w-md"
                >
                  <div className="relative w-full aspect-[5/3] border-4 border-white flex justify-center items-center p-1 hover:border-[var(--cyan)] transition-colors">
                    <Image
                      src={project.presentationThumb || `/api/slides/first-thumb?pid=${presentationId}`}
                      alt={`${project.title} thumbnail`}
                      width={400}
                      height={240}
                      className="object-contain w-full h-full"
                      unoptimized
                    />
                  </div>
                </Link>
              ) : (
                <div className="text-zinc-400 font-pt text-center">No presentation available</div>
              )}
            </div>

            {/* Project Information - Mobile */}
            <div className="px-4">
              <h2 className="font-pt text-2xl sm:text-3xl md:text-4xl mb-4" style={{ color: 'var(--foreground)' }}>
                {project.title}
              </h2>
              {project.isWinner && (
                <span className="inline-block bg-[var(--cyan)] text-[var(--background)] px-3 py-1 mb-4 rounded font-pt text-sm">
                  Semester Winner!
                </span>
              )}
              <div className="space-y-3 font-pt text-sm md:text-base" style={{ color: 'var(--foreground)' }}>
                <p><strong>Team:</strong> {project.teamName}</p>
                <p><strong>Members:</strong> {project.teamMembers.join(", ")}</p>
                <p><strong>Description:</strong> {project.description}</p>
                <p><strong>Languages:</strong> {project.languages.join(", ")}</p>
                {project.github && (
                  <p>
                    <strong>GitHub:</strong>{" "}
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: 'var(--cyan)' }}
                    >
                      View on GitHub
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Navigation */}
      <nav className="2xl:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--foreground)] p-4 z-20 mobile-nav">
        <div className="flex justify-center">
          <Link 
            href={`/projects/${semester}`}
            className="nav-link font-sub px-4 py-2"
          >
            Back to {semester.replace("-", " ")}
          </Link>
        </div>
      </nav>
    </main>
  );
}

// Helper function to render not found page
function renderNotFound(semester: string) {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Title Section */}
      <div className="absolute top-4 left-4 md:top-[70px] md:left-[100px] z-10">
        <h1 className="font-title" style={{ color: 'var(--purple)' }}>
          PROJECTS
        </h1>
      </div>

      {/* Error Message */}
      <p className="absolute top-16 left-4 md:left-[130px] md:top-[230px] font-decor text-xl md:text-3xl lg:text-4xl xl:text-5xl z-10" style={{ color: 'var(--cyan)' }}>
        Project Not Found
      </p>

      {/* Desktop Navigation */}
      <div className="page-navigation">
        <div className="white-line" />
        <nav>
          <ul>
            <li>
              <Link 
                href={`/projects/${semester}`} 
                className="page-nav block"
                style={{ '--nav-hover-color': 'var(--purple)' } as React.CSSProperties}
              >
                ⏎
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t-2 border-[var(--foreground)] z-20"
        style={{
          padding: 'clamp(12px, 2vh, 16px)'
        }}
      >
        <ul 
          className="flex justify-center items-center font-decor"
          style={{
            fontSize: 'clamp(20px, 4vw, 30px)'
          }}
        >
          <li>
            <Link 
              href={`/projects/${semester}`} 
              className="hover:text-[var(--purple)] transition-colors duration-200 px-2 py-1"
            >
              Back to {semester.replace("-", " ")}
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}