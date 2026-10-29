import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Usuario,
  EraHistorica,
  Pregunta,
  MascotaId,
  OpcionChar,
} from '../types/database';
import { Logro, ArticuloTienda } from '../types/game';
import { storage } from '../services/storageService';
import { sound } from '../services/soundService';
import confetti from 'canvas-confetti';

interface AnswerResult {
  isCorrect: boolean;
  pointsEarned: number;
  tokensEarned: number;
  newStreak: number;
  livesRemaining: number;
  explanation?: string;
  unlockedAchievements: Logro[];
}

export type ViewType = 'home' | 'quiz' | 'shop' | 'profile' | 'admin' | 'mascot-selection';

interface GameContextType {
  user: Usuario;
  users: Usuario[];
  eras: EraHistorica[];
  preguntas: Pregunta[];
  logros: Logro[];
  inventory: { escudo_racha: number; pista_5050: number; tiempo_extra: number };
  soundEnabled: boolean;
  currentView: ViewType;
  activeQuizEra: EraHistorica | null;
  activeShield: boolean;
  
  // Navigation & User Management
  setCurrentView: (view: ViewType) => void;
  startQuiz: (era: EraHistorica) => void;
  exitQuiz: () => void;
  toggleSound: () => void;
  setMascota: (mascota: MascotaId) => void;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  loginWithOAuth: (provider: 'google' | 'apple') => void;
  register: (nombre: string, email: string, pass: string, mascota?: MascotaId) => { success: boolean; error?: string };
  logout: () => void;
  switchUser: (id_usuario: number) => void;

  // Game Engine
  answerQuestion: (
    id_pregunta: number,
    opcion: OpcionChar,
    secondsRemaining: number
  ) => AnswerResult;
  usePowerUp: (type: 'pista_5050' | 'tiempo_extra' | 'escudo_racha') => boolean;

  // Shop & Economy
  buyShopItem: (item: ArticuloTienda) => { success: boolean; message: string };

  // Admin CRUD
  addQuestion: (q: Omit<Pregunta, 'id_pregunta'>) => void;
  updateQuestion: (q: Pregunta) => void;
  deleteQuestion: (id_pregunta: number) => void;
  resetQuestions: () => void;
  exportDatabaseSQL: () => string;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario>(() => storage.getUsuarioActual());
  const [users, setUsers] = useState<Usuario[]>(() => storage.getUsuarios());
  const [eras] = useState<EraHistorica[]>(() => storage.getEras());
  const [preguntas, setPreguntas] = useState<Pregunta[]>(() => storage.getPreguntas());
  const [logros, setLogros] = useState<Logro[]>(() => storage.getLogros());
  const [inventory, setInventory] = useState(() => storage.getInventory());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.isEnabled());
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activeQuizEra, setActiveQuizEra] = useState<EraHistorica | null>(null);
  const [activeShield, setActiveShield] = useState<boolean>(false);

  // Sync user updates to storage
  const updateUser = (updated: Usuario) => {
    setUser(updated);
    storage.saveUsuario(updated);
    setUsers(storage.getUsuarios());
  };

  const toggleSound = () => {
    const isNow = sound.toggle();
    setSoundEnabled(isNow);
  };

  const setMascota = (mascota: MascotaId) => {
    const updated = { ...user, mascota };
    updateUser(updated);
    sound.playClick();
  };

  const login = (email: string, pass: string) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: 'No existe una cuenta con este correo electrónico.' };
    }
    if (found.password_hash && found.password_hash !== pass) {
      return { success: false, error: 'Contraseña incorrecta.' };
    }
    storage.setUsuarioActual(found.id_usuario);
    setUser(found);
    sound.playCorrect();
    return { success: true };
  };

  const loginWithOAuth = (provider: 'google' | 'apple') => {
    const email = provider === 'google' ? 'roni.google@chronoquest.com' : 'roni.apple@chronoquest.com';
    let existing = users.find(u => u.email === email);
    if (!existing) {
      existing = {
        id_usuario: Date.now(),
        nombre: provider === 'google' ? 'Roni (Google)' : 'Roni (Apple)',
        email,
        password_hash: null,
        proveedor_oauth: provider,
        mascota: 'Cleo',
        puntos_totales: 100,
        ratxa_actual: 1,
        ratxa_maxima: 3,
        tokens: 50,
        vides: 5,
        rol: 'Jugador',
        fecha_registro: new Date().toISOString().replace('T', ' ').substring(0, 19),
      };
      storage.saveUsuario(existing);
      setUsers(storage.getUsuarios());
    }
    storage.setUsuarioActual(existing.id_usuario);
    setUser(existing);
    sound.playCorrect();
  };

  const register = (nombre: string, email: string, pass: string, mascota: MascotaId = 'Cleo') => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Este correo electrónico ya está registrado.' };
    }
    const nuevo: Usuario = {
      id_usuario: Date.now(),
      nombre,
      email,
      password_hash: pass,
      proveedor_oauth: 'local',
      mascota,
      puntos_totales: 0,
      ratxa_actual: 0,
      ratxa_maxima: 0,
      tokens: 25, // Bono de bienvenida
      vides: 5,
      rol: 'Jugador',
      fecha_registro: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    storage.saveUsuario(nuevo);
    storage.setUsuarioActual(nuevo.id_usuario);
    setUser(nuevo);
    setUsers(storage.getUsuarios());
    sound.playCorrect();
    return { success: true };
  };

  const logout = () => {
    const admin = users.find(u => u.rol === 'Jugador') || users[0];
    storage.setUsuarioActual(admin.id_usuario);
    setUser(admin);
    setCurrentView('home');
  };

  const switchUser = (id_usuario: number) => {
    const found = users.find(u => u.id_usuario === id_usuario);
    if (found) {
      storage.setUsuarioActual(found.id_usuario);
      setUser(found);
      sound.playClick();
    }
  };

  const startQuiz = (era: EraHistorica) => {
    if (user.vides <= 0) {
      sound.playWrong();
      setCurrentView('shop');
      return;
    }
    setActiveQuizEra(era);
    setCurrentView('quiz');
    sound.playClick();
  };

  const exitQuiz = () => {
    setActiveQuizEra(null);
    setCurrentView('home');
    sound.playClick();
  };

  // Check achievements unlocks
  const checkAchievements = (
    currentUser: Usuario,
    isCorrect: boolean,
    newStreak: number
  ): Logro[] => {
    const currentLogros = [...logros];
    const unlockedNow: Logro[] = [];
    const respuestas = storage.getRespuestas().filter(r => r.id_usuario === currentUser.id_usuario && r.es_correcta);

    currentLogros.forEach(logro => {
      if (logro.desbloqueado) return;

      let shouldUnlock = false;
      if (logro.id === 'primer_acierto' && isCorrect) {
        shouldUnlock = true;
      } else if (logro.id === 'racha_3' && newStreak >= 3) {
        shouldUnlock = true;
      } else if (logro.id === 'racha_5' && newStreak >= 5) {
        shouldUnlock = true;
      } else if (logro.id === 'racha_10' && newStreak >= 10) {
        shouldUnlock = true;
      } else if (logro.id === 'puntos_500' && currentUser.puntos_totales >= 500) {
        shouldUnlock = true;
      } else if (logro.id === 'completar_prehistoria') {
        const c = respuestas.filter(r => {
          const q = preguntas.find(p => p.id_pregunta === r.id_pregunta);
          return q?.id_era === 1;
        }).length;
        if (c >= 3) shouldUnlock = true;
      } else if (logro.id === 'completar_antigua') {
        const c = respuestas.filter(r => {
          const q = preguntas.find(p => p.id_pregunta === r.id_pregunta);
          return q?.id_era === 2;
        }).length;
        if (c >= 3) shouldUnlock = true;
      } else if (logro.id === 'completar_medieval') {
        const c = respuestas.filter(r => {
          const q = preguntas.find(p => p.id_pregunta === r.id_pregunta);
          return q?.id_era === 3;
        }).length;
        if (c >= 3) shouldUnlock = true;
      } else if (logro.id === 'completar_moderna') {
        const c = respuestas.filter(r => {
          const q = preguntas.find(p => p.id_pregunta === r.id_pregunta);
          return q?.id_era === 4;
        }).length;
        if (c >= 3) shouldUnlock = true;
      } else if (logro.id === 'completar_contemporanea') {
        const c = respuestas.filter(r => {
          const q = preguntas.find(p => p.id_pregunta === r.id_pregunta);
          return q?.id_era === 5;
        }).length;
        if (c >= 3) shouldUnlock = true;
      }

      if (shouldUnlock) {
        logro.desbloqueado = true;
        currentUser.tokens += logro.recompensaTokens;
        unlockedNow.push(logro);
      }
    });

    if (unlockedNow.length > 0) {
      storage.saveLogros(currentLogros);
      setLogros(currentLogros);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#3b82f6', '#10b981'],
      });
    }

    return unlockedNow;
  };

  const answerQuestion = (
    id_pregunta: number,
    opcion: OpcionChar,
    secondsRemaining: number
  ): AnswerResult => {
    const pregunta = preguntas.find(p => p.id_pregunta === id_pregunta);
    if (!pregunta) {
      throw new Error('Pregunta no encontrada');
    }

    const isCorrect = pregunta.opcion_correcta === opcion;

    // Guardar respuesta en la BD (RF-04 & schema.sql)
    storage.recordRespuesta(user.id_usuario, id_pregunta, opcion, isCorrect);

    let newStreak = user.ratxa_actual;
    let newLives = user.vides;
    let pointsEarned = 0;
    let tokensEarned = 0;

    if (isCorrect) {
      sound.playCorrect();
      newStreak += 1;
      // Puntos base por dificultad + bonificación de tiempo
      const basePoints = pregunta.dificultad === 'Difícil' ? 30 : pregunta.dificultad === 'Normal' ? 20 : 10;
      const speedBonus = Math.max(0, Math.floor(secondsRemaining / 2));
      const streakBonus = Math.min(newStreak * 2, 20);
      pointsEarned = basePoints + speedBonus + streakBonus;

      // Ganar tokens con las rachas (RF-05)
      if (newStreak >= 3 && newStreak % 2 === 1) {
        tokensEarned = 5 + Math.floor(newStreak / 2);
        sound.playCoin();
      }
    } else {
      if (activeShield) {
        // El escudo de racha absorbe la pérdida de racha
        setActiveShield(false);
        sound.playWrong();
      } else {
        newStreak = 0;
        newLives = Math.max(0, user.vides - 1);
        if (newLives === 0) {
          sound.playGameOver();
        } else {
          sound.playWrong();
        }
      }
    }

    const maxStreak = Math.max(user.ratxa_maxima || 0, newStreak);

    const updatedUser: Usuario = {
      ...user,
      ratxa_actual: newStreak,
      ratxa_maxima: maxStreak,
      vides: newLives,
      puntos_totales: user.puntos_totales + pointsEarned,
      tokens: user.tokens + tokensEarned,
    };

    const unlocked = checkAchievements(updatedUser, isCorrect, newStreak);
    updateUser(updatedUser);

    return {
      isCorrect,
      pointsEarned,
      tokensEarned,
      newStreak,
      livesRemaining: newLives,
      explanation: pregunta.explicacion,
      unlockedAchievements: unlocked,
    };
  };

  const usePowerUp = (type: 'pista_5050' | 'tiempo_extra' | 'escudo_racha'): boolean => {
    if (inventory[type] <= 0) return false;
    const nextInv = { ...inventory, [type]: inventory[type] - 1 };
    setInventory(nextInv);
    storage.saveInventory(nextInv);
    if (type === 'escudo_racha') {
      setActiveShield(true);
    }
    sound.playClick();
    return true;
  };

  const buyShopItem = (item: ArticuloTienda): { success: boolean; message: string } => {
    if (user.tokens < item.precioTokens) {
      sound.playWrong();
      return { success: false, message: `No tienes suficientes tokens. Necesitas ${item.precioTokens} 🪙.` };
    }

    let updatedUser = { ...user, tokens: user.tokens - item.precioTokens };

    if (item.videsOtorgadas > 0) {
      const newVides = Math.min(5, user.vides + item.videsOtorgadas);
      updatedUser.vides = newVides;
    }

    // Power-up inventory
    if (item.efectoEspecial && item.efectoEspecial !== 'pocion_vida') {
      const key = item.efectoEspecial as keyof typeof inventory;
      const nextInv = { ...inventory, [key]: (inventory[key] || 0) + 1 };
      setInventory(nextInv);
      storage.saveInventory(nextInv);
    }

    // Registrar en BD según transacciones_tienda (RF-05, schema.sql)
    storage.recordTransaccion(
      user.id_usuario,
      item.nombre,
      item.precioTokens,
      item.videsOtorgadas
    );

    // Desbloquear logro de primera compra si aplica
    const currentLogros = [...logros];
    const logroCompra = currentLogros.find(l => l.id === 'primera_compra');
    if (logroCompra && !logroCompra.desbloqueado) {
      logroCompra.desbloqueado = true;
      updatedUser.tokens += logroCompra.recompensaTokens;
      storage.saveLogros(currentLogros);
      setLogros(currentLogros);
    }

    updateUser(updatedUser);
    sound.playCoin();

    return {
      success: true,
      message: `¡Comprado con éxito! Has adquirido: ${item.nombre}.`,
    };
  };

  // Admin CRUD
  const addQuestion = (q: Omit<Pregunta, 'id_pregunta'>) => {
    const creada = storage.addPregunta(q);
    setPreguntas(storage.getPreguntas());
    sound.playClick();
  };

  const updateQuestion = (q: Pregunta) => {
    storage.updatePregunta(q);
    setPreguntas(storage.getPreguntas());
    sound.playClick();
  };

  const deleteQuestion = (id_pregunta: number) => {
    storage.deletePregunta(id_pregunta);
    setPreguntas(storage.getPreguntas());
    sound.playClick();
  };

  const resetQuestions = () => {
    const res = storage.resetPreguntas();
    setPreguntas(res);
    sound.playClick();
  };

  const exportDatabaseSQL = () => {
    return storage.exportDatabaseAsSQL();
  };

  return (
    <GameContext.Provider
      value={{
        user,
        users,
        eras,
        preguntas,
        logros,
        inventory,
        soundEnabled,
        currentView,
        activeQuizEra,
        activeShield,
        setCurrentView,
        startQuiz,
        exitQuiz,
        toggleSound,
        setMascota,
        login,
        loginWithOAuth,
        register,
        logout,
        switchUser,
        answerQuestion,
        usePowerUp,
        buyShopItem,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        resetQuestions,
        exportDatabaseSQL,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
