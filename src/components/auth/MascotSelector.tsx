import React from 'react';
import { useGame } from '../../context/GameContext';
import { MascotaId } from '../../types/database';
import { MascotAvatar } from '../common/MascotAvatar';
import { MASCOTAS } from '../../data/mascotDialogues';
import { Check, Sparkles, ArrowLeft, ShieldCheck, BookOpen } from 'lucide-react';

export const MascotSelector: React.FC = () => {
  const { user, setMascota, setCurrentView } = useGame();

  const handleSelect = (mascotaId: MascotaId) => {
    setMascota(mascotaId);
    setCurrentView('home');
  };

  const personajes: {
    id: MascotaId;
    quote: string;
    stats: { label: string; value: number }[];
  }[] = [
    {
      id: 'Cleo',
      quote: '«El conocimiento es el verdadero cetro del poder.»',
      stats: [
        { label: 'Sabiduría', value: 98 },
        { label: 'Diplomacia', value: 95 },
        { label: 'Estrategia', value: 90 },
      ],
    },
    {
      id: 'Alex',
      quote: '«No hay nada imposible para aquel que lo intenta.»',
      stats: [
        { label: 'Valentía', value: 99 },
        { label: 'Liderazgo', value: 96 },
        { label: 'Estrategia', value: 92 },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Botón Volver */}
      <div className="mb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>
      </div>

      {/* Título Principal según Penpot Prototipo */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Requisito Funcional RF-02</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Elige a tu personaje
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Tu compañero te guiará con consejos, celebrará tus victorias y te animará tras cada reto histórico.
        </p>
      </div>

      {/* Grid de 2 Personajes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {personajes.map((p) => {
          const info = MASCOTAS[p.id];
          const isSelected = user.mascota === p.id;

          return (
            <div
              key={p.id}
              className={`relative rounded-3xl bg-slate-900/90 border-2 transition-all duration-300 overflow-hidden flex flex-col ${
                isSelected
                  ? 'border-amber-400 ring-4 ring-amber-400/20 shadow-2xl shadow-amber-500/20'
                  : 'border-slate-800 hover:border-slate-700 shadow-xl'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-lg">
                  <Check className="w-3.5 h-3.5" />
                  <span>Seleccionado</span>
                </div>
              )}

              {/* Encabezado con Avatar */}
              <div
                className={`p-8 text-center flex flex-col items-center justify-center ${
                  p.id === 'Cleo'
                    ? 'bg-gradient-to-b from-amber-950/40 to-slate-900'
                    : 'bg-gradient-to-b from-blue-950/40 to-slate-900'
                }`}
              >
                <div className="transform hover:scale-105 transition-transform">
                  <MascotAvatar
                    mascota={p.id}
                    size="xl"
                    emotion="cheer"
                    className="shadow-2xl"
                  />
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-white mt-5">
                  {info.nombre}
                </h3>
                <p className="text-amber-400 font-semibold text-sm mt-0.5">
                  {info.titulo}
                </p>
                <p className="text-xs text-slate-400 mt-1 italic font-serif">
                  {p.quote}
                </p>
              </div>

              {/* Cuerpo descriptivo */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {info.descripcion}
                </p>

                {/* Atributos / Stats */}
                <div className="space-y-2 bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
                  {p.stats.map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                        <span>{s.label}</span>
                        <span className="font-bold text-amber-400">{s.value}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            p.id === 'Cleo'
                              ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                              : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                          }`}
                          style={{ width: `${s.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botón Seleccionar (según prototipo) */}
                <button
                  onClick={() => handleSelect(p.id)}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-lg ${
                    isSelected
                      ? 'bg-slate-800 text-amber-400 border border-amber-400/40 hover:bg-slate-700'
                      : p.id === 'Cleo'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-400 hover:to-yellow-400 shadow-amber-500/20'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20'
                  }`}
                >
                  {isSelected ? '✓ Personaje Activo' : 'Seleccionar'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
