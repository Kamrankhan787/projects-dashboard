const lucide = require('lucide-react');
const toCheck = ['Milestone', 'BarChart3', 'Home', 'Terminal', 'Cpu', 'Mail', 'Sun', 'Moon', 'Menu', 'X', 'ChevronRight', 'ChevronLeft', 'MessageSquare', 'ListChecks', 'Eye', 'Brain', 'Laptop', 'Code', 'Calendar', 'CheckCircle2', 'Sparkles', 'Globe', 'ArrowUpRight', 'ArrowUp', 'ArrowRight', 'Send', 'Phone', 'FileText', 'ShieldCheck', 'Bot', 'Layers', 'Server', 'Activity', 'Clock', 'Zap', 'Database', 'ShieldAlert'];
const missing = toCheck.filter(k => !(k in lucide));
console.log('Missing icons:', missing);
console.log('All present!', missing.length === 0);
