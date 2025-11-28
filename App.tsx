import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, Layers, ShieldCheck, Settings, Network } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import UseCaseManager from './components/UseCaseManager';
import ArchitectureView from './components/ArchitectureView';
import { ViewState } from './types';
import { APP_NAME } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderContent = () => {
    switch (activeView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.CHAT:
        return <ChatInterface />;
      case ViewState.USE_CASES:
        return <UseCaseManager />;
      case ViewState.ARCHITECTURE:
        return <ArchitectureView />;
      default:
        return <Dashboard />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: any; label: string }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeView === view 
          ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Network size={28} />
            <h1 className="text-xl font-bold tracking-tight text-white">TelcoNexus</h1>
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-widest pl-9">AI Architect</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem view={ViewState.DASHBOARD} icon={LayoutDashboard} label="Overview" />
          <NavItem view={ViewState.CHAT} icon={MessageSquare} label="RAG Assistant" />
          <NavItem view={ViewState.USE_CASES} icon={Layers} label="Use Cases" />
          <NavItem view={ViewState.ARCHITECTURE} icon={ShieldCheck} label="Architecture" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-medium text-sm">System Config</span>
          </button>
          <div className="mt-4 px-4 text-xs text-slate-600 flex flex-col gap-1">
            <span>Env: Private VPC</span>
            <span>Ver: 0.4.1-alpha</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pointer-events-none"></div>

        {/* Content Area */}
        <div className="relative z-10 flex-1 p-8 overflow-y-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white capitalize">
                {activeView.toLowerCase().replace('_', ' ')}
              </h2>
              <p className="text-slate-400 text-sm">
                {activeView === ViewState.DASHBOARD && "System health and operational metrics."}
                {activeView === ViewState.CHAT && "Interactive query interface with document retrieval."}
                {activeView === ViewState.USE_CASES && "Catalog of automated workflows and known issues."}
                {activeView === ViewState.ARCHITECTURE && "High-level design of the secure RAG environment."}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-slate-200">Admin User</span>
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Connected
                  </span>
               </div>
               <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center">
                  <span className="font-bold text-slate-300">AD</span>
               </div>
            </div>
          </header>

          <div className="h-[calc(100%-80px)]">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;