import React, { useState } from 'react';
import FollowUpCalendar from '../components/FollowUpCalendar';
import { Calendar, Filter, Send, Clock, CheckCircle2 } from 'lucide-react';

export default function FollowUps({ followups, onExecuteFollowup, isSending }) {
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = followups.filter((f) => {
    if (statusFilter === 'ALL') return true;
    return f.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-2xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Automated Cadences & Follow-Ups</h1>
            <p className="text-xs text-slate-400">
              Track multi-touch sales sequences, dispatch automated follow-up emails, and manage touch velocity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Follow-Ups</option>
            <option value="PENDING">Pending Touches</option>
            <option value="COMPLETED">Completed Touches</option>
          </select>
        </div>
      </div>

      <FollowUpCalendar
        followups={filtered}
        onExecuteFollowup={onExecuteFollowup}
        isSending={isSending}
      />
    </div>
  );
}
