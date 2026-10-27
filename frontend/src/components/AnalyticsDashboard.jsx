import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Flame, 
  Sparkles, 
  Calendar, 
  ExternalLink, 
  GraduationCap, 
  Award,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function AnalyticsDashboard({ stats }) {
  const data = stats || {
    total_leads: 84,
    qualified_leads: 52,
    hot_leads: 18,
    avg_lead_score: 78.4,
    conversion_rate: 22.8,
    reply_rate: 34.6,
    pipeline_stages: {
      NEW: 14,
      QUALIFIED: 22,
      CONTACTED: 26,
      MEETING_BOOKED: 12,
      PROPOSAL: 6,
      WON: 4
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Prospects</span>
            <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{data.total_leads}</div>
          <div className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.5% inbound volume</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hot Opportunities</span>
            <div className="p-2 rounded-xl bg-rose-950 text-rose-400 border border-rose-800">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-400">{data.hot_leads}</div>
          <div className="text-xs text-rose-300 font-semibold mt-2">
            Score ≥ 85.0 (High ICP & Budget)
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reply Rate</span>
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">{data.reply_rate || 34.6}%</div>
          <div className="text-xs text-slate-400 mt-2">
            3.4x industry average conversion
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Lead Score</span>
            <div className="p-2 rounded-xl bg-blue-950 text-blue-400 border border-blue-800">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-blue-400">{data.avg_lead_score || 78.4}</div>
          <div className="text-xs text-slate-400 mt-2">
            {data.qualified_leads} SQL/MQL verified
          </div>
        </div>
      </div>

      {/* Prominent High-Visibility QA Automation Spotlight */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-3">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              INDUSTRY-LEADING QA & AUTOMATION TEST ENGINEERING
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Master Full-Stack Test Automation & AI Quality Assurance
            </h3>
            <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
              Scale enterprise sales pipelines and microservices with bulletproof test automation. Gain real-world mastery in Selenium WebDriver, Cypress, Playwright, API Testing & CI/CD deployment pipelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full lg:w-auto">
            <a
              href="https://uncodemy.com/course/automation-testing-course-in-noida"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs md:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-1 text-center"
            >
              <span>Automation Testing in Noida</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="https://uncodemy.com/course/automation-testing-course-in-Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs md:text-sm rounded-xl shadow-lg shadow-cyan-400/20 transition transform hover:-translate-y-1 text-center"
            >
              <span>Automation Testing in Delhi</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Pipeline Distribution Chart */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Pipeline Stage Distribution
        </h3>

        <div className="space-y-3">
          {Object.entries(data.pipeline_stages || {}).map(([stage, count]) => {
            const maxVal = Math.max(...Object.values(data.pipeline_stages || { a: 1 }));
            const pct = Math.round((count / (maxVal || 1)) * 100);
            return (
              <div key={stage}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">{stage}</span>
                  <span className="text-slate-400">{count} leads</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
