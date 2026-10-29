import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/common/Navbar';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { QuizScreen } from './components/quiz/QuizScreen';
import { ShopScreen } from './components/shop/ShopScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { AdminPanel } from './components/admin/AdminPanel';
import { MascotSelector } from './components/auth/MascotSelector';
import { AuthModal } from './components/auth/AuthModal';
import { Github, Heart, Sparkles, BookOpen } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView } = useGame();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeDashboard />;
      case 'quiz':
        return <QuizScreen />;
      case 'shop':
        return <ShopScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'admin':
        return <AdminPanel />;
      case 'mascot-selection':
        return <MascotSelector />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Barra de Navegación Global */}
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Contenido de la Vista Actual */}
      <main className="flex-1 pb-12">
        {renderView()}
      </main>

      {/* Pie de Página según documentación del proyecto */}
      <footer className="border-t border-slate-800/80 bg-[#060a14] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-cinzel font-bold text-slate-200 flex items-center justify-center sm:justify-start gap-1.5">
              <span>ChronoQuest</span>
              <span className="text-amber-400 font-sans">• MP0492 Proyecto</span>
            </div>
            <p className="text-slate-500">
              Desarrollado por Ronnye Castro • Web Gamificada estilo Duolingo
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ronicastro99/Proyecto-ChronoQuest.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Repositorio GitHub</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Modal de Autenticación (RF-01) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
}

export default App;
