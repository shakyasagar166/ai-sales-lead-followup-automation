import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  RefreshCw, 
  Sliders, 
  MessageSquare,
  CheckCircle2,
  Copy
} from 'lucide-react';

export default function MessageEditor({ 
  lead, 
  initialMessage, 
  onSend, 
  onRegenerate, 
  isGenerating, 
  isSending 
}) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [channel, setChannel] = useState('EMAIL');
  const [tone, setTone] = useState('Persuasive & Professional');
  const [objective, setObjective] = useState('Book Discovery Call');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setSubject(initialMessage.subject || `Scaling ${lead?.company || 'Enterprise'} Sales Acceleration`);
      setBody(initialMessage.body || '');
    } else if (lead) {
      setSubject(`Ideas for ${lead.company}'s QA & automation pipeline`);
      setBody(
        `Hi ${lead.first_name},\n\nI was looking at ${lead.company}'s recent initiatives in ${lead.industry || 'software engineering'}. Teams scaling rapidly often face bottlenecks with manual regression testing and follow-up lag.\n\nOur platform automates multi-stage workflows and boosts pipeline velocity by 3.4x.\n\nWould you be open to a 10-minute discovery chat this Thursday?\n\nBest,\nAlex Mercer`
      );
    }
  }, [initialMessage, lead]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Bot className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-white">AI Sales Outreach Studio</h2>
          </div>
          <p className="text-xs text-slate-400">
            Personalizing outreach for <strong className="text-slate-200">{lead?.first_name} {lead?.last_name || ''}</strong> ({lead?.company})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onRegenerate({ lead_id: lead.id, channel, tone, objective })}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing...' : 'Regenerate Draft'}</span>
          </button>

          <button
            onClick={() => onSend({ lead_id: lead.id, subject, body, channel })}
            disabled={isSending || !body.trim()}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSending ? 'Sending...' : 'Send Outreach'}</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Channel</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none"
          >
            <option value="EMAIL">Email Outreach</option>
            <option value="LINKEDIN">LinkedIn Direct InMail</option>
            <option value="SMS">SMS / WhatsApp Follow-Up</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Tone & Persona</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none"
          >
            <option value="Persuasive & Professional">Persuasive & Professional</option>
            <option value="Consultative & Educational">Consultative & Educational</option>
            <option value="Casual & Direct">Casual & Direct</option>
            <option value="Urgent Problem Solver">Urgent Problem Solver</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Outreach Goal</label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none"
          >
            <option value="Book Discovery Call">Book Discovery Call</option>
            <option value="Schedule 1-on-1 Demo">Schedule 1-on-1 Demo</option>
            <option value="Share Engineering Case Study">Share Engineering Case Study</option>
            <option value="Re-engage Stalled Opportunity">Re-engage Stalled Opportunity</option>
          </select>
        </div>
      </div>

      {/* Editor Inputs */}
      <div className="p-6 flex-1 flex flex-col space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Subject Line</label>
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Message Body</label>
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}
