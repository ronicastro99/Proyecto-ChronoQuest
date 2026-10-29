import React, { useState } from 'react';
import { useGame, ViewType } from '../../context/GameContext';
import { MascotAvatar } from './MascotAvatar';
import {
  Volume2,
  VolumeX,
  Heart,
  Flame,
  Coins,
  Shield,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Compass,
  Trophy,
  Store,
  Home,
  ShieldAlert,
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const {
    user,
    users,
    currentView,
    setCurrentView,
    soundEnabled,
    toggleSound,
    switchUser,
    activeShield,
  } = useGame();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
    { id: 'shop', label: 'Tienda', icon: <Store className="w-4 h-4" /> },
    { id: 'profile', label: 'Perfil y Logros', icon: <Trophy className="w-4 h-4" /> },
    ...(user.rol === 'Admin'
      ? [{ id: 'admin' as ViewType, label: 'Panel Admin', icon: <Shield className="w-4 h-4 text-amber-400" /> }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b1120]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo ChronoQuest */}
          <div
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber-400 animate-spin-slow group-hover:rotate-45 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent tracking-wide">
                ChronoQuest
              </span>
              <span className="hidden sm:block text-[10px] text-amber-200/60 font-medium tracking-widest uppercase">
                Aventura Histórica
              </span>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentView(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Gamification Stats: Vidas, Tokens, Racha, Audio & User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Vidas (RF-05) */}
            <div
              onClick={() => setCurrentView('shop')}
              title={`${user.vides}/5 Vidas disponibles. Haz clic para ir a la tienda`}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full cursor-pointer transition-all border ${
                user.vides <= 1
                  ? 'bg-red-950/80 border-red-500/50 text-red-400 animate-pulse'
                  : 'bg-slate-800/80 border-red-500/30 text-red-400 hover:bg-slate-700/80'
              }`}
            >
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              <span className="font-bold text-xs sm:text-sm">{user.vides}/5</span>
            </div>

            {/* Tokens (RF-05) */}
            <div
              onClick={() => setCurrentView('shop')}
              title={`${user.tokens} Tokens disponibles para canjear en la tienda`}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-800/80 border border-amber-500/30 text-amber-300 hover:bg-slate-700/80 cursor-pointer transition-all"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs sm:text-sm">{user.tokens}</span>
            </div>

            {/* Racha actual (RF-04) */}
            <div
              title={`Racha actual de aciertos: ${user.ratxa_actual}`}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all ${
                user.ratxa_actual > 0
                  ? 'bg-orange-950/60 border-orange-500/50 text-orange-400 shadow-orange-500/10 shadow'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400'
              }`}
            >
              <Flame className={`w-4 h-4 ${user.ratxa_actual > 0 ? 'fill-orange-500 text-orange-500' : ''}`} />
              <span className="font-bold text-xs sm:text-sm">{user.ratxa_actual}</span>
            </div>

            {/* Escudo de racha activo */}
            {activeShield && (
              <div
                title="Escudo de Falange activo: ¡tu racha está protegida de 1 fallo!"
                className="hidden sm:flex items-center p-1.5 rounded-full bg-blue-900/60 border border-blue-400/40 text-blue-300 animate-pulse"
              >
                <ShieldAlert className="w-4 h-4 text-blue-300" />
              </div>
            )}

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Silenciar sonidos' : 'Activar efectos de sonido'}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Alternar sonido"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Mascota Avatar & User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-700 transition-all text-left"
              >
                <MascotAvatar
                  mascota={user.mascota}
                  size="sm"
                  className="w-7 h-7 rounded-lg"
                />
                <span className="hidden sm:inline font-semibold text-xs text-slate-200 max-w-[80px] truncate">
                  {user.nombre}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-slate-800 mb-1">
                    <div className="flex items-center gap-2.5">
                      <MascotAvatar mascota={user.mascota} size="sm" className="w-8 h-8 rounded-lg" />
                      <div>
                        <div className="font-bold text-sm text-white flex items-center gap-1.5">
                          {user.nombre}
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                            user.rol === 'Admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {user.rol}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 truncate max-w-[170px]">{user.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Cambiar Mascota */}
                  <button
                    onClick={() => setCurrentView('mascot-selection')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Cambiar Mascota ({user.mascota})</span>
                  </button>

                  {/* Acceder al Perfil */}
                  <button
                    onClick={() => setCurrentView('profile')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-blue-400" />
                    <span>Mi Perfil y Estadísticas</span>
                  </button>

                  {/* Alternar a Admin si no está activo */}
                  {user.rol !== 'Admin' && (
                    <button
                      onClick={() => {
                        const adminUser = users.find(u => u.rol === 'Admin');
                        if (adminUser) switchUser(adminUser.id_usuario);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-amber-300 hover:bg-amber-950/40 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Cambiar a Rol Admin (RF-07)</span>
                    </button>
                  )}

                  {/* Alternar a Roni si está en admin */}
                  {user.rol === 'Admin' && (
                    <button
                      onClick={() => {
                        const roni = users.find(u => u.nombre === 'Roni');
                        if (roni) switchUser(roni.id_usuario);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-blue-300 hover:bg-blue-950/40 transition-colors"
                    >
                      <User className="w-4 h-4 text-blue-400" />
                      <span>Cambiar a Jugador (Roni)</span>
                    </button>
                  )}

                  <div className="border-t border-slate-800 my-1"></div>

                  {/* Iniciar sesión con otra cuenta */}
                  <button
                    onClick={onOpenAuth}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-slate-400" />
                    <span>Iniciar sesión / Registrarse</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentView(link.id)}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg ${
                  isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
