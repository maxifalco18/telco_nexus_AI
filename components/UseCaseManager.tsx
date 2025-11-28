import React from 'react';
import { MOCK_USE_CASES } from '../constants';
import { UseCase } from '../types';
import { FileText, MoreVertical, Shield, Wifi, Server, Users } from 'lucide-react';

const UseCaseManager: React.FC = () => {
  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'Network': return <Wifi size={16} className="text-cyan-400" />;
      case 'Security': return <Shield size={16} className="text-rose-400" />;
      case 'IT': return <Server size={16} className="text-amber-400" />;
      default: return <Users size={16} className="text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Production': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Concept': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white">Use Case Inventory</h2>
          <p className="text-slate-400 text-sm mt-1">Manage automation logic and documentation sources.</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors">
          + New Use Case
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_USE_CASES.map((uc) => (
          <div key={uc.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all shadow-sm group">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 h-fit">
                  <FileText size={24} className="text-slate-300" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-slate-100">{uc.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(uc.status)}`}>
                      {uc.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3 max-w-2xl">{uc.description}</p>
                  
                  <div className="flex items-center gap-6 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      {getDomainIcon(uc.domain)}
                      <span>{uc.domain}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      <span>{uc.owner}</span>
                    </div>
                    <div>
                      Last Updated: {uc.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="text-slate-500 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCaseManager;