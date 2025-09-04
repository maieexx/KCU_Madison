"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

const AdminEditProject = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState<ProjectFormData>({
    title: 'Web Portfolio Platform',
    teamName: 'Code Innovators',
    teamMembers: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    description: 'A comprehensive web portfolio platform designed for developers to showcase their projects with interactive features and responsive design. Built with modern web technologies.',
    languages: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    github: 'https://github.com/team/portfolio-platform',
    presentation: 'https://docs.google.com/presentation/d/sample-id',
    presentationThumb: 'https://via.placeholder.com/400x300/8F4EFF/ffffff?text=Portfolio+Platform',
    semester: '2024-fall',
    isWinner: true,
  });

  const [originalData, setOriginalData] = useState<ProjectFormData>(formData);
  const [teamMemberInput, setTeamMemberInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [formData, originalData]);

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
      const response = await fetch(`/api/admin/projects/${formData.title}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update project");
      }

      setSuccess("Project updated successfully!");
      setOriginalData(formData); // Update original data to reflect saved state
      setHasUnsavedChanges(false);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/projects/${formData.title}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setSuccess("Project deleted successfully! Redirecting...");
      setTimeout(() => {
        router.push("/projects");
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (hasUnsavedChanges && !confirm("Are you sure you want to reset all changes?")) {
      return;
    }
    setFormData(originalData);
    setError("");
    setSuccess("");
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
        <Link href="/" style={{ color: '#F56CCE' }} className="font-decor">
          ☒
        </Link>
      </div>

      {/* Navigation and Logout */}
      <div className="absolute top-[20px] right-[50px] flex gap-4">
        <Link
          href="/projects"
          className="px-4 py-2 bg-[#00FFFF] text-black rounded hover:bg-cyan-400 transition-colors font-decor"
        >
          View Projects
        </Link>
        <Link
          href="/admin/add"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-decor"
        >
          Add Project
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-decor"
        >
          Logout
        </button>
      </div>

      {/* Large White Box Container */}
      <div className="absolute left-[250px] right-[250px] top-[200px] bottom-[150px] text-black rounded-lg p-8 overflow-y-auto border-4 border-white">        
        {/* Header inside the box */}
        <div className="border-b-2 border-gray-300 pb-4 mb-6 flex items-center justify-between">
          <h1 style={{ fontSize: '25px' }} className="font-decor text-white flex items-center gap-2">
            ◆ System Control.EditProject
            {hasUnsavedChanges && (
              <span className="text-sm bg-yellow-500 text-black px-2 py-1 rounded">
                Unsaved Changes
              </span>
            )}
          </h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasUnsavedChanges}
              className="px-4 py-2 bg-gray-500 text-white rounded font-decor hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded font-decor hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Project
            </button>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Title */}
          <div className="lg:col-span-2">
            <label className="block text-white font-decor text-lg mb-2">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-navbar"
              required
            />
          </div>

          {/* Team Name */}
          <div>
            <label className="block text-white font-decor text-lg mb-2">Team Name *</label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-navbar"
              required
            />
          </div>

          {/* Semester */}
          <div>
            <label className="block text-white font-decor text-lg mb-2">Semester *</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-navbar"
              required
            >
              <option value="">Select Semester</option>
              <option value="2025-spring">2025 Spring</option>
              <option value="2025-fall">2025 Fall</option>
              <option value="2024-fall">2024 Fall</option>
              <option value="2024-spring">2024 Spring</option>
              <option value="2023-fall">2023 Fall</option>
              <option value="2023-spring">2023 Spring</option>
            </select>
          </div>

          {/* Team Members */}
          <div className="lg:col-span-2">
            <label className="block text-white font-decor text-lg mb-2">Team Members *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={teamMemberInput}
                onChange={(e) => setTeamMemberInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTeamMember())}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-navbar"
                placeholder="Enter team member name"
              />
              <button
                type="button"
                onClick={addTeamMember}
                className="px-4 py-2 bg-[#8F4EFF] text-white rounded hover:bg-purple-600 transition-colors font-decor"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.teamMembers.map((member, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2 font-navbar"
                >
                  {member}
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label className="block text-white font-decor text-lg mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none resize-vertical font-navbar"
              required
            />
          </div>

          {/* Languages */}
          <div className="lg:col-span-2">
            <label className="block text-white font-decor text-lg mb-2">Programming Languages *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-navbar"
                placeholder="Enter programming language"
              />
              <button
                type="button"
                onClick={addLanguage}
                className="px-4 py-2 bg-[#8F4EFF] text-white rounded hover:bg-purple-600 transition-colors font-decor"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2 font-navbar"
                >
                  {language}
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-white font-decor text-lg mb-2">GitHub Repository</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-navbar"
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* Presentation */}
          <div>
            <label className="block text-white font-decor text-lg mb-2">Presentation Link</label>
            <input
              type="url"
              name="presentation"
              value={formData.presentation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-navbar"
              placeholder="Google Slides or other presentation URL"
            />
          </div>

          {/* Presentation Thumbnail */}
          <div className="lg:col-span-2">
            <label className="block text-white font-decor text-lg mb-2">Presentation Thumbnail URL</label>
            <input
              type="url"
              name="presentationThumb"
              value={formData.presentationThumb}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded text-black focus:border-[#8F4EFF] focus:outline-none font-navbar"
              placeholder="Optional: Direct URL to thumbnail image"
            />
            {formData.presentationThumb && (
            <div className="mt-2">
                <Image
                src={formData.presentationThumb}
                alt="Presentation thumbnail preview"
                width={128}   // same as w-32
                height={96}   // same as h-24
                className="object-cover rounded border border-gray-300"
                />
            </div>
            )}
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
            <label htmlFor="isWinner" className="text-white font-decor text-lg">
              Mark as Winner
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="lg:col-span-2 pt-6 flex gap-4">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="px-6 py-3 bg-gray-500 text-white rounded font-decor hover:bg-gray-600 transition-colors"
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !hasUnsavedChanges}
              className="flex-1 px-6 py-3 bg-[#8F4EFF] text-white rounded font-decor hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating Project..." : "Update Project"}
            </button>
          </div>
        </form>

        {/* Preview Section */}
        {showPreview && formData.title && (
          <div className="mt-8 p-6 bg-gray-100 rounded border-l-4 border-[#8F4EFF]">
            <h3 className="text-xl font-bold text-[#8F4EFF] mb-4 font-decor">PREVIEW</h3>
            <div className="space-y-2 font-navbar text-black">
              <h4 className="text-2xl font-bold">{formData.title}</h4>
              {formData.isWinner && (
                <span className="inline-block bg-[#00FFFF] text-black px-2 py-1 rounded text-sm">Winner</span>
              )}
              <p><strong>Team:</strong> {formData.teamName}</p>
              <p><strong>Members:</strong> {formData.teamMembers.join(", ") || "None added"}</p>
              <p><strong>Description:</strong> {formData.description || "No description"}</p>
              <p><strong>Languages:</strong> {formData.languages.join(", ") || "None added"}</p>
              <p><strong>Semester:</strong> {formData.semester || "Not selected"}</p>
              {formData.github && <p><strong>GitHub:</strong> {formData.github}</p>}
              {formData.presentation && <p><strong>Presentation:</strong> {formData.presentation}</p>}
              {formData.presentationThumb && (
                <div className="mt-2">
                    <strong>Thumbnail Preview:</strong>
                    <br />
                    <Image
                    src={formData.presentationThumb}
                    alt="Thumbnail"
                    width={192}   // same as w-48
                    height={128}  // same as h-32
                    className="object-cover rounded mt-1"
                    />
                </div>
            )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminEditProject;