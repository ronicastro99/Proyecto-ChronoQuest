import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { EraHistorica } from '../../types/database';
import { MascotAvatar } from '../common/MascotAvatar';
import { sound } from '../../services/soundService';
import confetti from 'canvas-confetti';
import { Trophy, Coins, RotateCcw, Home, Store, Flame, Award } from 'lucide-react';

interface QuizSummaryModalProps {
  stats: {
    totalPoints: number;
    totalTokens: number;
    correctCount: number;
    wrongCount: number;
  };
  era: EraHistorica;
  onRestart: () => void;
  onExit: () => void;
  onGoToShop: () => void;
}

export const QuizSummaryModal: React.FC<QuizSummaryModalProps> = ({
  stats,
  era,
  onRestart,
  onExit,
  onGoToShop,
}) => {
  const { user } = useGame();
  const total = stats.correctCount + stats.wrongCount;
  const accuracy = total > 0 ? Math.round((stats.correctCount / total) * 100) : 0;
  const isPerfect = stats.wrongCount === 0 && stats.correctCount > 0;

  useEffect(() => {
    sound.playVictory();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#3b82f6', '#10b981'],
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl overflow-hidden">
        {/* Glow de celebración */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Mascota Celebrando */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <MascotAvatar
              mascota={user.mascota}
              size="lg"
              emotion="cheer"
              className="shadow-2xl ring-4 ring-amber-400/40"
            />
            {isPerfect && (
              <div className="absolute -top-3 -right-3 p-2 bg-amber-400 text-slate-950 rounded-full shadow-lg font-bold text-xs">
                👑 100%
              </div>
            )}
          </div>
        </div>

        {/* Título de Victoria */}
        <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          {isPerfect ? '¡Ronda Perfecta!' : '¡Expedición Completada!'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Has explorado los misterios de <span className="font-semibold text-amber-300">{era.nombre_era}</span>.
        </p>

        {/* Métricas del Cuestionario */}
        <div className="grid grid-cols-3 gap-3 my-6">
          {/* Puntos Ganados */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-center text-amber-400 mb-1">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="font-cinzel text-lg sm:text-xl font-bold text-white">
              +{stats.totalPoints}
            </div>
            <div className="text-[10px] text-slate-400 font-medium uppercase">Puntos EXP</div>
          </div>

          {/* Precisión */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-center text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
            </div>
            <div className="font-cinzel text-lg sm:text-xl font-bold text-emerald-400">
              {accuracy}%
            </div>
            <div className="text-[10px] text-slate-400 font-medium uppercase">
              {stats.correctCount}/{total} Aciertos
            </div>
          </div>

          {/* Tokens Obtenidos */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-center text-amber-300 mb-1">
              <Coins className="w-4 h-4" />
            </div>
            <div className="font-cinzel text-lg sm:text-xl font-bold text-amber-300">
              +{stats.totalTokens}
            </div>
            <div className="text-[10px] text-slate-400 font-medium uppercase">Tokens Ganados</div>
          </div>
        </div>

        {/* Racha del Jugador */}
        <div className="mb-6 p-3 rounded-2xl bg-orange-950/40 border border-orange-500/30 flex items-center justify-center gap-2 text-xs sm:text-sm text-orange-300">
          <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
          <span>Tu racha actual de juego es de: <strong>{user.ratxa_actual} aciertos</strong></span>
        </div>

        {/* Botones de Acción */}
        <div className="space-y-2.5">
          <button
            onClick={onRestart}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar de Nuevo esta Era</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onGoToShop}
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Ir a la Tienda</span>
            </button>
            <button
              onClick={onExit}
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Volver al Inicio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
