import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Pregunta } from '../../types/database';
import { QuestionFormModal } from './QuestionFormModal';
import { storage } from '../../services/storageService';
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Database,
  Users,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    preguntas,
    eras,
    users,
    deleteQuestion,
    resetQuestions,
    exportDatabaseSQL,
  } = useGame();

  const [selectedEra, setSelectedEra] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Pregunta | null>(null);

  const [showSqlModal, setShowSqlModal] = useState(false);
  const [sqlContent, setSqlContent] = useState('');
  const [copied, setCopied] = useState(false);

  // Filtrado de preguntas
  const filteredPreguntas = preguntas.filter((p) => {
    const matchesEra = selectedEra === 'all' || p.id_era === selectedEra;
    const matchesDiff = selectedDifficulty === 'all' || p.dificultad === selectedDifficulty;
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.enunciado.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEra && matchesDiff && matchesSearch;
  });

  const handleEdit = (q: Pregunta) => {
    setEditingQuestion(q);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id_pregunta: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta pregunta?')) {
      deleteQuestion(id_pregunta);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        '¿Deseas restaurar todas las preguntas al banco original por defecto? Se perderán las preguntas personalizadas añadidas.'
      )
    ) {
      resetQuestions();
    }
  };

  const handleOpenSqlExport = () => {
    const sql = exportDatabaseSQL();
    setSqlContent(sql);
    setShowSqlModal(true);
    setCopied(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([sqlContent], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chronoquest_dump_${new Date().toISOString().substring(0, 10)}.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalRespuestas = storage.getRespuestas().length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Cabecera del Panel Admin */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Panel de Administración (RF-07)</span>
          </div>
          <h1 className="font-cinzel text-3xl font-extrabold text-white">
            Gestión del Sistema y Preguntas
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Administra el banco de preguntas por eras históricas y exporta los datos para sincronización con MySQL.
          </p>
        </div>

        {/* Botones de Acción Global */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenSqlExport}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all shadow"
            title="Genera script SQL con los INSERTs exactos correspondientes a schema.sql"
          >
            <Database className="w-4 h-4" />
            <span>Exportar SQL (schema.sql)</span>
          </button>

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Pregunta</span>
          </button>
        </div>
      </div>

      {/* Tarjetas de Métricas de Sistema */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-xs text-slate-400 font-medium">Preguntas Totales</span>
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="font-cinzel text-2xl font-bold text-white">{preguntas.length}</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-blue-400 mb-1">
            <span className="text-xs text-slate-400 font-medium">Eras Temáticas</span>
            <Database className="w-4 h-4" />
          </div>
          <div className="font-cinzel text-2xl font-bold text-white">{eras.length}</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs text-slate-400 font-medium">Usuarios Registrados</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="font-cinzel text-2xl font-bold text-emerald-400">{users.length}</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-purple-400 mb-1">
            <span className="text-xs text-slate-400 font-medium">Respuestas Registradas</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="font-cinzel text-2xl font-bold text-purple-400">{totalRespuestas}</div>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por texto de pregunta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Filtro Era */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Era:</span>
            <select
              value={selectedEra}
              onChange={(e) =>
                setSelectedEra(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="all">Todas las Eras ({preguntas.length})</option>
              {eras.map((era) => (
                <option key={era.id_era} value={era.id_era}>
                  {era.nombre_era} ({preguntas.filter((p) => p.id_era === era.id_era).length})
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Dificultad */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span>Dificultad:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="all">Todas</option>
              <option value="Fácil">Fácil</option>
              <option value="Normal">Normal</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>

          {/* Botón Restaurar Originales */}
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Restaurar preguntas por defecto"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabla de Preguntas */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 uppercase text-[10px] text-slate-400 font-semibold border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Era Histórica</th>
                <th className="py-3 px-4">Enunciado</th>
                <th className="py-3 px-4">Respuesta Válida</th>
                <th className="py-3 px-4">Dificultad</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredPreguntas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    No se encontraron preguntas con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredPreguntas.map((q) => {
                  const era = eras.find((e) => e.id_era === q.id_era);
                  const correctaText =
                    q.opcion_correcta === 'A'
                      ? q.opcion_a
                      : q.opcion_correcta === 'B'
                      ? q.opcion_b
                      : q.opcion_correcta === 'C'
                      ? q.opcion_c
                      : q.opcion_d;

                  return (
                    <tr key={q.id_pregunta} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-400">
                        #{q.id_pregunta}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-semibold text-amber-300 border border-slate-700">
                          {era?.nombre_era}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-md font-medium text-white">
                        <div className="line-clamp-2">{q.enunciado}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold text-[11px]">
                          <strong>[{q.opcion_correcta}]</strong> {correctaText}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          q.dificultad === 'Fácil'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : q.dificultad === 'Difícil'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {q.dificultad}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEdit(q)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Editar pregunta"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(q.id_pregunta)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/80 text-slate-400 hover:text-red-400 transition-colors"
                            title="Eliminar pregunta"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Creación / Edición */}
      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        questionToEdit={editingQuestion}
      />

      {/* Modal de Exportación SQL compatible con schema.sql */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                  Exportación SQL (docs/bd/schema.sql)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
                <button
                  onClick={handleDownloadSql}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar .sql</span>
                </button>
                <button
                  onClick={() => setShowSqlModal(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 my-3">
              Sentencias SQL listas para importar directamente en tu base de datos MySQL / MariaDB correspondiente al archivo <code>docs/bd/schema.sql</code>.
            </p>

            <pre className="flex-1 overflow-auto p-4 rounded-2xl bg-black/70 border border-slate-800 font-mono text-xs text-amber-200/90 leading-relaxed">
              {sqlContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
