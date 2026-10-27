import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_KEY = 'sales-automation-secret-key-2026';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
});

export const api = {
  // Health
  checkHealth: async () => {
    const res = await apiClient.get('/health');
    return res.data;
  },

  // Leads
  getLeads: async (params = {}) => {
    const res = await apiClient.get('/api/v1/leads', { params });
    return res.data;
  },

  getLead: async (id) => {
    const res = await apiClient.get(`/api/v1/leads/${id}`);
    return res.data;
  },

  createLead: async (payload, autoQualify = true) => {
    const res = await apiClient.post(`/api/v1/leads?auto_qualify=${autoQualify}`, payload);
    return res.data;
  },

  updateLead: async (id, updateData) => {
    const res = await apiClient.patch(`/api/v1/leads/${id}`, updateData);
    return res.data;
  },

  logInteraction: async (leadId, interactionData) => {
    const res = await apiClient.post(`/api/v1/leads/${leadId}/interactions`, interactionData);
    return res.data;
  },

  // Scoring
  rescoreLead: async (leadId) => {
    const res = await apiClient.post(`/api/v1/scoring/rescore/${leadId}`);
    return res.data;
  },

  // Follow-ups & Cadences
  getFollowups: async (params = {}) => {
    const res = await apiClient.get('/api/v1/followups', { params });
    return res.data;
  },

  generateCadence: async (leadId) => {
    const res = await apiClient.post(`/api/v1/followups/generate-cadence/${leadId}`);
    return res.data;
  },

  sendFollowup: async (followupId) => {
    const res = await apiClient.post(`/api/v1/followups/send/${followupId}`);
    return res.data;
  },

  updateFollowup: async (followupId, updateData) => {
    const res = await apiClient.patch(`/api/v1/followups/${followupId}`, updateData);
    return res.data;
  },

  draftMessage: async (req) => {
    const res = await apiClient.post('/api/v1/followups/draft-message', req);
    return res.data;
  },

  // Campaigns
  getCampaigns: async () => {
    const res = await apiClient.get('/api/v1/campaigns');
    return res.data;
  },

  createCampaign: async (payload) => {
    const res = await apiClient.post('/api/v1/campaigns', payload);
    return res.data;
  },

  // Analytics
  getAnalytics: async () => {
    const res = await apiClient.get('/api/v1/analytics/dashboard');
    return res.data;
  },
};

export default api;
