import React from 'react';
import { Database, FileText, ArrowRight, Brain, Search, Layout } from 'lucide-react';

const Box = ({ title, icon: Icon, desc, color }: any) => (
  <div className={`flex flex-col items-center p-6 rounded-xl border ${color} bg-slate-800/50 backdrop-blur-sm w-64 text-center transition-transform hover:scale-105`}>
    <div className="mb-4 p-3 rounded-full bg-slate-900 border border-slate-700 shadow-lg">
      <Icon size={28} className="text-slate-200" />
    </div>
    <h3 className="font-bold text-slate-100 mb-2">{title}</h3>
    <p className="text-xs text-slate-400">{desc}</p>
  </div>
);

const Connector = () => (
  <div className="hidden md:flex flex-col items-center justify-center text-slate-600 mx-2">
    <ArrowRight size={24} />
  </div>
);

const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Secure RAG Architecture</h2>
        <p className="text-slate-400">
          Logical data flow for the on-premise implementation ensuring data sovereignty and minimal latency.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-2 items-center">
        {/* Step 1 */}
        <Box 
          title="Ingestion Sources" 
          icon={FileText} 
          desc="Confluence, Jira, Git, SQL Schemas (Internal Network)"
          color="border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        />
        
        <Connector />

        {/* Step 2 */}
        <Box 
          title="Vector Store" 
          icon={Database} 
          desc="Embeddings stored in pgvector/Milvus (Private VPC)"
          color="border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
        />

        <Connector />

        {/* Step 3 */}
        <Box 
          title="Retrieval Engine" 
          icon={Search} 
          desc="Semantic Search + Re-ranking (Python/LangChain)"
          color="border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
        />

        <Connector />

        {/* Step 4 */}
        <Box 
          title="Generative Model" 
          icon={Brain} 
          desc="Gemini 2.5 Flash (Vertex AI / Secure Endpoint)"
          color="border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        />
      </div>

      <div className="mt-12 p-6 bg-slate-900 rounded-xl border border-slate-800 max-w-4xl w-full">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Layout size={18} />
          Implementation Details
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2"></span>
            All data encryption at rest (AES-256) and in transit (TLS 1.3).
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2"></span>
            Role-Based Access Control (RBAC) integrated with corporate LDAP.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2"></span>
            Automatic daily re-indexing of "Production" status runbooks.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2"></span>
            Feedback loop implementation: User ratings tune retrieval weights.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArchitectureView;