'use client';

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AddProject from "./components/AddProject";
import { fetchAllProjects } from "@/services/projects";

const Page = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState<[]>([]);

  const toggleAddProject = () => setShowAddProject(!showAddProject);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchAllProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    loadProjects();
  }, []);

  return (
    <main className="bg-slate-100 w-screen h-screen">
      <Navbar />
      {showAddProject ? (
        <AddProject onBack={toggleAddProject} />
      ) : (
        <div>
          <div className="flex justify-between p-10">
            <p className="text-black text-[28px] font-semibold">
              Tracked Projects
            </p>
            <button
              className="bg-blue-500 p-5 rounded-xl font-semibold"
              onClick={toggleAddProject}
            >
              Add Project
            </button>
          </div>
          <div className="flex justify-between">
            <div className="p-5 ml-5 space-y-3">
              <p className="text-black text-[24px] font-semibold">
                Token Projects
              </p>
              <div className="max-w-[900px] lg:w-[900px] bg-white h-[600px] rounded-lg">
                {/* Iterate over projects and display them */}
                {projects.map((project, index) => (
                  <div key={index}>{project.name}</div> // Adjust according to your project structure
                ))}
              </div>
            </div>
            <div className="p-5 mr-5 space-y-3">
              <p className="text-black text-[24px] font-semibold">
                NFT Projects
              </p>
              <div className="max-w-[900px] lg:w-[900px] bg-white h-[600px] rounded-lg"></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
