import React from 'react';
import { useGame } from '../../context/GameContext';
import { EraCard } from './EraCard';
import { MascotBubble } from '../common/MascotBubble';
import {
  Sparkles,
  Trophy,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const { user, eras, setCurrentView } = useGame();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Saludo Duolingo Style y Mascota Bubble */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        {/* Saludo Principal (Texto exacto del prototipo Penpot: "¡Hola, Roni! Selecciona en qué época histórica quieres jugar") */}
        <div className="lg:col-span-2 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aventura Duolingo Histórica</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            ¡Hola, <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">{user.nombre}</span>!
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium">
            Selecciona en qué época histórica quieres jugar hoy para mantener tu racha.
          </p>
        </div>

        {/* Mascota Interactiva con Diálogo Contextual */}
        <div className="lg:col-span-1">
          <MascotBubble context={user.ratxa_actual > 0 ? 'racha' : 'bienvenida'} />
        </div>
      </div>

      {/* Barra de Progreso y Métricas Rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Puntos Totales */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 shadow-lg">
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Puntos Totales</div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              {user.puntos_totales}
            </div>
          </div>
        </div>

        {/* Racha Actual */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 shadow-lg">
          <div className="p-2.5 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/20">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Racha Actual</div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-orange-400">
              {user.ratxa_actual} {user.ratxa_actual > 0 ? '🔥' : ''}
            </div>
          </div>
        </div>

        {/* Vidas Disponibles */}
        <div
          onClick={() => setCurrentView('shop')}
          className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/40 flex items-center gap-3 shadow-lg cursor-pointer transition-colors"
        >
          <div className="p-2.5 rounded-xl bg-red-500/15 text-red-400 border border-red-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Vidas Restantes</div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-red-400">
              {user.vides} / 5
            </div>
          </div>
        </div>

        {/* Tokens */}
        <div
          onClick={() => setCurrentView('shop')}
          className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 flex items-center gap-3 shadow-lg cursor-pointer transition-colors"
        >
          <div className="p-2.5 rounded-xl bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Saldo Tokens</div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300">
              {user.tokens} 🪙
            </div>
          </div>
        </div>
      </div>

      {/* Grid de las 5 Eras Históricas (RF-03 & Penpot page 12) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              Las Cinco Eras Históricas
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            5 apartados temáticos (RF-03)
          </span>
        </div>

        {/* Grid de Tarjetas de Eras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eras.map((era) => (
            <EraCard key={era.id_era} era={era} />
          ))}
        </div>
      </div>

      {/* Banner de Tienda y Tokens Call to Action */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/30 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tienda Histórica de Vidas y Ventajas (RF-05)</span>
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            ¿Te estás quedando sin vidas o quieres proteger tu racha?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Gana tokens acertando preguntas seguidas y canjéalos en el bazar por pociones de vida, oráculos 50/50 o el escudo de falange.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('shop')}
          className="flex-shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
        >
          <span>Visitar Tienda</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
