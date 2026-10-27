import React from 'react';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { 
  Users, 
  Calendar, 
  ExternalLink, 
  ArrowRight, 
  GraduationCap, 
  Award, 
  Flame, 
  Sparkles, 
  PlusCircle,
  Zap 
} from 'lucide-react';
import { formatCurrency, getPriorityColor } from '../utils/formatters';

export default function Dashboard({ 
  stats, 
  recentLeads, 
  scheduledFollowups, 
  onNavigate, 
  onSelectLead, 
  onOpenCreateModal 
}) {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">Autonomous Follow-Up Engine Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Sales Velocity & Follow-Up Command Center
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time B2B prospect qualification, AI cadence synthesis, and predictive sales follow-ups that convert.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Lead</span>
          </button>
          <button
            onClick={() => onNavigate('pipeline')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition"
          >
            <span>View Pipeline</span>
          </button>
        </div>
      </div>

      {/* PROMINENT HIGH-VISIBILITY TRAINING SECTION (NOIDA & DELHI) */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 border-2 border-amber-500/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <GraduationCap className="w-64 h-64 text-amber-300" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Award className="w-4 h-4 text-slate-950" /> RECOMMENDED CAREER PROGRAM
            </span>
            <span className="text-xs text-amber-300 font-semibold">100% Placement Support & Live Industry Capstones</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight max-w-3xl">
            Master Software Testing & Test Automation Engineering
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-3xl leading-relaxed">
            Ensure high software quality, bulletproof enterprise deployments, and seamless automated workflows. Learn modern testing frameworks including Selenium WebDriver, Cypress, Playwright, Postman API Testing, Appium, Cucumber BDD, and CI/CD pipelines.
          </p>

          {/* TWO PROMINENT LARGE ACTION CARDS FOR NOIDA & DELHI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Noida Card */}
            <a
              href="https://uncodemy.com/course/automation-testing-course-in-noida"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border-2 border-amber-400/80 hover:border-amber-300 shadow-xl transition-all transform hover:-translate-y-1 block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/40">
                  📍 Noida Campus & Online
                </span>
                <span className="text-amber-400 font-extrabold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Apply Now <ExternalLink className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                Automation Testing Course in Noida
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Comprehensive practical training in Noida with live real-time web & API automation projects, interview preparation, and ISO-recognized certification.
              </p>
              <div className="mt-4 inline-flex items-center justify-center w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition">
                <span>View Syllabus & Enroll in Noida Course</span>
              </div>
            </a>

            {/* Delhi Card */}
            <a
              href="https://uncodemy.com/course/automation-testing-course-in-Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border-2 border-cyan-400/80 hover:border-cyan-300 shadow-xl transition-all transform hover:-translate-y-1 block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase tracking-wider border border-cyan-500/40">
                  📍 Delhi NCR & Hybrid
                </span>
                <span className="text-cyan-400 font-extrabold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Apply Now <ExternalLink className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                Automation Testing Course in Delhi
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Premier test automation certification in Delhi covering End-to-End framework architecture, Jenkins CI/CD integration, and high-paying tech placements.
              </p>
              <div className="mt-4 inline-flex items-center justify-center w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition">
                <span>View Syllabus & Enroll in Delhi Course</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard stats={stats} />

      {/* Recent Hot Leads & Scheduled Touches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hot Leads */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              Priority Inbound Leads
            </h3>
            <button
              onClick={() => onNavigate('leads')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recentLeads && recentLeads.slice(0, 4).map((lead) => (
              <div
                key={lead.id}
                onClick={() => {
                  onSelectLead(lead);
                  onNavigate('leads');
                }}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition flex items-center justify-between"
              >
                <div className="truncate mr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{lead.first_name} {lead.last_name || ''}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{lead.job_title} · {lead.company}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-emerald-400 flex items-center justify-end gap-1">
                    <Sparkles className="w-3 h-3" />
                    {Math.round(lead.score)}
                  </span>
                  <span className="text-[10px] text-slate-500">{formatCurrency(lead.budget)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Cadence Touches */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Upcoming Outreach Touches
            </h3>
            <button
              onClick={() => onNavigate('followups')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View Schedule</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {scheduledFollowups && scheduledFollowups.slice(0, 4).map((fu) => (
              <div
                key={fu.id}
                onClick={() => onNavigate('followups')}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition flex items-center justify-between"
              >
                <div className="truncate mr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Step {fu.sequence_step}
                    </span>
                    <span className="text-xs font-bold text-white truncate">{fu.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{fu.generated_subject || 'Outbound sales inquiry'}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {fu.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
