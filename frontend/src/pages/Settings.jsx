import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Cpu, 
  Save, 
  CheckCircle2, 
  GraduationCap, 
  ExternalLink,
  Zap,
  Calendar,
  Share2
} from 'lucide-react';

export default function Settings() {
  const [repName, setRepName] = useState('Alex Mercer');
  const [repEmail, setRepEmail] = useState('alex.sales@enterprise-growth.io');
  const [provider, setProvider] = useState('gemini');
  const [mockMode, setMockMode] = useState(true);
  const [crmType, setCrmType] = useState('HubSpot');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-2xl">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">System Settings & Integrations</h1>
            <p className="text-xs text-slate-400">
              Configure AI reasoning models, rep credentials, CRM synchronization, and outreach parameters
            </p>
          </div>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Sales Rep Profile */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            Sales Representative Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Rep Name</label>
              <input
                type="text"
                value={repName}
                onChange={(e) => setRepName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Rep Email</label>
              <input
                type="email"
                value={repEmail}
                onChange={(e) => setRepEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* AI Engine Configuration */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            Multi-Agent AI Intelligence Engine
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary LLM Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="gemini">Google Gemini 2.5 Flash</option>
                <option value="openai">OpenAI GPT-4o-mini</option>
                <option value="offline">Offline Simulated Sales Agent Engine</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Execution Mode</label>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="mockMode"
                  checked={mockMode}
                  onChange={(e) => setMockMode(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="mockMode" className="text-xs text-slate-300">
                  Enable zero-latency offline B2B simulation mode
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* CRM Integration */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-400" />
            CRM & Calendar Synchronization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target CRM</label>
              <select
                value={crmType}
                onChange={(e) => setCrmType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="HubSpot">HubSpot CRM</option>
                <option value="Salesforce">Salesforce Sales Cloud</option>
                <option value="Pipedrive">Pipedrive</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs text-emerald-300 font-semibold">CRM Auto-Sync Active (Real-Time Webhooks)</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Recommended QA Certifications Section */}
      <div className="p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">Recommended QA Automation Testing Programs</h2>
        </div>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          Production sales automation and multi-agent pipelines demand bulletproof test suites. Explore these premier hands-on programs to master enterprise QA test automation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://uncodemy.com/course/automation-testing-course-in-noida"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 hover:border-amber-400 transition block group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Uncodemy Noida</span>
              <ExternalLink className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300">
              Automation Testing Course in Noida
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Master Selenium WebDriver, TestNG, Jenkins, Git, and Cucumber BDD with 100% placement assurance in Noida.
            </p>
          </a>

          <a
            href="https://uncodemy.com/course/automation-testing-course-in-Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 hover:border-cyan-400 transition block group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Uncodemy Delhi</span>
              <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300">
              Automation Testing Course in Delhi
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Advanced curriculum covering Cypress, Playwright, API test automation, and enterprise CI/CD integration in Delhi.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
