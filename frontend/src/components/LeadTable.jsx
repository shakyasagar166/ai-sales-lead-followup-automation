import React, { useState } from 'react';
import { Search, Filter, Sparkles, Flame, Eye, Send } from 'lucide-react';
import { formatCurrency, getPriorityColor } from '../utils/formatters';

export default function LeadTable({ leads, onSelectLead, onGenerateCadence }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = leads.filter((lead) => {
    const matchSearch =
      `${lead.first_name} ${lead.last_name || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.job_title && lead.job_title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchPriority = priorityFilter === 'ALL' || lead.priority === priorityFilter;
    const matchStatus = statusFilter === 'ALL' || lead.status === statusFilter;

    return matchSearch && matchPriority && matchStatus;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
      {/* Controls Bar */}
      <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search leads by name, title, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="HOT">Hot Leads</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Stages</option>
            <option value="NEW">New</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="CONTACTED">Contacted</option>
            <option value="MEETING_BOOKED">Meeting Booked</option>
            <option value="PROPOSAL">Proposal</option>
            <option value="WON">Closed Won</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-5 py-3.5">Prospect</th>
              <th className="px-5 py-3.5">Company & Role</th>
              <th className="px-5 py-3.5">AI Score</th>
              <th className="px-5 py-3.5">Stage</th>
              <th className="px-5 py-3.5">Priority</th>
              <th className="px-5 py-3.5">Budget</th>
              <th className="px-5 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                  No matching sales leads found.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr 
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className="hover:bg-slate-800/40 cursor-pointer transition"
                >
                  <td className="px-5 py-3.5 font-bold text-white">
                    <div>{lead.first_name} {lead.last_name || ''}</div>
                    <div className="text-[11px] font-normal text-slate-400">{lead.email}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-slate-200">{lead.company}</div>
                    <div className="text-[11px] text-slate-400">{lead.job_title}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      {Math.round(lead.score)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityColor(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-400">
                    {formatCurrency(lead.budget)}
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLead(lead);
                      }}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGenerateCadence(lead.id);
                      }}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition"
                    >
                      Cadence
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
