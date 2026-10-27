import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  Flame, 
  Sparkles, 
  ArrowUpRight, 
  DollarSign, 
  Calendar 
} from 'lucide-react';
import { formatCurrency, getPriorityColor } from '../utils/formatters';

export default function LeadCard({ lead, onSelectLead, onGenerateCadence }) {
  const getQualificationBadge = (status) => {
    switch (status) {
      case 'SQL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">SQL</span>;
      case 'MQL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">MQL</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400">UNQUALIFIED</span>;
    }
  };

  return (
    <div 
      onClick={() => onSelectLead(lead)}
      className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityColor(lead.priority)}`}>
              {lead.priority === 'HOT' && <Flame className="w-3 h-3 inline mr-1 text-rose-400" />}
              {lead.priority}
            </span>
            {getQualificationBadge(lead.qualification_status)}
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{Math.round(lead.score)}/100</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-white mb-0.5 line-clamp-1">
          {lead.first_name} {lead.last_name || ''}
        </h3>
        <p className="text-xs text-slate-400 mb-2 truncate">
          {lead.job_title}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-3">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold">{lead.company || 'Enterprise Prospect'}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] mb-4">
          <div>
            <span className="text-slate-500 block">Stage</span>
            <span className="font-semibold text-slate-200">{lead.status}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Estimated Budget</span>
            <span className="font-semibold text-emerald-400">{formatCurrency(lead.budget)}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="text-slate-400 truncate max-w-[140px]">{lead.email}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGenerateCadence(lead.id);
          }}
          className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
        >
          <span>Cadence</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
