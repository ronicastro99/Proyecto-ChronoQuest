import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { MascotAvatar } from '../common/MascotAvatar';
import { storage } from '../../services/storageService';
import {
  User,
  Trophy,
  Flame,
  Award,
  CheckCircle2,
  Calendar,
  Shield,
  Clock,
  Sparkles,
  BookOpen,
  XCircle,
  HelpCircle,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { user, eras, preguntas, logros, setCurrentView } = useGame();
  const [activeTab, setActiveTab] = useState<'logros' | 'historial'>('logros');

  const respuestas = storage.getRespuestas().filter(r => r.id_usuario === user.id_usuario);
  const totalRespuestas = respuestas.length;
  const aciertosTotales = respuestas.filter(r => r.es_correcta).length;
  const precisionGlobal = totalRespuestas > 0 ? Math.round((aciertosTotales / totalRespuestas) * 100) : 0;

  // Estadísticas por cada una de las 5 eras
  const statsPorEra = eras.map((era) => {
    const preguntasEra = preguntas.filter(p => p.id_era === era.id_era);
    const idPreguntasEra = new Set(preguntasEra.map(p => p.id_pregunta));
    const respuestasEra = respuestas.filter(r => idPreguntasEra.has(r.id_pregunta));
    const correctasEra = respuestasEra.filter(r => r.es_correcta).length;
    const precisionEra = respuestasEra.length > 0 ? Math.round((correctasEra / respuestasEra.length) * 100) : 0;

    return {
      era,
      totalRespondidas: respuestasEra.length,
      aciertos: correctasEra,
      precision: precisionEra,
    };
  });

  const logrosDesbloqueados = logros.filter(l => l.desbloqueado).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Tarjeta de Perfil del Usuario */}
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div
            onClick={() => setCurrentView('mascot-selection')}
            className="cursor-pointer group relative"
            title="Cambiar personaje / mascota"
          >
            <MascotAvatar
              mascota={user.mascota}
              size="lg"
              className="ring-4 ring-amber-400/30 group-hover:scale-105 transition-transform shadow-xl"
            />
            <span className="absolute -bottom-2 inset-x-0 mx-auto text-center px-2 py-0.5 rounded-full bg-slate-950 text-[10px] font-bold text-amber-400 border border-amber-400/30">
              Cambiar
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
                {user.nombre}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                user.rol === 'Admin'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {user.rol}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-mono">
                OAuth: {user.proveedor_oauth}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              {user.email}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Registrado: {user.fecha_registro.substring(0, 10)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>Mascota Activa: {user.mascota}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas Globales (RF-06) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Puntos Totales */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-xs text-slate-400 font-medium">Puntos Totales</span>
            <Trophy className="w-4 h-4" />
          </div>
          <div className="font-cinzel text-2xl font-bold text-white">
            {user.puntos_totales}
          </div>
        </div>

        {/* Precisión Global */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs text-slate-400 font-medium">Precisión Global</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="font-cinzel text-2xl font-bold text-emerald-400">
            {precisionGlobal}%
          </div>
          <div className="text-[10px] text-slate-400 font-medium mt-0.5">
            {aciertosTotales} de {totalRespuestas} aciertos
          </div>
        </div>

        {/* Racha Máxima Histórica */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-orange-400 mb-1">
            <span className="text-xs text-slate-400 font-medium">Racha Máxima</span>
            <Flame className="w-4 h-4" />
          </div>
          <div className="font-cinzel text-2xl font-bold text-orange-400">
            {user.ratxa_maxima || user.ratxa_actual} 🔥
          </div>
          <div className="text-[10px] text-slate-400 font-medium mt-0.5">
            Actual: {user.ratxa_actual}
          </div>
        </div>

        {/* Logros Completados */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-amber-300 mb-1">
            <span className="text-xs text-slate-400 font-medium">Logros Desbloqueados</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="font-cinzel text-2xl font-bold text-amber-300">
            {logrosDesbloqueados} / {logros.length}
          </div>
        </div>
      </div>

      {/* Desglose de Rendimiento por las 5 Eras Históricas (RF-03, RF-06) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>Desempeño por Época Histórica</span>
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline font-mono">
            5 apartados temáticos
          </span>
        </div>

        <div className="space-y-3">
          {statsPorEra.map(({ era, totalRespondidas, aciertos, precision }) => (
            <div
              key={era.id_era}
              className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="sm:w-1/3">
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <span>{era.nombre_era}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {aciertos} aciertos en {totalRespondidas} preguntas
                </div>
              </div>

              {/* Barra de Precisión */}
              <div className="flex-1 max-w-md">
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-slate-400">Precisión</span>
                  <span className="text-amber-400">{precision}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${precision}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pestañas: Logros vs Historial de Respuestas */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('logros')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'logros'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏆 Logros Desbloqueables ({logrosDesbloqueados}/{logros.length})
          </button>
          <button
            onClick={() => setActiveTab('historial')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'historial'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📜 Historial de Respuestas ({respuestas.length})
          </button>
        </div>

        {/* Tab 1: Grid de Logros */}
        {activeTab === 'logros' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {logros.map((l) => (
              <div
                key={l.id}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
                  l.desbloqueado
                    ? 'bg-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-60'
                }`}
              >
                <div className={`p-3 rounded-xl border flex-shrink-0 ${
                  l.desbloqueado
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}>
                  <Award className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs sm:text-sm text-white">
                      {l.titulo}
                    </h4>
                    {l.desbloqueado && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {l.descripcion}
                  </p>
                  <span className="inline-block text-[10px] font-bold text-amber-300">
                    +{l.recompensaTokens} Tokens
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Historial de Respuestas (schema.sql `respuestas_usuario`) */}
        {activeTab === 'historial' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            {respuestas.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                Aún no has respondido preguntas. ¡Comienza un cuestionario en el Inicio!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/60 uppercase text-[10px] text-slate-400 font-semibold border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-3">Pregunta</th>
                      <th className="py-2.5 px-3">Tu Opción</th>
                      <th className="py-2.5 px-3">Resultado</th>
                      <th className="py-2.5 px-3">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {respuestas.slice().reverse().map((r) => {
                      const p = preguntas.find(preg => preg.id_pregunta === r.id_pregunta);
                      return (
                        <tr key={r.id_respuesta} className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3 font-medium text-white max-w-sm truncate">
                            {p ? p.enunciado : `Pregunta #${r.id_pregunta}`}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold">{r.opcion_elegida}</td>
                          <td className="py-2.5 px-3">
                            {r.es_correcta ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Acierto
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-400 font-bold">
                                <XCircle className="w-3.5 h-3.5" /> Fallo
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-slate-400 font-mono">{r.fecha_respuesta}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
