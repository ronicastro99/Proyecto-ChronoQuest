import React from 'react';
import { EraHistorica } from '../../types/database';
import { useGame } from '../../context/GameContext';
import {
  Flame,
  Landmark,
  Shield,
  Compass,
  Rocket,
  Play,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface EraCardProps {
  era: EraHistorica;
}

export const EraCard: React.FC<EraCardProps> = ({ era }) => {
  const { startQuiz, user, preguntas } = useGame();

  // Preguntas totales de esta era
  const eraPreguntas = preguntas.filter(p => p.id_era === era.id_era);

  // Icono dinámico según era
  const getIcon = () => {
    switch (era.id_era) {
      case 1:
        return <Flame className="w-8 h-8 text-amber-400" />;
      case 2:
        return <Landmark className="w-8 h-8 text-yellow-300" />;
      case 3:
        return <Shield className="w-8 h-8 text-blue-400" />;
      case 4:
        return <Compass className="w-8 h-8 text-purple-400" />;
      case 5:
        return <Rocket className="w-8 h-8 text-emerald-400" />;
      default:
        return <Flame className="w-8 h-8 text-amber-400" />;
    }
  };

  // Ilustración artística vectorial de fondo para cada época (como las ventanas arquitectónicas del prototipo Penpot)
  const renderThematicArt = () => {
    switch (era.id_era) {
      case 1: // Prehistoria: Cueva rupestre, fuego y sol crepuscular
        return (
          <svg className="w-full h-36 object-cover" viewBox="0 0 300 150" fill="none">
            <defs>
              <linearGradient id="prehistoriaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="50%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
            <rect width="300" height="150" fill="url(#prehistoriaGrad)" />
            {/* Montañas y cueva */}
            <path d="M0 150 L60 80 L140 130 L220 70 L300 150 Z" fill="#292524" />
            <circle cx="150" cy="50" r="28" fill="#f59e0b" opacity="0.6" />
            {/* Hoguera */}
            <path d="M140 135 Q150 100 160 135 Z" fill="#ef4444" />
            <path d="M145 135 Q150 110 155 135 Z" fill="#facc15" />
            {/* Siluetas rupestres de bisontes */}
            <path d="M70 110 Q90 95 110 110 L105 125 L75 125 Z" fill="#1c1917" opacity="0.7" />
          </svg>
        );
      case 2: // Historia Antigua: Columnas griegas y pirámides de Guiza
        return (
          <svg className="w-full h-36 object-cover" viewBox="0 0 300 150" fill="none">
            <defs>
              <linearGradient id="antiguaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#713f12" />
                <stop offset="50%" stopColor="#a16207" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <rect width="300" height="150" fill="url(#antiguaGrad)" />
            {/* Pirámides de fondo */}
            <polygon points="120,130 180,45 240,130" fill="#ca8a04" opacity="0.8" />
            <polygon points="180,45 240,130 220,130" fill="#854d0e" opacity="0.9" />
            <polygon points="60,130 110,65 160,130" fill="#eab308" opacity="0.7" />
            {/* Columnas clásicas en los laterales estilo ventana */}
            <rect x="15" y="20" width="16" height="110" fill="#fef08a" opacity="0.7" />
            <rect x="270" y="20" width="16" height="110" fill="#fef08a" opacity="0.7" />
            <rect x="5" y="15" width="290" height="12" fill="#ca8a04" opacity="0.8" />
          </svg>
        );
      case 3: // Historia Medieval: Castillo con torres, murallas y estandartes
        return (
          <svg className="w-full h-36 object-cover" viewBox="0 0 300 150" fill="none">
            <defs>
              <linearGradient id="medievalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="60%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            <rect width="300" height="150" fill="url(#medievalGrad)" />
            {/* Luna medieval */}
            <circle cx="230" cy="40" r="18" fill="#e2e8f0" opacity="0.8" />
            {/* Colinas y Castillo */}
            <path d="M0 150 Q100 110 300 150 Z" fill="#064e3b" opacity="0.6" />
            {/* Muralla y Torres */}
            <rect x="100" y="70" width="100" height="60" fill="#334155" />
            <rect x="90" y="50" width="25" height="80" fill="#1e293b" />
            <polygon points="90,50 102,30 115,50" fill="#dc2626" />
            <rect x="185" y="50" width="25" height="80" fill="#1e293b" />
            <polygon points="185,50 197,30 210,50" fill="#dc2626" />
            {/* Ventana gótica arco */}
            <path d="M140 100 Q150 85 160 100 L160 130 L140 130 Z" fill="#fbbf24" opacity="0.9" />
          </svg>
        );
      case 4: // Historia Moderna: Galeón renacentista navegando y astrolabio
        return (
          <svg className="w-full h-36 object-cover" viewBox="0 0 300 150" fill="none">
            <defs>
              <linearGradient id="modernaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b0764" />
                <stop offset="60%" stopColor="#6b21a8" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
            <rect width="300" height="150" fill="url(#modernaGrad)" />
            {/* Océano */}
            <path d="M0 120 Q75 110 150 120 T300 120 L300 150 L0 150 Z" fill="#1e40af" />
            {/* Galeón / Carabela */}
            <path d="M110 125 C120 135 180 135 190 125 L180 110 L120 110 Z" fill="#78350f" />
            <line x1="145" y1="110" x2="145" y2="60" stroke="#451a03" strokeWidth="3" />
            <line x1="165" y1="110" x2="165" y2="70" stroke="#451a03" strokeWidth="2.5" />
            {/* Velas con cruz de Borgoña o Portugal */}
            <path d="M130 65 Q145 60 160 65 L155 95 Q145 90 135 95 Z" fill="#f8fafc" />
            <path d="M140 70 L150 85 M150 70 L140 85" stroke="#dc2626" strokeWidth="2" />
          </svg>
        );
      case 5: // Historia Contemporánea: Silueta de metrópolis, tren y cohete espacial
        return (
          <svg className="w-full h-36 object-cover" viewBox="0 0 300 150" fill="none">
            <defs>
              <linearGradient id="contempGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="50%" stopColor="#047857" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <rect width="300" height="150" fill="url(#contempGrad)" />
            {/* Skyline de rascacielos */}
            <rect x="50" y="70" width="30" height="80" fill="#0f172a" opacity="0.8" />
            <rect x="90" y="50" width="35" height="100" fill="#1e293b" opacity="0.9" />
            <rect x="135" y="80" width="40" height="70" fill="#0f172a" opacity="0.7" />
            <rect x="185" y="60" width="30" height="90" fill="#334155" opacity="0.8" />
            {/* Cohete Apolo despegando */}
            <path d="M245 40 L250 20 L255 40 Z" fill="#e2e8f0" />
            <rect x="246" y="40" width="8" height="25" fill="#f8fafc" />
            <path d="M245 65 Q250 85 255 65 Z" fill="#f97316" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getButtonText = () => {
    switch (era.id_era) {
      case 1:
        return 'Jugar en la Prehistoria';
      case 2:
        return 'Jugar en la Época Antigua';
      case 3:
        return 'Jugar en la Época Medieval';
      case 4:
        return 'Jugar en la Época Moderna';
      case 5:
        return 'Jugar en la Época Contemporánea';
      default:
        return `Jugar en ${era.nombre_era}`;
    }
  };

  return (
    <div className="group relative rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/60 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Marco Ilustrado de Época */}
      <div className="relative overflow-hidden bg-slate-950">
        {renderThematicArt()}
        
        {/* Gradiente de fusión */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20"></div>

        {/* Badge de preguntas */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-bold text-amber-300">
          {eraPreguntas.length} Preguntas
        </div>

        {/* Badge de Rango cronológico */}
        {era.epoca_rango && (
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] text-slate-300 font-mono">
            {era.epoca_rango}
          </div>
        )}
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="p-1.5 rounded-xl bg-slate-800 border border-slate-700">
              {getIcon()}
            </div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
              {era.nombre_era}
            </h3>
          </div>
          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mt-2">
            {era.descripcion}
          </p>
        </div>

        {/* Botón Jugar según Penpot Prototipo */}
        <button
          onClick={() => startQuiz(era)}
          disabled={user.vides <= 0}
          className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg ${
            user.vides <= 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-yellow-400 active:scale-[0.98] shadow-amber-500/20'
          }`}
        >
          {user.vides <= 0 ? (
            <>
              <Lock className="w-4 h-4" />
              <span>Sin Vidas (Ir a la Tienda)</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{getButtonText()}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
