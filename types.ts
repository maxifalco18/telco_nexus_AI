export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface DocumentChunk {
  id: string;
  source: string;
  content: string;
  score: number; // Similarity score simulation
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  retrievedContext?: DocumentChunk[]; // The chunks used to generate this answer
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  domain: 'Network' | 'IT' | 'Customer' | 'Security';
  status: 'Production' | 'Development' | 'Concept';
  owner: string;
  lastUpdated: string;
}

export interface SystemMetric {
  name: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  USE_CASES = 'USE_CASES',
  ARCHITECTURE = 'ARCHITECTURE'
}