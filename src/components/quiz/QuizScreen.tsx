import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { Pregunta, OpcionChar } from '../../types/database';
import { MascotAvatar } from '../common/MascotAvatar';
import { QuizSummaryModal } from './QuizSummaryModal';
import {
  Clock,
  Heart,
  Flame,
  ArrowRight,
  LogOut,
  Sparkles,
  HelpCircle,
  ShieldAlert,
  Hourglass,
  CheckCircle2,
  XCircle,
  Coins,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizScreen: React.FC = () => {
  const {
    activeQuizEra,
    preguntas,
    user,
    answerQuestion,
    exitQuiz,
    setCurrentView,
    inventory,
    usePowerUp,
    activeShield,
  } = useGame();

  // Filtrar preguntas de la era seleccionada
  const eraPreguntas = React.useMemo(() => {
    if (!activeQuizEra) return [];
    return preguntas.filter((p) => p.id_era === activeQuizEra.id_era);
  }, [activeQuizEra, preguntas]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OpcionChar | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerResult, setAnswerResult] = useState<{
    isCorrect: boolean;
    pointsEarned: number;
    tokensEarned: number;
    newStreak: number;
    livesRemaining: number;
    explanation?: string;
  } | null>(null);

  // Temporizador por pregunta (30 segundos por defecto)
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  // Power-up 50/50: opciones ocultadas para la pregunta actual
  const [hiddenOptions, setHiddenOptions] = useState<OpcionChar[]>([]);

  // Feedback mascot text
  const [mascotReaction, setMascotReaction] = useState<string>('');

  // Estadísticas del cuestionario actual
  const [quizStats, setQuizStats] = useState({
    totalPoints: 0,
    totalTokens: 0,
    correctCount: 0,
    wrongCount: 0,
  });

  const [showSummary, setShowSummary] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  const currentPregunta: Pregunta | undefined = eraPreguntas[currentIndex];

  // Temporizador de cuenta atrás
  useEffect(() => {
    if (!timerActive || isAnswered || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, isAnswered, timeLeft]);

  // Si se agota el tiempo
  const handleTimeOut = () => {
    if (!currentPregunta || isAnswered) return;
    setIsAnswered(true);
    setTimerActive(false);

    // Responder con una opción nula o errónea para descontar vida
    const result = answerQuestion(currentPregunta.id_pregunta, 'A', 0);
    setAnswerResult({
      ...result,
      isCorrect: false,
    });
    setMascotReaction('¡El tiempo se ha agotado! La historia no espera a nadie.');
    setQuizStats((prev) => ({
      ...prev,
      wrongCount: prev.wrongCount + 1,
    }));
  };

  const handleSelectOption = (opcion: OpcionChar) => {
    if (isAnswered || !currentPregunta) return;

    setSelectedOption(opcion);
    setIsAnswered(true);
    setTimerActive(false);

    const result = answerQuestion(currentPregunta.id_pregunta, opcion, timeLeft);
    setAnswerResult(result);

    if (result.isCorrect) {
      if (result.newStreak >= 3) {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 },
        });
      }
      setMascotReaction(
        user.mascota === 'Cleo'
          ? '¡Brillante! Sabía que tu mente guardaba la respuesta correcta.'
          : '¡Certero! ¡Un golpe magistral de conocimiento!'
      );
      setQuizStats((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints + result.pointsEarned,
        totalTokens: prev.totalTokens + result.tokensEarned,
        correctCount: prev.correctCount + 1,
      }));
    } else {
      setMascotReaction(
        user.mascota === 'Cleo'
          ? 'No te preocupes; cada fallo es una lección milenaria.'
          : '¡Reorganiza tus filas! Un revés no detiene al guerrero.'
      );
      setQuizStats((prev) => ({
        ...prev,
        wrongCount: prev.wrongCount + 1,
      }));
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < eraPreguntas.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setAnswerResult(null);
      setTimeLeft(30);
      setTimerActive(true);
      setHiddenOptions([]);
      setMascotReaction('');
    } else {
      // Fin del cuestionario
      setShowSummary(true);
    }
  };

  // Activar Power-Up 50/50
  const handleUse5050 = () => {
    if (isAnswered || !currentPregunta || inventory.pista_5050 <= 0 || hiddenOptions.length > 0) return;
    const ok = usePowerUp('pista_5050');
    if (ok) {
      const all: OpcionChar[] = ['A', 'B', 'C', 'D'];
      const wrongs = all.filter((o) => o !== currentPregunta.opcion_correcta);
      // Ocultar 2 opciones incorrectas al azar
      const shuffled = wrongs.sort(() => 0.5 - Math.random());
      setHiddenOptions(shuffled.slice(0, 2));
    }
  };

  // Activar Power-Up Tiempo Extra (+15s)
  const handleUseExtraTime = () => {
    if (isAnswered || inventory.tiempo_extra <= 0) return;
    const ok = usePowerUp('tiempo_extra');
    if (ok) {
      setTimeLeft((prev) => prev + 15);
    }
  };

  if (!activeQuizEra || eraPreguntas.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-slate-300">
        <h2 className="font-cinzel text-2xl font-bold text-white mb-4">
          No hay preguntas disponibles para esta era histórica
        </h2>
        <button
          onClick={exitQuiz}
          className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Barra Superior del Cuestionario (Tiempo, Pregunta X/Y, Racha y Vidas) */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
        {/* Tiempo Restante según Penpot (Tiempo restante: 00:25) */}
        <div className="flex items-center gap-2 text-slate-200">
          <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-400 animate-bounce' : 'text-amber-400'}`} />
          <span className="font-mono text-sm sm:text-base font-bold">
            Tiempo restante: 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>

        {/* Contador de Pregunta (según prototipo Penpot: "Pregunta 1/10") */}
        <div className="font-cinzel text-sm sm:text-base font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
          Pregunta {currentIndex + 1} / {eraPreguntas.length}
        </div>
      </div>

      {/* Barra de Progreso lineal visual */}
      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / eraPreguntas.length) * 100}%` }}
        ></div>
      </div>

      {/* Contenedor Dorado de la Pregunta (Estilo prototipo Penpot page 13) */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-amber-600 via-yellow-600 to-amber-700 border-2 border-amber-400 text-slate-950 shadow-2xl overflow-hidden">
        {/* Textura sutil y reflejo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3 text-amber-950/80 font-bold text-xs uppercase tracking-wider">
          <span>{activeQuizEra.nombre_era}</span>
          <span className="bg-amber-800/20 px-2.5 py-0.5 rounded-full border border-amber-800/30">
            Dificultad: {currentPregunta?.dificultad}
          </span>
        </div>

        <h2 className="font-cinzel text-lg sm:text-2xl font-black text-slate-950 leading-relaxed text-center sm:text-left drop-shadow-sm">
          {currentPregunta?.enunciado}
        </h2>
      </div>

      {/* Barra de Power-ups (50/50 Oráculo, Tiempo Extra) */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 rounded-2xl px-4 py-2.5 text-xs text-slate-300">
        <span className="font-semibold text-slate-400 hidden sm:inline">Ventajas históricas:</span>
        <div className="flex items-center gap-3">
          {/* Papiro 50/50 */}
          <button
            onClick={handleUse5050}
            disabled={isAnswered || inventory.pista_5050 <= 0 || hiddenOptions.length > 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all ${
              inventory.pista_5050 > 0 && !isAnswered && hiddenOptions.length === 0
                ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 hover:bg-purple-900/60'
                : 'bg-slate-800/60 border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
            title="Descarta 2 opciones incorrectas"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Papiro 50/50 ({inventory.pista_5050})</span>
          </button>

          {/* Reloj de Arena (+15s) */}
          <button
            onClick={handleUseExtraTime}
            disabled={isAnswered || inventory.tiempo_extra <= 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all ${
              inventory.tiempo_extra > 0 && !isAnswered
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 hover:bg-amber-900/60'
                : 'bg-slate-800/60 border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
            title="Añade +15 segundos al temporizador"
          >
            <Hourglass className="w-3.5 h-3.5" />
            <span>+15s Extra ({inventory.tiempo_extra})</span>
          </button>
        </div>
      </div>

      {/* Grid de las 4 Opciones de Respuesta A, B, C, D (Exacto al prototipo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'A' as OpcionChar, text: currentPregunta?.opcion_a },
          { key: 'B' as OpcionChar, text: currentPregunta?.opcion_b },
          { key: 'C' as OpcionChar, text: currentPregunta?.opcion_c },
          { key: 'D' as OpcionChar, text: currentPregunta?.opcion_d },
        ].map((opc) => {
          const isHidden = hiddenOptions.includes(opc.key);
          const isSelected = selectedOption === opc.key;
          const isCorrect = currentPregunta?.opcion_correcta === opc.key;

          let btnClass = 'bg-white text-slate-900 hover:bg-slate-100 border-2 border-transparent';

          if (isHidden) {
            btnClass = 'bg-slate-800/40 text-slate-600 border border-slate-700/50 opacity-40 cursor-not-allowed';
          } else if (isAnswered) {
            if (isCorrect) {
              btnClass = 'bg-emerald-500 text-white font-bold border-2 border-emerald-300 shadow-lg shadow-emerald-500/30 scale-[1.02]';
            } else if (isSelected && !isCorrect) {
              btnClass = 'bg-red-500 text-white font-bold border-2 border-red-300 shadow-lg shadow-red-500/30 animate-shake';
            } else {
              btnClass = 'bg-slate-800 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={opc.key}
              disabled={isAnswered || isHidden}
              onClick={() => handleSelectOption(opc.key)}
              className={`w-full min-h-[64px] p-4 rounded-2xl text-left font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-between shadow-md ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  isAnswered && isCorrect
                    ? 'bg-emerald-700 text-white'
                    : isAnswered && isSelected && !isCorrect
                    ? 'bg-red-700 text-white'
                    : 'bg-slate-200 text-slate-800'
                }`}>
                  {opc.key}
                </span>
                <span className="leading-snug">{opc.text}</span>
              </div>

              {isAnswered && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 ml-2" />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-white flex-shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Drawer tras responder (con explicación y Mascota) */}
      {isAnswered && (
        <div className={`p-5 rounded-3xl border-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
          answerResult?.isCorrect
            ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-100'
            : 'bg-red-950/70 border-red-500/60 text-red-100'
        }`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <MascotAvatar
              mascota={user.mascota}
              size="md"
              emotion={answerResult?.isCorrect ? 'happy' : 'sad'}
              className="flex-shrink-0"
            />
            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-base sm:text-lg">
                  {answerResult?.isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                </span>
                {answerResult?.isCorrect && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    +{answerResult.pointsEarned} Puntos
                  </span>
                )}
                {answerResult?.tokensEarned ? (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center gap-1">
                    <Coins className="w-3 h-3" /> +{answerResult.tokensEarned} Tokens
                  </span>
                ) : null}
              </div>

              <p className="text-xs sm:text-sm text-slate-200 italic">
                "{mascotReaction}"
              </p>

              {answerResult?.explanation && (
                <div className="mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300">
                  <span className="font-bold text-amber-300">Dato histórico: </span>
                  {answerResult.explanation}
                </div>
              )}
            </div>

            {/* Botón Siguiente Pregunta */}
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
            >
              <span>{currentIndex + 1 < eraPreguntas.length ? 'Continuar' : 'Ver Resultados'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Botón Abandonar Partida según prototipo Penpot (fondo carmesí) */}
      <div className="pt-4 text-center">
        <button
          onClick={() => setShowConfirmExit(true)}
          className="px-8 py-3 rounded-2xl bg-[#7f1d1d] hover:bg-[#991b1b] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-red-900/30 transition-all border border-red-700/60"
        >
          Abandonar Partida
        </button>
      </div>

      {/* Modal de confirmación para salir */}
      {showConfirmExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4">
            <h3 className="font-cinzel text-xl font-bold text-white">¿Deseas abandonar la partida?</h3>
            <p className="text-xs text-slate-400">
              Perderás el progreso de las preguntas no guardadas de este cuestionario.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmExit(false)}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
              >
                Seguir Jugando
              </button>
              <button
                onClick={exitQuiz}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Sí, Abandonar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Resumen al finalizar todas las preguntas */}
      {showSummary && (
        <QuizSummaryModal
          stats={quizStats}
          era={activeQuizEra}
          onRestart={() => {
            setCurrentIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
            setAnswerResult(null);
            setTimeLeft(30);
            setTimerActive(true);
            setHiddenOptions([]);
            setShowSummary(false);
          }}
          onExit={exitQuiz}
          onGoToShop={() => {
            exitQuiz();
            setCurrentView('shop');
          }}
        />
      )}
    </div>
  );
};
