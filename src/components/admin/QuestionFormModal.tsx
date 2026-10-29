import React, { useState, useEffect } from 'react';
import { Pregunta, OpcionChar, DificultadPregunta } from '../../types/database';
import { useGame } from '../../context/GameContext';
import { X, Save, AlertCircle } from 'lucide-react';

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionToEdit?: Pregunta | null;
}

export const QuestionFormModal: React.FC<QuestionFormModalProps> = ({
  isOpen,
  onClose,
  questionToEdit,
}) => {
  const { eras, addQuestion, updateQuestion } = useGame();

  const [idEra, setIdEra] = useState<number>(1);
  const [enunciado, setEnunciado] = useState('');
  const [opcionA, setOpcionA] = useState('');
  const [opcionB, setOpcionB] = useState('');
  const [opcionC, setOpcionC] = useState('');
  const [opcionD, setOpcionD] = useState('');
  const [opcionCorrecta, setOpcionCorrecta] = useState<OpcionChar>('A');
  const [dificultad, setDificultad] = useState<DificultadPregunta>('Normal');
  const [explicacion, setExplicacion] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (questionToEdit) {
      setIdEra(questionToEdit.id_era);
      setEnunciado(questionToEdit.enunciado);
      setOpcionA(questionToEdit.opcion_a);
      setOpcionB(questionToEdit.opcion_b);
      setOpcionC(questionToEdit.opcion_c);
      setOpcionD(questionToEdit.opcion_d);
      setOpcionCorrecta(questionToEdit.opcion_correcta);
      setDificultad(questionToEdit.dificultad);
      setExplicacion(questionToEdit.explicacion || '');
    } else {
      setIdEra(1);
      setEnunciado('');
      setOpcionA('');
      setOpcionB('');
      setOpcionC('');
      setOpcionD('');
      setOpcionCorrecta('A');
      setDificultad('Normal');
      setExplicacion('');
    }
    setError(null);
  }, [questionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !enunciado.trim() ||
      !opcionA.trim() ||
      !opcionB.trim() ||
      !opcionC.trim() ||
      !opcionD.trim()
    ) {
      setError('Por favor completa el enunciado y las 4 opciones de respuesta.');
      return;
    }

    if (questionToEdit) {
      updateQuestion({
        id_pregunta: questionToEdit.id_pregunta,
        id_era: idEra,
        enunciado: enunciado.trim(),
        opcion_a: opcionA.trim(),
        opcion_b: opcionB.trim(),
        opcion_c: opcionC.trim(),
        opcion_d: opcionD.trim(),
        opcion_correcta: opcionCorrecta,
        dificultad,
        explicacion: explicacion.trim(),
      });
    } else {
      addQuestion({
        id_era: idEra,
        enunciado: enunciado.trim(),
        opcion_a: opcionA.trim(),
        opcion_b: opcionB.trim(),
        opcion_c: opcionC.trim(),
        opcion_d: opcionD.trim(),
        opcion_correcta: opcionCorrecta,
        dificultad,
        explicacion: explicacion.trim(),
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-1">
          {questionToEdit ? 'Editar Pregunta Histórica' : 'Nueva Pregunta Histórica'}
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          Gestión de contenido del sistema de preguntas (RF-07)
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Era Histórica */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Era Histórica (id_era)
              </label>
              <select
                value={idEra}
                onChange={(e) => setIdEra(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              >
                {eras.map((era) => (
                  <option key={era.id_era} value={era.id_era}>
                    {era.id_era}. {era.nombre_era}
                  </option>
                ))}
              </select>
            </div>

            {/* Dificultad */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Dificultad
              </label>
              <select
                value={dificultad}
                onChange={(e) => setDificultad(e.target.value as DificultadPregunta)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Fácil">Fácil</option>
                <option value="Normal">Normal</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
          </div>

          {/* Enunciado */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Enunciado de la Pregunta
            </label>
            <textarea
              rows={2}
              required
              placeholder="Escribe aquí la pregunta histórica..."
              value={enunciado}
              onChange={(e) => setEnunciado(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Opciones A, B, C, D */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold text-slate-300">
              Opciones de Respuesta y Selección de la Correcta
            </label>

            {[
              { key: 'A' as OpcionChar, val: opcionA, setVal: setOpcionA },
              { key: 'B' as OpcionChar, val: opcionB, setVal: setOpcionB },
              { key: 'C' as OpcionChar, val: opcionC, setVal: setOpcionC },
              { key: 'D' as OpcionChar, val: opcionD, setVal: setOpcionD },
            ].map(({ key, val, setVal }) => (
              <div key={key} className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setOpcionCorrecta(key)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center border transition-all ${
                    opcionCorrecta === key
                      ? 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-500/30 shadow'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title={`Marcar ${key} como la opción correcta`}
                >
                  {key}
                </button>
                <input
                  type="text"
                  required
                  placeholder={`Opción ${key}...`}
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            ))}
            <span className="text-[11px] text-amber-400 font-semibold block">
              * Haz clic en el botón de la letra (A, B, C o D) para marcarla como la respuesta correcta válida (verde).
            </span>
          </div>

          {/* Explicación histórica */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Explicación Histórica / Curiosidad (Feedback educativo)
            </label>
            <input
              type="text"
              placeholder="Ej: Este acontecimiento supuso un giro decisivo porque..."
              value={explicacion}
              onChange={(e) => setExplicacion(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Botones */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Save className="w-4 h-4" />
              <span>{questionToEdit ? 'Guardar Cambios' : 'Crear Pregunta'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
