export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  type: "Terminal" | "UI";
  technologies: string[];
  features: string[];
  architecture: string; // Describes the architecture nodes
  github: string;
  demo: string;
  video: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export const projectsData: Project[] = [
  {
    id: "tool-calling-agent",
    title: "Tool Calling AI Agent",
    shortDesc: "A modular CLI assistant capable of executing functions and accessing external APIs dynamically based on user requests.",
    longDesc: "This project implements an autonomous AI agent in Python that registers functions and relies on the LLM's tool-calling engine to execute them. By defining JSON schemas for tools, the agent parses user commands, invokes the corresponding local functions (e.g. weather checking, data retrieval, systems commands), gathers results, and synthesizes clean responses.",
    type: "Terminal",
    technologies: ["Python", "OpenAI API", "Pydantic", "JSON Schema", "Termcolor"],
    features: [
      "Dynamic tool mapping via custom JSON function schemas",
      "Automatic execution loop that handles multiple back-and-forth tool calls in a single turn",
      "Robust validation using Pydantic models for argument correctness",
      "Automatic error feedback allowing the agent to self-correct and retry failed executions",
      "Interactive colorized terminal prompt displaying planning and thought steps"
    ],
    architecture: "User Prompt -> LLM (Analyze Tools) -> Function Invocation Request -> Agent Executor -> Function Output -> LLM (Synthesize) -> User Response",
    github: "https://github.com/placeholder/tool-calling-agent",
    demo: "https://vercel.example/tool-calling-agent",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // YouTube embed placeholder
    metrics: [
      { label: "Execution Latency", value: "850ms" },
      { label: "Tool Success Rate", value: "98.2%" },
      { label: "Token Overhead", value: "Low" }
    ]
  },
  {
    id: "ai-calculator-agent",
    title: "AI Calculator Agent",
    shortDesc: "An intelligent calculator agent that breaks down multi-step expressions into a plan and computes them sequentially.",
    longDesc: "Developed to demonstrate complex mathematical orchestration, this terminal agent interprets textual requests containing complex math formulas. It generates a symbolic plan, registers algebraic and trigonometric tools, computes intermediate values step-by-step, and maintains an internal stack of previous operations for recursive queries.",
    type: "Terminal",
    technologies: ["Python", "OpenRouter SDK", "SymPy", "NumPy", "Python-Dotenv"],
    features: [
      "Symbolic mathematical calculation and calculus parsing using SymPy",
      "Chain-of-thought planning that exposes the agent's calculations",
      "Memory registers that store intermediate states and variables",
      "Custom regex and syntax validators to prevent command injection in code math evaluations",
      "Interactive REPL environment for recursive calculations and mathematical chat"
    ],
    architecture: "Mathematical Request -> CoT Planner -> Tool Select -> SymPy/NumPy Executor -> State Accumulator -> Final Result",
    github: "https://github.com/placeholder/ai-calculator-agent",
    demo: "https://vercel.example/ai-calculator-agent",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: [
      { label: "Precision", value: "100%" },
      { label: "Max Step Recursion", value: "10 Steps" },
      { label: "Math Parser Speed", value: "12ms" }
    ]
  },
  {
    id: "multi-tool-agent",
    title: "Multi Tool AI Agent",
    shortDesc: "A powerful system agent capable of navigating directories, running terminal processes, and searching the web.",
    longDesc: "This advanced terminal agent combines local file system operations with remote web services. Using specialized system and web scrapers, the agent can search the internet, download files, read directories, execute code sandboxes, and compile summarized logs for the developer.",
    type: "Terminal",
    technologies: ["Python", "OpenAI API", "BeautifulSoup4", "Requests", "Subprocess"],
    features: [
      "Recursive local file search and directory indexing tools",
      "Safe subprocess sandbox for checking Python code linting and runtime execution",
      "Web scraping module that extracts text, headers, and links from search engine pages",
      "Execution logs saved to disk for debugging long runs",
      "Configuration profile manager to restrict directory access for safety"
    ],
    architecture: "Query -> Task Router -> Directory Search/Scraper -> Execution Engine -> Integrity Check -> Final Artifact",
    github: "https://github.com/placeholder/multi-tool-agent",
    demo: "https://vercel.example/multi-tool-agent",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: [
      { label: "Tool Directory Size", value: "15 Tools" },
      { label: "Average Search Time", value: "1.4s" },
      { label: "Sandbox Security", value: "High" }
    ]
  },
  {
    id: "rag-assistant",
    title: "RAG Assistant",
    shortDesc: "A full retrieval-augmented generation app with a glassmorphic chat UI, document upload, and citation markers.",
    longDesc: "A complete full-stack web application. The frontend uses React & Next.js to provide a rich chat screen, complete with citations and source document previews. The backend splits uploaded PDFs, generates vector embeddings, stores them in Pinecone, and retrieves relevant snippets during chat queries to eliminate model hallucination.",
    type: "UI",
    technologies: ["Next.js", "FastAPI", "OpenAI Embeddings", "Pinecone", "LangChain", "Framer Motion"],
    features: [
      "Dynamic file upload drag-and-drop area with progress bar",
      "Recursive text splitter (character-based) with optimized chunk overlap settings",
      "Semantic search vector query fetching top-k relevant document fragments",
      "Citation mapping that Highlights the exact sentences in the PDF source text",
      "Streaming LLM completions using Server-Sent Events (SSE) for modern UI feel"
    ],
    architecture: "File Upload -> Document Processing -> Vector Store (Pinecone) -> Semantic Retrieve -> LLM Generation -> Streaming Chat UI",
    github: "https://github.com/placeholder/rag-assistant",
    demo: "https://vercel.example/rag-assistant",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: [
      { label: "Retrieval Accuracy", value: "94.5%" },
      { label: "Index Latency", value: "2.1s" },
      { label: "Context Window", value: "8k Tokens" }
    ]
  },
  {
    id: "autonomous-business-agent",
    title: "Autonomous Business Agent",
    shortDesc: "An AI business strategist that performs market analysis, fetches prices, and drafts market reports.",
    longDesc: "Designed to handle high-level business planning, this agent decomposes an objective into actionable milestones. It performs deep search queries, parses competitor websites, calculates market sizing projections, drafts SWOT matrices, and outputs a formatted business analysis paper.",
    type: "UI",
    technologies: ["Next.js", "FastAPI", "Tavily API", "LangGraph", "Pydantic", "Tailwind CSS"],
    features: [
      "Goal decomposition planning engine powered by LangGraph state machines",
      "Parallel research workers fetching information from Google Search and Tavily",
      "Automated financial template calculators (ROI, TAM/SAM/SOM charts)",
      "Structured Markdown exporter that packages findings into downloadable PDFs",
      "Real-time task board UI that updates as workers execute research segments"
    ],
    architecture: "Business Goal -> Graph Planner -> Market Search Node -> Competitor Analysis Node -> Financial Synthesis Node -> Document Generator",
    github: "https://github.com/placeholder/autonomous-business-agent",
    demo: "https://vercel.example/autonomous-business-agent",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: [
      { label: "Report Compile Time", value: "14.8s" },
      { label: "Sources Consulted", value: "12+ Sites" },
      { label: "Coherence Score", value: "9.2/10" }
    ]
  },
  {
    id: "multi-agent-system",
    title: "Multi-Agent System",
    shortDesc: "A collaborative workspace where specialized supervisor and worker agents solve engineering prompts together.",
    longDesc: "This platform simulates a virtual software agency. A Supervisor Agent orchestrates Worker Agents (Researcher, Architect, Coder, QA Reviewer) over a message bus. Users input a software requirement and watch the agents converse, exchange code blocks, critique bugs, and output the final verified codebase.",
    type: "UI",
    technologies: ["Next.js", "FastAPI", "LangGraph", "CrewAI", "WebSockets", "Framer Motion"],
    features: [
      "Supervisor-Worker workflow logic that routes tasks dynamically",
      "WebSocket streaming connection that displays inter-agent messaging logs in real-time",
      "Code viewer interface showing live code changes with diff highlights",
      "Interactive QA terminal where the user can intervene, give feedback, and approve code",
      "Performance analytics comparing execution time and cost per agent"
    ],
    architecture: "User Prompt -> Supervisor Agent -> Dispatcher -> [Researcher, Architect, Coder, Critic] -> Code Assembler -> QA Verification -> Final App",
    github: "https://github.com/placeholder/multi-agent-system",
    demo: "https://vercel.example/multi-agent-system",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metrics: [
      { label: "Active Collaborators", value: "5 Agents" },
      { label: "Code Coverage", value: "91%" },
      { label: "Orchestration cost", value: "$0.04" }
    ]
  }
];
