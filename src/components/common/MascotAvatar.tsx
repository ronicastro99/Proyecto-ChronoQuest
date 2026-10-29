import React from 'react';
import { MascotaId } from '../../types/database';

interface MascotAvatarProps {
  mascota: MascotaId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  emotion?: 'neutral' | 'happy' | 'cheer' | 'sad' | 'thinking';
  className?: string;
  showBadge?: boolean;
}

export const MascotAvatar: React.FC<MascotAvatarProps> = ({
  mascota,
  size = 'md',
  emotion = 'neutral',
  className = '',
  showBadge = false,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    xl: 'w-44 h-44',
  };

  const isCleo = mascota === 'Cleo';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl select-none transition-transform duration-300 ${
        sizeMap[size]
      } ${
        isCleo
          ? 'bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-600 shadow-amber-500/20 shadow-lg border-2 border-amber-300'
          : 'bg-gradient-to-b from-blue-500 via-indigo-600 to-slate-800 shadow-blue-500/20 shadow-lg border-2 border-blue-400'
      } ${className}`}
    >
      {isCleo ? (
        // Ilustración SVG vectorial detallada de Cleopatra (Cleo)
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tocado egipcio / Nemes azul y oro */}
          <path
            d="M20 38 C15 65 24 82 32 85 C32 60 28 45 32 38 Z"
            fill="#1e3a8a"
          />
          <path
            d="M80 38 C85 65 76 82 68 85 C68 60 72 45 68 38 Z"
            fill="#1e3a8a"
          />
          <path
            d="M22 45 C18 55 22 75 30 80"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M78 45 C82 55 78 75 70 80"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Rostro */}
          <ellipse cx="50" cy="54" rx="20" ry="22" fill="#fed7aa" />

          {/* Cabello negro / Flequillo simétrico egipcio */}
          <path
            d="M28 42 C30 25 70 25 72 42 C65 38 35 38 28 42 Z"
            fill="#18181b"
          />

          {/* Diadema Real de Oro */}
          <path
            d="M27 38 Q50 32 73 38 L74 44 Q50 38 26 44 Z"
            fill="#fbbf24"
            stroke="#d97706"
            strokeWidth="1"
          />
          {/* Uraeus (Cobra sagrada dorada en la frente) */}
          <circle cx="50" cy="34" r="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
          <path d="M50 30 L50 26 Q52 24 50 22" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />

          {/* Ojos egipcios con kohl característico */}
          <path
            d="M38 52 Q43 49 47 52 Q43 55 38 52"
            fill="#ffffff"
            stroke="#09090b"
            strokeWidth="1.5"
          />
          <path d="M35 52 L38 52" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="43" cy="52" r="2.2" fill="#3b2d18" />
          <circle cx="43.8" cy="51.2" r="0.8" fill="#ffffff" />

          <path
            d="M53 52 Q57 49 62 52 Q57 55 53 52"
            fill="#ffffff"
            stroke="#09090b"
            strokeWidth="1.5"
          />
          <path d="M62 52 L65 52" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="57" cy="52" r="2.2" fill="#3b2d18" />
          <circle cx="57.8" cy="51.2" r="0.8" fill="#ffffff" />

          {/* Cejas estilizadas */}
          <path d="M36 47 Q42 44 47 47" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M53 47 Q58 44 64 47" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Nariz */}
          <path d="M49 53 Q51 57 48 59" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" />

          {/* Boca según emoción */}
          {emotion === 'sad' ? (
            <path d="M44 66 Q50 63 56 66" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
          ) : emotion === 'cheer' || emotion === 'happy' ? (
            <path d="M43 63 Q50 71 57 63" stroke="#be123c" strokeWidth="2" strokeLinecap="round" fill="#e11d48" />
          ) : (
            <path d="M44 64 Q50 67 56 64" stroke="#be123c" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          )}

          {/* Collar ceremonial de lapislázuli y oro */}
          <path
            d="M34 76 Q50 86 66 76 Q60 84 50 87 Q40 84 34 76 Z"
            fill="#0284c7"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        // Ilustración SVG vectorial detallada de Alejandro Magno (Alex)
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Penacho / Pluma de cresta roja del casco macedonio */}
          <path
            d="M48 8 C44 2 56 2 52 8 C58 14 56 26 50 26 C44 26 42 14 48 8 Z"
            fill="#dc2626"
            stroke="#991b1b"
            strokeWidth="1"
          />
          <path d="M50 6 L50 24" stroke="#f87171" strokeWidth="1.5" />

          {/* Casco corintio / macedonio de bronce dorado */}
          <path
            d="M26 42 C26 22 74 22 74 42 C74 52 70 58 70 58 L30 58 C30 58 26 52 26 42 Z"
            fill="#f59e0b"
            stroke="#b45309"
            strokeWidth="1.5"
          />
          {/* Visera del casco */}
          <path
            d="M25 40 Q50 34 75 40 Q50 37 25 40 Z"
            fill="#d97706"
            stroke="#78350f"
            strokeWidth="1"
          />

          {/* Rostro de Alejandro */}
          <path
            d="M34 45 L66 45 C66 60 62 74 50 75 C38 74 34 60 34 45 Z"
            fill="#ffedd5"
          />

          {/* Cabello leonino en los laterales */}
          <path d="M28 42 C24 50 27 60 33 62" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 42 C76 50 73 60 67 62" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />

          {/* Ojos expresivos de Alejandro (uno con tono heterocromo sutil según leyenda) */}
          <ellipse cx="43" cy="52" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="43" cy="52" r="1.8" fill="#1e3a8a" />
          <circle cx="43.5" cy="51.5" r="0.6" fill="#ffffff" />

          <ellipse cx="57" cy="52" rx="3.5" ry="2.2" fill="#ffffff" />
          <circle cx="57" cy="52" r="1.8" fill="#78350f" />
          <circle cx="57.5" cy="51.5" r="0.6" fill="#ffffff" />

          {/* Cejas decididas */}
          <path d="M39 48 Q44 46 48 48" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M52 48 Q56 46 61 48" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />

          {/* Nariz recta clásica griega */}
          <path d="M49 50 L51 57 L48 58" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" />

          {/* Boca según emoción */}
          {emotion === 'sad' ? (
            <path d="M44 66 Q50 63 56 66" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />
          ) : emotion === 'cheer' || emotion === 'happy' ? (
            <path d="M44 63 Q50 70 56 63" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="#ea580c" />
          ) : (
            <path d="M44 65 Q50 67 56 65" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          )}

          {/* Coraza macedonia / Armadura de escamas con león o sol */}
          <path
            d="M30 75 Q50 88 70 75 L74 95 Q50 98 26 95 Z"
            fill="#d97706"
            stroke="#78350f"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="85" r="4" fill="#fde68a" stroke="#b45309" strokeWidth="1" />
        </svg>
      )}

      {showBadge && (
        <span
          className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full shadow ${
            isCleo ? 'bg-amber-400 text-amber-950' : 'bg-blue-500 text-white'
          }`}
        >
          {mascota}
        </span>
      )}
    </div>
  );
};
