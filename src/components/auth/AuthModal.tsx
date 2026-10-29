import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { MascotaId } from '../../types/database';
import { MascotAvatar } from '../common/MascotAvatar';
import { Mail, Lock, User, Sparkles, X, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, loginWithOAuth, register, switchUser, users } = useGame();
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [mascota, setMascota] = useState<MascotaId>('Cleo');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      if (!nombre.trim() || !email.trim() || !password.trim()) {
        setError('Por favor, completa todos los campos.');
        return;
      }
      const res = register(nombre.trim(), email.trim(), password, mascota);
      if (!res.success) {
        setError(res.error || 'Error al crear la cuenta.');
        return;
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setError('Por favor, introduce tu correo y contraseña.');
        return;
      }
      const res = login(email.trim(), password);
      if (!res.success) {
        setError(res.error || 'Error al iniciar sesión.');
        return;
      }
    }

    onClose();
  };

  const handleOAuth = (provider: 'google' | 'apple') => {
    loginWithOAuth(provider);
    onClose();
  };

  const handleQuickLogin = (emailTarget: string) => {
    const userTarget = users.find(u => u.email === emailTarget);
    if (userTarget) {
      switchUser(userTarget.id_usuario);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabecera */}
        <div className="text-center mb-6">
          <h2 className="font-cinzel text-3xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            ChronoQuest
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isRegister
              ? 'Crea tu cuenta de explorador del tiempo'
              : 'Bienvenido de nuevo a la expedición'}
          </p>
        </div>

        {/* Acceso Rápido Demo (Ideal para evaluación del proyecto) */}
        <div className="mb-5 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Acceso Rápido para Pruebas:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('roni@chronoquest.com')}
              className="py-1.5 px-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium transition-colors text-center truncate"
            >
              🧑‍🎓 Roni (Jugador)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@chronoquest.com')}
              className="py-1.5 px-2 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/40 text-amber-300 font-medium transition-colors text-center truncate"
            >
              👑 Administrador
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nombre de usuario
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Ej: Explorador Roni"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Selección de Mascota en Registro */}
          {isRegister && (
            <div className="pt-1">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Elige tu Mascota Inicial (RF-02)
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <div
                  onClick={() => setMascota('Cleo')}
                  className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer border transition-all ${
                    mascota === 'Cleo'
                      ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-400/30'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <MascotAvatar mascota="Cleo" size="sm" />
                  <div>
                    <div className="font-bold text-xs text-amber-300">Cleo</div>
                    <div className="text-[10px] text-slate-400">Sabia de Egipto</div>
                  </div>
                </div>

                <div
                  onClick={() => setMascota('Alex')}
                  className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer border transition-all ${
                    mascota === 'Alex'
                      ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-400/30'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <MascotAvatar mascota="Alex" size="sm" />
                  <div>
                    <div className="font-bold text-xs text-blue-300">Alex</div>
                    <div className="text-[10px] text-slate-400">Héroe Macedonio</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botón Principal */}
          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
          >
            {isRegister ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </form>

        {/* Separador */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-[11px] uppercase">
            <span className="bg-slate-900 px-3 text-slate-500 font-semibold tracking-wider">
              o bien
            </span>
          </div>
        </div>

        {/* Botones OAuth (RF-01) */}
        <div className="space-y-2">
          {/* Continuar con Apple */}
          <button
            type="button"
            onClick={() => handleOAuth('apple')}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-black hover:bg-neutral-900 text-white font-medium text-xs sm:text-sm border border-neutral-800 transition-colors shadow"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .6-2.63 1.35-.56.64-.99 1.68-.86 2.7 1.01.08 1.96-.44 2.57-1.18z"/>
            </svg>
            <span>Continuar con Apple</span>
          </button>

          {/* Continuar con Google */}
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-medium text-xs sm:text-sm transition-colors shadow"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continuar con Google</span>
          </button>
        </div>

        {/* Alternar entre Login y Registro */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 transition-colors"
          >
            {isRegister
              ? '¿Ya tienes cuenta? Inicia Sesión'
              : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
};
