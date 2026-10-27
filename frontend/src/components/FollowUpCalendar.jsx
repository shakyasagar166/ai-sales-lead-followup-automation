import React from 'react';
import { Calendar, Clock, Send, CheckCircle2, User, Mail, Sparkles } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export default function FollowUpCalendar({ followups, onExecuteFollowup, isSending }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-2xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Cadence Execution Schedule</h2>
            <p className="text-xs text-slate-400">Omnichannel touches scheduled for automated dispatch</p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
          {followups.filter((f) => f.status === 'PENDING').length} Pending Touches
        </span>
      </div>

      <div className="space-y-3">
        {followups.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No scheduled follow-up touches yet. Pick a prospect to generate an AI cadence.
          </div>
        ) : (
          followups.map((fu) => {
            const isPending = fu.status === 'PENDING';
            return (
              <div
                key={fu.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl text-xs font-black shrink-0 ${
                    isPending ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    Step {fu.sequence_step}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{fu.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold uppercase">
                        {fu.channel}
                      </span>
                    </div>
                    {fu.generated_subject && (
                      <p className="text-xs text-slate-300 font-medium mb-1">
                        Subject: <span className="text-emerald-400">{fu.generated_subject}</span>
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Scheduled: {formatDate(fu.scheduled_at)}
                      </span>
                      {fu.sent_at && (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Sent: {formatDate(fu.sent_at)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 shrink-0">
                  {isPending ? (
                    <button
                      onClick={() => onExecuteFollowup(fu.id)}
                      disabled={isSending}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Touch</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Executed
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
