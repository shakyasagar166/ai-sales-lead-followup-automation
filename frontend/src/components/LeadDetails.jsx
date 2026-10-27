import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  Send, 
  RefreshCw, 
  Flame, 
  CheckCircle2, 
  Clock, 
  User, 
  Tag, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { formatCurrency, formatDate, getPriorityColor } from '../utils/formatters';

export default function LeadDetails({ 
  lead, 
  onRescore, 
  onGenerateCadence, 
  onDraftMessage,
  isRescoring 
}) {
  if (!lead) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl shadow-xl text-slate-400">
        <Sparkles className="w-12 h-12 text-slate-600 mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-slate-200">Select a Prospect to Inspect Deal Intelligence</h3>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          Review BANT/MEDDIC qualification, predictive lead scores, interaction history, and trigger AI cadences.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-950/60">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(lead.priority)}`}>
              {lead.priority === 'HOT' && <Flame className="w-3.5 h-3.5 inline mr-1 text-rose-400" />}
              {lead.priority} PRIORITY
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
              STAGE: {lead.status}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              {lead.qualification_status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRescore(lead.id)}
              disabled={isRescoring}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRescoring ? 'animate-spin' : ''}`} />
              <span>Rescore Lead</span>
            </button>

            <button
              onClick={() => onGenerateCadence(lead.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Cadence</span>
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              {lead.first_name} {lead.last_name || ''}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              {lead.job_title} at <strong className="text-slate-200">{lead.company}</strong>
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-black text-emerald-400 flex items-center justify-end gap-1">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>{Math.round(lead.score)}</span>
              <span className="text-xs font-normal text-slate-500">/100</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Predictive Score</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{lead.phone || 'No phone'}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Budget: {formatCurrency(lead.budget)}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Owner: {lead.assigned_to || 'Alex Mercer'}</span>
          </div>
        </div>
      </div>

      {/* Body: Telemetry & History */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Lead Notes / Pain Points */}
        {lead.notes && (
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-400" /> Stated Need & Qualification Notes
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {lead.notes}
            </p>
          </div>
        )}

        {/* Interaction Timeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> Touchpoint & Engagement History
            </h4>
            <button
              onClick={() => onDraftMessage(lead)}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
            >
              <span>+ Compose Outreach</span>
            </button>
          </div>

          <div className="space-y-3">
            {lead.interactions && lead.interactions.length > 0 ? (
              lead.interactions.map((it) => (
                <div key={it.id} className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${it.direction === 'INBOUND' ? 'bg-cyan-400' : 'bg-emerald-400'}`}></span>
                      {it.channel} ({it.direction})
                    </span>
                    <span className="text-[10px] text-slate-500">{formatDate(it.created_at)}</span>
                  </div>
                  {it.subject && <p className="text-xs font-semibold text-white mb-1">{it.subject}</p>}
                  <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{it.content}</p>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/30 border border-slate-800/50 text-center text-xs text-slate-500">
                No past touches logged yet. Generate an AI cadence to initiate contact.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
