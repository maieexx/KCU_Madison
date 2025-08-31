"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProjectFormData {
  title: string;
  teamName: string;
  teamMembers: string[];
  description: string;
  languages: string[];
  github: string;
  presentation: string;
  presentationThumb: string;
  semester: string;
  isWinner: boolean;
}

export default function AdminAddProject() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    teamName: "",
    teamMembers: [],
    description: "",
    languages: [],
    github: "",
    presentation: "",
    presentationThumb: "",
    semester: "",
    isWinner: false,
  });

  const [teamMemberInput, setTeamMemberInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/auth');
    }
    setIsLoading(false);
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addTeamMember = () => {
    if (teamMemberInput.trim() && !formData.teamMembers.includes(teamMemberInput.trim())) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, teamMemberInput.trim()]
      }));
      setTeamMemberInput("");
    }
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    if (languageInput.trim() && !formData.languages.includes(languageInput.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, languageInput.trim()]
      }));
      setLanguageInput("");
    }
  };

  const removeLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formData.teamName.trim()) {
      setError("Team name is required");
      return false;
    }
    if (formData.teamMembers.length === 0) {
      setError("At least one team member is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (formData.languages.length === 0) {
      setError("At least one programming language is required");
      return false;
    }
    if (!formData.semester.trim()) {
      setError("Semester is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create project");
      }

      setSuccess("Project created successfully! Redirecting...");
      
      // Reset form
      setFormData({
        title: "",
        teamName: "",
        teamMembers: [],
        description: "",
        languages: [],
        github: "",
        presentation: "",
        presentationThumb: "",
        semester: "",
        isWinner: false,
      });

      // Redirect to project page after 2 seconds
      setTimeout(() => {
        router.push(`/projects/${result.project.semester}/${result.project._id}`);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    router.push('/auth');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl font-decor">Loading...</div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-decor mb-4">Access Denied</p>
          <Link href="/auth" className="text-[#00FFFF] hover:underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Exit Symbol */}
      <div className="absolute top-[20px] left-[100px]">
        <Link href="/projects" style={{ color: '#F56CCE' }} className="font-decor">
          ☒
        </Link>
      </div>

        {/* Logout and Navigation */}
        <div className="absolute top-[40px] right-[50px] flex gap-4">
        <Link
            href="/auth/edit-project"
            style={{ fontSize: '25px' }}
            className="px-1 py-1 text-white border-2 border-white font-decor text-center hover:text-[--yellow] hover:border-[--yellow]"
        >
            Edit Projects
        </Link>
        <button
            onClick={handleLogout}
            style={{ fontSize: '25px' }}
            className="px-2 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors font-decor"
        >
            Logout
        </button>
        </div>


    {/* Large White Box Container */}
    <div className="absolute w-[1000px] h-[500px] left-[350px] right-[250px] top-[250px] bottom-[150px] text-black p-8 overflow-y-auto border-4 border-[--neongreen]">        
        {/* Header inside the box */}
        <div className="border-b-2 border-gray-300 pb-4 mb-6">
          <h1 style={{ fontSize: '25px', color: 'var(--neongreen)' }} className="font-decor">
            ◆ System Control.AddProject
          </h1>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="font-decor bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="font-decor bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Title */}
          <div className="lg:col-span-2">
            <label style={{ fontSize: '35px' }} className="block text-white font-decor mb-2">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-[800px] h-[50px] px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-pt"
              style={{ fontSize: '20px', color: '#8F4EFF' }}
              required
            />
          </div>

          {/* Team Name */}
          <div>
            <label style={{ fontSize: '35px' }} className="block text-white font-decor mb-2">Team Name *</label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleInputChange}
              className="w-[400px] h-[50px] px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-pt"
              style={{ fontSize: '20px', color: '#8F4EFF' }}
              required
            />
          </div>

            <style jsx>{`
                select option {
                    font-size: 20px; /* smaller font for all options */
                }
            `}</style>
          {/* Semester */}
          <div>
            <label style={{ fontSize: '35px' }} className="block text-white font-decor mb-2">Semester *</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              style={{ fontSize: '20px', color: '#8F4EFF' }}
              className="w-[400px] h-[50px] px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-pt"
              required
            >
              <option value="">Select Semester</option>
              <option value="2025-spring">2025 Spring</option>
              <option value="2025-fall">2025 Fall</option>
              <option value="2024-fall">2024 Fall</option>
              <option value="2024-spring">2024 Spring</option>
              <option value="2023-fall">2023 Fall</option>
              <option value="2023-spring">2023 Spring</option>
              <option value="2022-fall">2022 Fall</option>
              <option value="2022-spring">2022 Spring</option>
            </select>
          </div>

            {/* Team Members */}
            <div className="lg:col-span-1">
            <label
                style={{ fontSize: '35px' }}
                className="block text-white font-decor mb-2"
            >
                Team Members *
            </label>
            <div className="flex gap-2 mb-2">
                <input
                type="text"
                value={teamMemberInput}
                onChange={(e) => setTeamMemberInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTeamMember())}
                className="px-2 py-1 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-pt"
                style={{ fontSize: '18px', width: '300px', height: '50px', color: '#8F4EFF' }}
                placeholder="Enter team member name"
                />
                <button
                type="button"
                onClick={addTeamMember}
                className="h-[50px] px-3 py-1 bg-[#8F4EFF] text-white rounded hover:bg-purple-600 transition-colors font-pt text-center"
                style={{ fontSize: '15px', height: '50px' }}
                >
                Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {formData.teamMembers.map((member, index) => (
                <span
                  key={index}
                  className="h-[50px] bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2 font-navbar"
                  style={{ fontSize: '50px', color: '#8F4EFF' }}
                >
                  {member}
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                    style={{ fontSize: '50px' }}
                  >
                    ×
                  </button>
                </span>
                ))}
            </div>
            </div>


          {/* Description */}
          <div className="lg:col-span-2">
            <label style={{ fontSize: '35px' }} className="block text-white font-decor mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-[400px] h-[150px] px-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none resize-vertical font-pt"
              style={{ fontSize: '23px', color: '#8F4EFF' }}
              required
            />
          </div>

          {/* Languages */}
          <div className="lg:col-span-2">
            <label style={{ fontSize: '35px' }} className="block text-white font-decor mb-2">Programming Languages *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                className="w-[400px] h-[50px] px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-pt"
                style={{ fontSize: '18px', color: '#8F4EFF' }}
                placeholder="Enter programming language"
              />
              <button
                style={{ fontSize: '15px' }}
                type="button"
                onClick={addLanguage}
                className="h-[50px] px-4 py-2 bg-[#8F4EFF] text-white rounded hover:bg-purple-600 transition-colors font-pt"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language, index) => (
                <span
                  key={index}
                  className="h-[50px] bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2 font-navbar"
                  style={{ fontSize: '50px', color: '#8F4EFF' }}
                >
                  {language}
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                    style={{ fontSize: '50px' }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* GitHub */}
          <div>
            <label style={{ fontSize: '35px' }} className="block text-white font-decor mb-2">GitHub Repository</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              className="h-[50px] w-[450px] px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-pt"
              placeholder="https://github.com/username/repo"
              style={{ fontSize: '18px', color: '#8F4EFF' }}
            />
          </div>

          {/* Presentation */}
          <div>
            <label style={{ fontSize: '35px' }} className="block text-white font-decor mb-2">Presentation Link</label>
            <input
              type="url"
              name="presentation"
              value={formData.presentation}
              onChange={handleInputChange}
              className="h-[50px] w-[450px] px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-pt"
              placeholder="Google Slides or other presentation URL"
              style={{ fontSize: '18px', color: '#8F4EFF' }}
            />
          </div>

          {/* Presentation Thumbnail */}
          <div className="lg:col-span-2">
            <label style={{ fontSize: '35px' }} className="block text-white font-decor mb-2">Presentation Thumbnail URL</label>
            <input
              type="url"
              name="presentationThumb"
              value={formData.presentationThumb}
              onChange={handleInputChange}
              className="h-[50px] w-[450px] px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-pt"
              placeholder="Optional: Direct URL to thumbnail image"
              style={{ fontSize: '18px', color: '#8F4EFF' }}
            />
          </div>

          {/* Winner Checkbox */}
          <div className="lg:col-span-2 flex items-center">
            <input
              type="checkbox"
              name="isWinner"
              id="isWinner"
              checked={formData.isWinner}
              onChange={handleInputChange}
              className="mr-3 w-5 h-5 text-[#8F4EFF] border-gray-300 rounded focus:ring-[#8F4EFF]"
            />
            <label style={{ fontSize: '35px' }} htmlFor="isWinner" className="text-white font-decor">
              Mark as Winner
            </label>
          </div>

            {/* Submit Buttons */}
            <div className="lg:col-span-2 pt-6 flex gap-4">
            <button
                style={{ fontSize: '35px' }}
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1 px-6 py-3 text-white rounded font-decor hover:text-[--neongreen] transition-colors"
            >
                {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
                style={{ fontSize: '35px' }}
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 text-white rounded font-decor hover:text-[--neongreen] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Creating Project..." : "Create Project"}
            </button>
            </div>

        </form>

        {/* Preview Section */}
        {showPreview && formData.title && (
          <div className="mt-8 p-6 rounded border-l-4 border-[#8F4EFF]">
            <h3 className="text-xl font-bold text-[#8F4EFF] mb-4 font-decor">PREVIEW</h3>
            <div className="space-y-1 font-navbar text-black">
              <h4 style={{fontSize: '35px'}} className="font-pt">{formData.title}</h4>
              {formData.isWinner && (
                <span style={{fontSize: '20px'}} className="h-[50px] w-[100px] flex items-center justify-center bg-[#00FFFF] text-black font-pt rounded">Winner</span>
              )}
              <p style={{fontSize: '35px'}} className="font-pt"><strong>Team:</strong> {formData.teamName}</p>
              <p style={{fontSize: '35px'}} className="font-pt"><strong>Members:</strong> {formData.teamMembers.join(", ") || "None added"}</p>
              <p style={{fontSize: '35px'}} className="font-pt"><strong>Description:</strong> {formData.description || "No description"}</p>
              <p style={{fontSize: '35px'}} className="font-pt"><strong>Languages:</strong> {formData.languages.join(", ") || "None added"}</p>
              <p style={{fontSize: '35px'}} className="font-pt"><strong>Semester:</strong> {formData.semester || "Not selected"}</p>
              {formData.github && <p style={{fontSize: '35px'}} className="font-pt"><strong>GitHub:</strong> {formData.github}</p>}
              {formData.presentation && <p style={{fontSize: '35px'}} className="font-pt"><strong>Presentation:</strong> {formData.presentation}</p>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}