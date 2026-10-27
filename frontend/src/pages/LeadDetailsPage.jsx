import React from 'react';
import LeadDetails from '../components/LeadDetails';
import MessageEditor from '../components/MessageEditor';
import { ArrowLeft } from 'lucide-react';

export default function LeadDetailsPage({ 
  lead, 
  onBack, 
  onRescore, 
  onGenerateCadence, 
  onSendOutreach, 
  onRegenerateOutreach,
  draftOutreach,
  isRescoring,
  isGeneratingMessage,
  isSendingMessage 
}) {
  if (!lead) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Lead Intelligence</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        <div className="lg:col-span-6 h-full">
          <LeadDetails
            lead={lead}
            onRescore={onRescore}
            onGenerateCadence={onGenerateCadence}
            onDraftMessage={() => {}}
            isRescoring={isRescoring}
          />
        </div>

        <div className="lg:col-span-6 h-full">
          <MessageEditor
            lead={lead}
            initialMessage={draftOutreach}
            onSend={onSendOutreach}
            onRegenerate={onRegenerateOutreach}
            isGenerating={isGeneratingMessage}
            isSending={isSendingMessage}
          />
        </div>
      </div>
    </div>
  );
}
