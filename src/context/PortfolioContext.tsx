"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { projectsData, Project } from "@/data/projects";

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  linkedin: string;
  github: string;
  email: string;
  whatsapp: string;
  resume: string;
  portfolio: string;
}

export interface ProjectLink {
  github: string;
  demo: string;
  video: string;
}

export interface ProjectLinksMap {
  [projectId: string]: ProjectLink;
}

interface PortfolioContextType {
  profile: ProfileData;
  projectLinks: ProjectLinksMap;
  projects: Project[];
  updateProfile: (data: Partial<ProfileData>) => void;
  updateProjectLinks: (projectId: string, links: Partial<ProjectLink>) => void;
  resetToDefault: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
}

const defaultProfile: ProfileData = {
  name: "Kamran Khan",
  title: "Agentic AI Developer",
  bio: "Designing and deploying autonomous AI systems at Nexe Internship 2026. Specialized in dynamic tool calling, multi-agent orchestrations, retrieval-augmented generation (RAG), and high-performance, glassmorphic control dashboards.",
  linkedin: "https://www.linkedin.com/in/kamran-khan-7138342b8",
  github: "https://github.com/Kamrankhan787",
  email: "kamrankhankhi5@gmail.com",
  whatsapp: "+923362605888",
  resume: "#resume-placeholder",
  portfolio: "https://projects-dashboard-mauve.vercel.app/"
};

const defaultProjectLinks: ProjectLinksMap = {
  "tool-calling-agent": {
    github: "https://github.com/Kamrankhan787/beginner-task-1",
    demo: "https://github.com/Kamrankhan787/beginner-task-1",
    video: "/videos/demo video of task 1.mp4"
  },
  "ai-calculator-agent": {
    github: "https://github.com/Kamrankhan787/beginner-task-2",
    demo: "https://github.com/Kamrankhan787/beginner-task-2",
    video: "/videos/demo video of task 2.mp4"
  },
  "multi-tool-agent": {
    github: "https://github.com/Kamrankhan787/intermediate-task-3",
    demo: "https://github.com/Kamrankhan787/intermediate-task-3",
    video: "/videos/demo video of task 3.mp4"
  },
  "rag-assistant": {
    github: "https://github.com/Kamrankhan787/intermediate-task-4",
    demo: "https://intermediate-task-4-qjem.vercel.app/",
    video: "/videos/demo video of task 4.mp4"
  },
  "autonomous-business-agent": {
    github: "https://github.com/Kamrankhan787/advance-task-5",
    demo: "https://autonomous-business-agent-olive.vercel.app/",
    video: "/videos/demo video of task 5.mp4"
  },
  "multi-agent-system": {
    github: "https://github.com/Kamrankhan787/advance-task-6",
    demo: "https://advance-task-6.vercel.app/",
    video: "/videos/demo video of task 6.mp4"
  }
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [projectLinks, setProjectLinks] = useState<ProjectLinksMap>(defaultProjectLinks);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("portfolio_profile");
      const storedLinks = localStorage.getItem("portfolio_project_links");

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      if (storedLinks) {
        setProjectLinks(JSON.parse(storedLinks));
      }
    } catch (e) {
      console.error("Failed to load portfolio settings from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when updated
  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => {
      const next = { ...prev, ...data };
      localStorage.setItem("portfolio_profile", JSON.stringify(next));
      return next;
    });
  };

  const updateProjectLinks = (projectId: string, links: Partial<ProjectLink>) => {
    setProjectLinks((prev) => {
      const next = {
        ...prev,
        [projectId]: { ...prev[projectId], ...links }
      };
      localStorage.setItem("portfolio_project_links", JSON.stringify(next));
      return next;
    });
  };

  const resetToDefault = () => {
    setProfile(defaultProfile);
    setProjectLinks(defaultProjectLinks);
    localStorage.removeItem("portfolio_profile");
    localStorage.removeItem("portfolio_project_links");
  };

  // Construct combined projects list
  const projects = projectsData.map((project) => {
    const customLinks = projectLinks[project.id] || defaultProjectLinks[project.id];
    return {
      ...project,
      github: customLinks.github,
      demo: customLinks.demo,
      video: customLinks.video
    };
  });

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projectLinks,
        projects,
        updateProfile,
        updateProjectLinks,
        resetToDefault,
        isSettingsOpen,
        setIsSettingsOpen
      }}
    >
      {isInitialized ? children : <div className="bg-[#03000a] min-h-screen" />}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
