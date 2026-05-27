import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic AI Portfolio | Internship Dashboard 2026",
  description:
    "Full-stack AI developer portfolio showcasing 6 production-grade autonomous agent projects — from tool-calling CLI agents to multi-agent orchestration systems, RAG pipelines, and LangGraph business planners.",
  keywords: [
    "AI Agent",
    "LangChain",
    "LangGraph",
    "RAG",
    "OpenAI",
    "Next.js",
    "FastAPI",
    "Agentic AI",
    "Multi-Agent System",
    "Pinecone",
    "Internship Portfolio",
  ],
  authors: [{ name: "Aiden Sterling" }],
  openGraph: {
    title: "Agentic AI Portfolio | Internship Dashboard 2026",
    description:
      "6 production-ready AI projects: Tool Calling Agent, Calculator Agent, Multi-Tool Agent, RAG Assistant, Autonomous Business Agent, and Multi-Agent System.",
    type: "website",
  },
};

import { PortfolioProvider } from "@/context/PortfolioContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#03000a] text-slate-100">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
