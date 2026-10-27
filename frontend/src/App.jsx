import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetailsPage from './pages/LeadDetailsPage';
import SalesPipeline from './components/SalesPipeline';
import FollowUps from './pages/FollowUps';
import Campaigns from './pages/Campaigns';
import Settings from './pages/Settings';
import api from './services/api';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState(null);

  const [selectedLead, setSelectedLead] = useState(null);
  const [draftOutreach, setDraftOutreach] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRescoring, setIsRescoring] = useState(false);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [leadsData, followupsData, campaignsData, statsData] = await Promise.all([
        api.getLeads(),
        api.getFollowups(),
        api.getCampaigns(),
        api.getAnalytics()
      ]);
      setLeads(leadsData);
      setFollowups(followupsData);
      setCampaigns(campaignsData);
      setStats(statsData);

      if (leadsData.length > 0 && !selectedLead) {
        setSelectedLead(leadsData[0]);
      }
    } catch (err) {
      console.warn('Backend connection warning, using fallback mock data:', err);
      const fallbackLeads = [
        {
          id: 1,
          first_name: 'Marcus',
          last_name: 'Vance',
          email: 'marcus.vance@cloudscale-tech.io',
          phone: '+1 (415) 890-2134',
          company: 'CloudScale Tech',
          job_title: 'VP of Infrastructure & Engineering',
          industry: 'Cloud & DevSecOps',
          company_size: '250-500',
          budget: 45000.0,
          status: 'QUALIFIED',
          qualification_status: 'SQL',
          score: 92.0,
          priority: 'HOT',
          intent_level: 'High',
          notes: 'Urgent need for automated regression testing and workflow orchestrations.',
          assigned_to: 'Alex Mercer',
          interactions: [
            {
              id: 1,
              channel: 'EMAIL',
              direction: 'OUTBOUND',
              subject: 'Scaling CloudScale Tech automated pipeline with multi-agent velocity',
              content: 'Hi Marcus, noticed your recent expansion of CloudScale. Would you be open to a 10-minute discovery chat?',
              created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
            }
          ]
        },
        {
          id: 2,
          first_name: 'Elena',
          last_name: 'Rostova',
          email: 'elena.r@finnovate-payments.com',
          phone: '+1 (212) 555-8931',
          company: 'Finnovate Global',
          job_title: 'Director of QA & Automation Engineering',
          industry: 'FinTech',
          company_size: '500-1000',
          budget: 80000.0,
          status: 'NEW',
          qualification_status: 'SQL',
          score: 88.5,
          priority: 'HOT',
          intent_level: 'High',
          notes: 'Evaluating Cypress, Selenium, and AI automated testing frameworks.',
          assigned_to: 'Alex Mercer',
          interactions: []
        }
      ];
      setLeads(fallbackLeads);
      setSelectedLead(fallbackLeads[0]);
      setFollowups([
        {
          id: 1,
          lead_id: 1,
          sequence_step: 1,
          title: 'Introductory Value Proposition & Case Study',
          channel: 'EMAIL',
          scheduled_at: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
          status: 'PENDING',
          generated_subject: 'Scaling CloudScale Tech pipeline with automated test suites',
          generated_body: 'Hi Marcus, sharing our engineering benchmark on accelerating pipeline velocity.'
        }
      ]);
      setCampaigns([
        {
          id: 1,
          name: 'Q4 Enterprise Infrastructure & DevOps Cadence',
          description: 'Targeted outreach for QA Directors and Engineering VPs.',
          target_segment: 'Enterprise Tech',
          channel: 'EMAIL',
          status: 'ACTIVE',
          cadence_days: 3,
          open_rate: 54.2,
          reply_rate: 28.6,
          conversion_rate: 18.4
        }
      ]);
      setStats({
        total_leads: 84,
        qualified_leads: 52,
        hot_leads: 18,
        avg_lead_score: 78.4,
        conversion_rate: 22.8,
        reply_rate: 34.6,
        pipeline_stages: { NEW: 14, QUALIFIED: 22, CONTACTED: 26, MEETING_BOOKED: 12, PROPOSAL: 6, WON: 4 }
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleCreateLead = async (leadData) => {
    try {
      const newLead = await api.createLead(leadData, true);
      setLeads((prev) => [newLead, ...prev]);
      setSelectedLead(newLead);
      fetchData();
    } catch (e) {
      console.error('Failed to create lead:', e);
      const mockLead = {
        id: Date.now(),
        ...leadData,
        status: 'NEW',
        qualification_status: 'SQL',
        score: 85.0,
        priority: 'HOT',
        intent_level: 'High',
        interactions: []
      };
      setLeads((prev) => [mockLead, ...prev]);
      setSelectedLead(mockLead);
    }
  };

  const handleRescoreLead = async (leadId) => {
    setIsRescoring(true);
    try {
      const res = await api.rescoreLead(leadId);
      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId
            ? { ...l, score: res.new_score, priority: res.priority, intent_level: res.intent_level }
            : l
        )
      );
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => ({
          ...prev,
          score: res.new_score,
          priority: res.priority,
          intent_level: res.intent_level
        }));
      }
    } catch (e) {
      console.warn('Rescore offline fallback:', e);
      if (selectedLead) {
        const bumped = Math.min(100, (selectedLead.score || 75) + 5);
        setSelectedLead((prev) => ({ ...prev, score: bumped, priority: 'HOT' }));
      }
    } finally {
      setIsRescoring(false);
    }
  };

  const handleGenerateCadence = async (leadId) => {
    try {
      const created = await api.generateCadence(leadId);
      setFollowups((prev) => [...created, ...prev]);
      setActiveTab('followups');
      alert('AI cadence generated with 4 multi-touch follow-ups!');
    } catch (e) {
      console.warn('Cadence offline simulation:', e);
      setActiveTab('followups');
      alert('AI multi-touch cadence queued in schedule!');
    }
  };

  const handleDraftMessage = (lead) => {
    setSelectedLead(lead);
    setDraftOutreach({
      subject: `Accelerating ${lead.company} software test automation & pipeline speed`,
      body: `Hi ${lead.first_name},\n\nI was reviewing ${lead.company}'s work in ${lead.industry || 'engineering'}. Leading teams often face testing bottlenecks during rapid growth.\n\nOur platform automates multi-touch workflows and boosts discovery conversions by 3.4x.\n\nWould you be open to a 10-minute discovery chat this Thursday?\n\nBest,\nAlex Mercer`
    });
    setActiveTab('lead-detail');
  };

  const handleSendOutreach = async ({ lead_id, subject, body, channel }) => {
    setIsSendingMessage(true);
    try {
      await api.logInteraction(lead_id, {
        channel,
        direction: 'OUTBOUND',
        subject,
        content: body,
        outcome: 'SENT'
      });
      alert('Outreach successfully dispatched via simulated SMTP mail client!');
      setActiveTab('leads');
      fetchData();
    } catch (e) {
      console.warn('Outreach dispatch fallback:', e);
      alert('Outreach simulated and logged in lead history!');
      setActiveTab('leads');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleExecuteFollowup = async (followupId) => {
    try {
      await api.sendFollowup(followupId);
      setFollowups((prev) =>
        prev.map((f) =>
          f.id === followupId ? { ...f, status: 'COMPLETED', sent_at: new Date().toISOString() } : f
        )
      );
      alert('Follow-up touch dispatched successfully!');
    } catch (e) {
      setFollowups((prev) =>
        prev.map((f) =>
          f.id === followupId ? { ...f, status: 'COMPLETED', sent_at: new Date().toISOString() } : f
        )
      );
      alert('Follow-up touch dispatched via simulated mail transport!');
    }
  };

  const handleCreateCampaign = async (campaignData) => {
    try {
      const newCamp = await api.createCampaign(campaignData);
      setCampaigns((prev) => [newCamp, ...prev]);
    } catch (e) {
      const mockCamp = { id: Date.now(), ...campaignData, open_rate: 48.0, reply_rate: 22.0, conversion_rate: 12.0 };
      setCampaigns((prev) => [mockCamp, ...prev]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-3" />
        <p className="text-xs font-bold uppercase tracking-wider">Starting RevAuto AI Sales Engine...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            recentLeads={leads}
            scheduledFollowups={followups}
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectLead={(lead) => {
              setSelectedLead(lead);
              setActiveTab('leads');
            }}
            onOpenCreateModal={() => {
              setActiveTab('leads');
              setIsModalOpen(true);
            }}
          />
        )}

        {activeTab === 'leads' && (
          <Leads
            leads={leads}
            selectedLead={selectedLead}
            onSelectLead={(lead) => setSelectedLead(lead)}
            onCreateLead={handleCreateLead}
            onRescoreLead={handleRescoreLead}
            onGenerateCadence={handleGenerateCadence}
            onDraftMessage={handleDraftMessage}
            isRescoring={isRescoring}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {activeTab === 'lead-detail' && (
          <LeadDetailsPage
            lead={selectedLead}
            onBack={() => setActiveTab('leads')}
            onRescore={handleRescoreLead}
            onGenerateCadence={handleGenerateCadence}
            onSendOutreach={handleSendOutreach}
            onRegenerateOutreach={async (params) => {
              setIsGeneratingMessage(true);
              try {
                const res = await api.draftMessage({
                  lead_id: selectedLead.id,
                  channel: params.channel,
                  tone: params.tone,
                  objective: params.objective
                });
                setDraftOutreach(res);
              } catch (e) {
                // Keep current draft
              } finally {
                setIsGeneratingMessage(false);
              }
            }}
            draftOutreach={draftOutreach}
            isRescoring={isRescoring}
            isGeneratingMessage={isGeneratingMessage}
            isSendingMessage={isSendingMessage}
          />
        )}

        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
              <h1 className="text-xl font-bold text-white">Visual Sales Pipeline Kanban</h1>
              <p className="text-xs text-slate-400">
                Track prospect momentum from New Lead to Discovery Booked and Closed Won
              </p>
            </div>
            <SalesPipeline
              leads={leads}
              onSelectLead={(lead) => {
                setSelectedLead(lead);
                setActiveTab('leads');
              }}
              onUpdateStage={() => {}}
            />
          </div>
        )}

        {activeTab === 'followups' && (
          <FollowUps
            followups={followups}
            onExecuteFollowup={handleExecuteFollowup}
          />
        )}

        {activeTab === 'campaigns' && (
          <Campaigns
            campaigns={campaigns}
            onCreateCampaign={handleCreateCampaign}
          />
        )}

        {activeTab === 'settings' && <Settings />}
      </main>
    </div>
  );
}
