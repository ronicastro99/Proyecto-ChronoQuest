import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { MascotAvatar } from './MascotAvatar';
import { OBTENER_DIALOGO_MASCOTA, MASCOTAS } from '../../data/mascotDialogues';
import { Sparkles, MessageCircle } from 'lucide-react';

interface MascotBubbleProps {
  context?: 'bienvenida' | 'acierto' | 'error' | 'racha' | 'sin_vidas' | 'victoria' | 'tienda';
  customMessage?: string;
  className?: string;
}

export const MascotBubble: React.FC<MascotBubbleProps> = ({
  context = 'bienvenida',
  customMessage,
  className = '',
}) => {
  const { user, soundEnabled } = useGame();
  const [message, setMessage] = useState<string>('');
  const [bubbleKey, setBubbleKey] = useState<number>(0);

  const mascotInfo = MASCOTAS[user.mascota];

  useEffect(() => {
    if (customMessage) {
      setMessage(customMessage);
    } else {
      setMessage(OBTENER_DIALOGO_MASCOTA(user.mascota, context));
    }
    setBubbleKey((prev) => prev + 1);
  }, [user.mascota, context, customMessage]);

  const handleMascotClick = () => {
    setMessage(OBTENER_DIALOGO_MASCOTA(user.mascota, context));
    setBubbleKey((prev) => prev + 1);
  };

  return (
    <div className={`flex items-start gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-800/80 border border-slate-700/60 shadow-xl backdrop-blur-sm ${className}`}>
      {/* Mascota Interactiva */}
      <div
        onClick={handleMascotClick}
        className="cursor-pointer group relative flex-shrink-0"
        title="Haz clic para escuchar otro consejo de tu mascota"
      >
        <MascotAvatar
          mascota={user.mascota}
          size="md"
          className="group-hover:scale-105 transition-transform"
        />
        <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-full shadow-md">
          <MessageCircle className="w-3 h-3" />
        </div>
      </div>

      {/* Bocadillo de Diálogo Duolingo-style */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-xs sm:text-sm text-amber-300">
            {mascotInfo.nombre}
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            • {mascotInfo.titulo}
          </span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </div>

        <div
          key={bubbleKey}
          className="relative bg-slate-800/90 border border-slate-700/80 rounded-2xl rounded-tl-none p-3 text-xs sm:text-sm text-slate-200 leading-relaxed animate-in fade-in slide-in-from-left-2 duration-300 shadow-inner"
        >
          {message}
        </div>
      </div>
    </div>
  );
};
