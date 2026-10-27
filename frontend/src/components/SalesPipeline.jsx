import React from 'react';
import { Sparkles, Flame, ArrowRight, DollarSign } from 'lucide-react';
import { formatCurrency, getPriorityColor } from '../utils/formatters';

const STAGES = [
  { id: 'NEW', label: 'New Leads', color: 'border-slate-700 bg-slate-900/40' },
  { id: 'QUALIFIED', label: 'Qualified (SQL/MQL)', color: 'border-blue-900/40 bg-blue-950/20' },
  { id: 'CONTACTED', label: 'In Cadence', color: 'border-indigo-900/40 bg-indigo-950/20' },
  { id: 'MEETING_BOOKED', label: 'Discovery Booked', color: 'border-amber-900/40 bg-amber-950/20' },
  { id: 'PROPOSAL', label: 'Proposal Sent', color: 'border-purple-900/40 bg-purple-950/20' },
  { id: 'WON', label: 'Closed Won', color: 'border-emerald-900/40 bg-emerald-950/20' },
];

export default function SalesPipeline({ leads, onSelectLead, onUpdateStage }) {
  const getLeadsByStage = (stageId) => leads.filter((l) => l.status === stageId);

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 min-h-[600px]">
      {STAGES.map((stage) => {
        const stageLeads = getLeadsByStage(stage.id);
        const stageValue = stageLeads.reduce((sum, l) => sum + (l.budget || 0), 0);

        return (
          <div
            key={stage.id}
            className={`w-72 shrink-0 rounded-3xl border ${stage.color} p-4 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
                  {stage.label}
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {stageLeads.length}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-semibold mb-3">
                Pipeline: {formatCurrency(stageValue)}
              </div>

              <div className="space-y-3">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="p-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl shadow cursor-pointer transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getPriorityColor(lead.priority)}`}>
                        {lead.priority}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                        <Sparkles className="w-3 h-3" />
                        {Math.round(lead.score)}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white truncate">
                      {lead.first_name} {lead.last_name || ''}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mb-2">
                      {lead.company}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                      <span className="font-semibold text-emerald-400">{formatCurrency(lead.budget)}</span>
                      <span className="text-slate-500">{lead.job_title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 font-medium">Stage Health: Optimal</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
