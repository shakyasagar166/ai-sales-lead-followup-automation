import React, { useState } from 'react';
import { Megaphone, PlusCircle, TrendingUp, Users, Mail, X, CheckCircle2 } from 'lucide-react';

export default function Campaigns({ campaigns, onCreateCampaign }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetSegment, setTargetSegment] = useState('Enterprise QA & DevOps');
  const [channel, setChannel] = useState('EMAIL');
  const [cadenceDays, setCadenceDays] = useState(3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreateCampaign({
      name,
      description,
      target_segment: targetSegment,
      channel,
      cadence_days: parseInt(cadenceDays, 10),
      status: 'ACTIVE'
    });
    setName('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Outreach Campaigns & Cadences</h1>
            <p className="text-xs text-slate-400">
              Manage multi-stage outbound campaigns, measure open rates, and track reply conversion
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {camp.status}
                </span>
                <span className="text-xs text-slate-400">
                  Cadence: Every {camp.cadence_days} days
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1.5">{camp.name}</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">{camp.description}</p>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center mb-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Open Rate</span>
                  <div className="text-sm font-black text-white">{camp.open_rate}%</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Reply Rate</span>
                  <div className="text-sm font-black text-emerald-400">{camp.reply_rate}%</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Conversion</span>
                  <div className="text-sm font-black text-cyan-400">{camp.conversion_rate}%</div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span>Target: {camp.target_segment}</span>
              <span className="font-semibold text-slate-400">4 Sequence Touches</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl">
                  <Megaphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Create Sales Campaign</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Q4 FinTech QA Decision-Maker Cadence"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description & Objective</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Targeting Directors of QA and VPs in Noida, Delhi and global hubs..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Segment</label>
                  <input
                    type="text"
                    value={targetSegment}
                    onChange={(e) => setTargetSegment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Cadence Delay (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={cadenceDays}
                    onChange={(e) => setCadenceDays(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
