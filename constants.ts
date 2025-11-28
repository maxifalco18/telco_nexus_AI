import { UseCase, DocumentChunk } from './types';

export const APP_NAME = "TelcoNexus RAG";

export const MOCK_USE_CASES: UseCase[] = [
  {
    id: 'UC-001',
    title: 'Automated HSS Node Recovery',
    description: 'Diagnoses and restarts hung HSS nodes based on alarm code 5003.',
    domain: 'Network',
    status: 'Production',
    owner: 'NetOps Team A',
    lastUpdated: '2023-10-15'
  },
  {
    id: 'UC-002',
    title: '5G Slice SLA Monitoring',
    description: 'Real-time analysis of latency KPIs for URLLC slices.',
    domain: 'Network',
    status: 'Development',
    owner: 'Radio Planning',
    lastUpdated: '2023-11-02'
  },
  {
    id: 'UC-003',
    title: 'Fiber Cut Triangulation',
    description: 'Correlates OTDR logs with GIS data to pinpoint fiber breaks.',
    domain: 'Network',
    status: 'Concept',
    owner: 'Field Ops',
    lastUpdated: '2023-12-01'
  },
  {
    id: 'UC-004',
    title: 'Customer Churn Prediction',
    description: 'Analyzes CDRs and support tickets to predict churn risk.',
    domain: 'Customer',
    status: 'Production',
    owner: 'Data Science',
    lastUpdated: '2023-09-20'
  }
];

// This represents the "Vector DB" content
export const KNOWLEDGE_BASE: DocumentChunk[] = [
  {
    id: 'doc-1',
    source: 'Runbook: HSS Troubleshooting v2.1',
    content: 'If HSS returns error 5003 (Database Lock), first verify the SCTP association status. If down, attempt a soft restart of the diameter stack using command `service diameter-stack restart`. Do not hard reset the node unless traffic is below 10%.',
    score: 0.95
  },
  {
    id: 'doc-2',
    source: 'Policy: Incident Management Level 1',
    content: 'All critical network incidents affecting >1000 users must be reported to the NOC Supervisor within 15 minutes. Use ticket template INC-CRITICAL.',
    score: 0.88
  },
  {
    id: 'doc-3',
    source: 'Architecture: 5G Core Layout',
    content: 'The 5G Core is deployed on Kubernetes clusters across 3 Availability Zones. The UPF (User Plane Function) handles data forwarding. N4 interface connects SMF and UPF.',
    score: 0.82
  },
  {
    id: 'doc-4',
    source: 'Script: Optical Diagnostic',
    content: 'The Python script `opt_diag.py` connects to the OLT via SSH. It expects environment variables OLT_HOST and OLT_USER. It retrieves attenuation levels for all ONUs.',
    score: 0.91
  },
  {
    id: 'doc-5',
    source: 'Compliance: GDPR Data Handling',
    content: 'Customer Identifiable Information (CII) must not be stored in raw text logs. All CDRs exported to the Data Lake must be hashed using SHA-256 with a daily rotating salt.',
    score: 0.85
  }
];