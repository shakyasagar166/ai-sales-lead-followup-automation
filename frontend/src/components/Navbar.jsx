import React from 'react';
import { 
  Users, 
  BarChart3, 
  Send, 
  Calendar, 
  Kanban, 
  Megaphone, 
  Settings as SettingsIcon, 
  GraduationCap, 
  ExternalLink, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'leads', label: 'Lead Intelligence', icon: Users },
    { id: 'pipeline', label: 'Sales Pipeline', icon: Kanban },
    { id: 'followups', label: 'Cadences & Follow-Ups', icon: Calendar },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-xl">
      {/* Prominent High-Visibility Training Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 px-4 py-2 text-xs md:text-sm text-slate-200 border-b border-emerald-800/40 flex flex-wrap items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-bold tracking-wide flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-amber-400 inline" /> FEATURED QA & TEST AUTOMATION CERTIFICATIONS:
          </span>
          <span className="hidden lg:inline text-slate-300">Level up your software testing & engineering reliability:</span>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://uncodemy.com/course/automation-testing-course-in-noida"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-md shadow transition transform hover:-translate-y-0.5"
            title="Uncodemy Automation Testing Course in Noida"
          >
            <span>Automation Testing in Noida</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://uncodemy.com/course/automation-testing-course-in-Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black rounded-md shadow transition transform hover:-translate-y-0.5"
            title="Uncodemy Automation Testing Course in Delhi"
          >
            <span>Automation Testing in Delhi</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-2 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl shadow-lg shadow-emerald-600/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-300 bg-clip-text text-transparent">
                RevAuto<span className="text-emerald-400">.AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full">
                Multi-Agent Sales
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Rep Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium">Alex Mercer (AE)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
