import {
  Usuario,
  EraHistorica,
  Pregunta,
  RespuestaUsuario,
  TransaccionTienda,
} from '../types/database';
import { Logro } from '../types/game';
import { ERAS_DEFAULT } from '../data/defaultEras';
import { PREGUNTAS_DEFAULT } from '../data/defaultQuestions';
import { LOGROS_DEFAULT } from '../data/achievements';

const KEYS = {
  USUARIOS: 'chronoquest_usuarios',
  CURRENT_USER_ID: 'chronoquest_current_user_id',
  ERAS: 'chronoquest_eras',
  PREGUNTAS: 'chronoquest_preguntas',
  RESPUESTAS: 'chronoquest_respuestas',
  TRANSACCIONES: 'chronoquest_transacciones',
  LOGROS: 'chronoquest_logros',
  INVENTORY: 'chronoquest_inventory',
};

// Usuario inicial según el documento del alumno: "Roni"
const USUARIOS_INICIALES: Usuario[] = [
  {
    id_usuario: 1,
    nombre: 'Roni',
    email: 'roni@chronoquest.com',
    password_hash: '123456',
    proveedor_oauth: 'local',
    mascota: 'Cleo',
    puntos_totales: 180,
    ratxa_actual: 3,
    ratxa_maxima: 5,
    tokens: 95,
    vides: 5,
    rol: 'Jugador',
    fecha_registro: '2026-10-25 10:30:00',
  },
  {
    id_usuario: 2,
    nombre: 'Admin General',
    email: 'admin@chronoquest.com',
    password_hash: 'admin123',
    proveedor_oauth: 'local',
    mascota: 'Alex',
    puntos_totales: 850,
    ratxa_actual: 0,
    ratxa_maxima: 12,
    tokens: 420,
    vides: 5,
    rol: 'Admin',
    fecha_registro: '2026-10-01 08:00:00',
  },
];

class StorageService {
  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(KEYS.USUARIOS)) {
      localStorage.setItem(KEYS.USUARIOS, JSON.stringify(USUARIOS_INICIALES));
    }
    if (!localStorage.getItem(KEYS.CURRENT_USER_ID)) {
      localStorage.setItem(KEYS.CURRENT_USER_ID, '1'); // Inicia con Roni por defecto
    }
    if (!localStorage.getItem(KEYS.ERAS)) {
      localStorage.setItem(KEYS.ERAS, JSON.stringify(ERAS_DEFAULT));
    }
    if (!localStorage.getItem(KEYS.PREGUNTAS)) {
      localStorage.setItem(KEYS.PREGUNTAS, JSON.stringify(PREGUNTAS_DEFAULT));
    }
    if (!localStorage.getItem(KEYS.RESPUESTAS)) {
      // Respuestas iniciales de prueba para poblar estadísticas
      const respuestasIniciales: RespuestaUsuario[] = [
        { id_respuesta: 1, id_usuario: 1, id_pregunta: 1, opcion_elegida: 'B', es_correcta: true, fecha_respuesta: '2026-10-28 14:10:00' },
        { id_respuesta: 2, id_usuario: 1, id_pregunta: 6, opcion_elegida: 'C', es_correcta: true, fecha_respuesta: '2026-10-28 14:12:00' },
        { id_respuesta: 3, id_usuario: 1, id_pregunta: 16, opcion_elegida: 'A', es_correcta: true, fecha_respuesta: '2026-10-28 14:15:00' },
      ];
      localStorage.setItem(KEYS.RESPUESTAS, JSON.stringify(respuestasIniciales));
    }
    if (!localStorage.getItem(KEYS.TRANSACCIONES)) {
      const transaccionesIniciales: TransaccionTienda[] = [
        { id_transaccion: 1, id_usuario: 1, tipo_operacion: 'Poción de Vitalidad (+1 Vida)', tokens_gastados: 40, vides_obtenidas: 1, fecha_compra: '2026-10-28 14:20:00' }
      ];
      localStorage.setItem(KEYS.TRANSACCIONES, JSON.stringify(transaccionesIniciales));
    }
    if (!localStorage.getItem(KEYS.LOGROS)) {
      // Marcar primer logro como completado para Roni
      const logros = LOGROS_DEFAULT.map(l => l.id === 'primer_acierto' ? { ...l, desbloqueado: true, progresoActual: 1 } : l);
      localStorage.setItem(KEYS.LOGROS, JSON.stringify(logros));
    }
  }

  // --- USUARIOS ---
  public getUsuarios(): Usuario[] {
    const raw = localStorage.getItem(KEYS.USUARIOS);
    return raw ? JSON.parse(raw) : USUARIOS_INICIALES;
  }

  public getUsuarioActual(): Usuario {
    const currentId = Number(localStorage.getItem(KEYS.CURRENT_USER_ID) || 1);
    const usuarios = this.getUsuarios();
    return usuarios.find(u => u.id_usuario === currentId) || usuarios[0];
  }

  public setUsuarioActual(id_usuario: number) {
    localStorage.setItem(KEYS.CURRENT_USER_ID, String(id_usuario));
  }

  public saveUsuario(usuario: Usuario): Usuario {
    const usuarios = this.getUsuarios();
    const index = usuarios.findIndex(u => u.id_usuario === usuario.id_usuario);
    if (index >= 0) {
      usuarios[index] = usuario;
    } else {
      usuario.id_usuario = Date.now();
      usuarios.push(usuario);
    }
    localStorage.setItem(KEYS.USUARIOS, JSON.stringify(usuarios));
    return usuario;
  }

  // --- ERAS ---
  public getEras(): EraHistorica[] {
    const raw = localStorage.getItem(KEYS.ERAS);
    return raw ? JSON.parse(raw) : ERAS_DEFAULT;
  }

  // --- PREGUNTAS ---
  public getPreguntas(): Pregunta[] {
    const raw = localStorage.getItem(KEYS.PREGUNTAS);
    return raw ? JSON.parse(raw) : PREGUNTAS_DEFAULT;
  }

  public getPreguntasByEra(id_era: number): Pregunta[] {
    return this.getPreguntas().filter(p => p.id_era === id_era);
  }

  public addPregunta(nueva: Omit<Pregunta, 'id_pregunta'>): Pregunta {
    const preguntas = this.getPreguntas();
    const nuevoId = preguntas.length > 0 ? Math.max(...preguntas.map(p => p.id_pregunta)) + 1 : 1;
    const creada: Pregunta = { ...nueva, id_pregunta: nuevoId };
    preguntas.push(creada);
    localStorage.setItem(KEYS.PREGUNTAS, JSON.stringify(preguntas));
    return creada;
  }

  public updatePregunta(actualizada: Pregunta): Pregunta {
    const preguntas = this.getPreguntas();
    const index = preguntas.findIndex(p => p.id_pregunta === actualizada.id_pregunta);
    if (index >= 0) {
      preguntas[index] = actualizada;
      localStorage.setItem(KEYS.PREGUNTAS, JSON.stringify(preguntas));
    }
    return actualizada;
  }

  public deletePregunta(id_pregunta: number): boolean {
    let preguntas = this.getPreguntas();
    const lenBefore = preguntas.length;
    preguntas = preguntas.filter(p => p.id_pregunta !== id_pregunta);
    localStorage.setItem(KEYS.PREGUNTAS, JSON.stringify(preguntas));
    return preguntas.length < lenBefore;
  }

  public resetPreguntas(): Pregunta[] {
    localStorage.setItem(KEYS.PREGUNTAS, JSON.stringify(PREGUNTAS_DEFAULT));
    return PREGUNTAS_DEFAULT;
  }

  // --- RESPUESTAS USUARIO ---
  public getRespuestas(): RespuestaUsuario[] {
    const raw = localStorage.getItem(KEYS.RESPUESTAS);
    return raw ? JSON.parse(raw) : [];
  }

  public recordRespuesta(
    id_usuario: number,
    id_pregunta: number,
    opcion_elegida: 'A' | 'B' | 'C' | 'D',
    es_correcta: boolean
  ): RespuestaUsuario {
    const respuestas = this.getRespuestas();
    const nueva: RespuestaUsuario = {
      id_respuesta: Date.now(),
      id_usuario,
      id_pregunta,
      opcion_elegida,
      es_correcta,
      fecha_respuesta: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    respuestas.push(nueva);
    localStorage.setItem(KEYS.RESPUESTAS, JSON.stringify(respuestas));
    return nueva;
  }

  // --- TRANSACCIONES TIENDA ---
  public getTransacciones(id_usuario?: number): TransaccionTienda[] {
    const raw = localStorage.getItem(KEYS.TRANSACCIONES);
    const lista: TransaccionTienda[] = raw ? JSON.parse(raw) : [];
    if (id_usuario !== undefined) {
      return lista.filter(t => t.id_usuario === id_usuario);
    }
    return lista;
  }

  public recordTransaccion(
    id_usuario: number,
    tipo_operacion: string,
    tokens_gastados: number,
    vides_obtenidas: number
  ): TransaccionTienda {
    const transacciones = this.getTransacciones();
    const nueva: TransaccionTienda = {
      id_transaccion: Date.now(),
      id_usuario,
      tipo_operacion,
      tokens_gastados,
      vides_obtenidas,
      fecha_compra: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    transacciones.unshift(nueva);
    localStorage.setItem(KEYS.TRANSACCIONES, JSON.stringify(transacciones));
    return nueva;
  }

  // --- LOGROS ---
  public getLogros(): Logro[] {
    const raw = localStorage.getItem(KEYS.LOGROS);
    return raw ? JSON.parse(raw) : LOGROS_DEFAULT;
  }

  public saveLogros(logros: Logro[]) {
    localStorage.setItem(KEYS.LOGROS, JSON.stringify(logros));
  }

  // --- INVENTARIO / POWER-UPS ---
  public getInventory(): { escudo_racha: number; pista_5050: number; tiempo_extra: number } {
    const raw = localStorage.getItem(KEYS.INVENTORY);
    return raw ? JSON.parse(raw) : { escudo_racha: 0, pista_5050: 1, tiempo_extra: 1 };
  }

  public saveInventory(inv: { escudo_racha: number; pista_5050: number; tiempo_extra: number }) {
    localStorage.setItem(KEYS.INVENTORY, JSON.stringify(inv));
  }

  // --- EXPORTAR SQL (Para entrega académica y sincronización con MySQL) ---
  public exportDatabaseAsSQL(): string {
    const usuarios = this.getUsuarios();
    const eras = this.getEras();
    const preguntas = this.getPreguntas();
    const respuestas = this.getRespuestas();
    const transacciones = this.getTransacciones();

    let sql = `-- =========================================================\n`;
    sql += `-- DUMP DE DATOS CHRONOQUEST (Generado automáticamente)\n`;
    sql += `-- Compatible con MySQL / MariaDB (schema.sql)\n`;
    sql += `-- =========================================================\n\n`;

    // Eras
    sql += `-- Eras históricas\n`;
    eras.forEach(e => {
      sql += `INSERT INTO eras_historicas (id_era, nombre_era, descripcion) VALUES (${e.id_era}, '${e.nombre_era.replace(/'/g, "''")}', '${(e.descripcion || '').replace(/'/g, "''")}');\n`;
    });
    sql += `\n`;

    // Usuarios
    sql += `-- Usuarios\n`;
    usuarios.forEach(u => {
      sql += `INSERT INTO usuarios (id_usuario, nombre, email, password_hash, proveedor_oauth, mascota, puntos_totales, ratxa_actual, tokens, vides, rol, fecha_registro) VALUES (${u.id_usuario}, '${u.nombre.replace(/'/g, "''")}', '${u.email}', '${u.password_hash || ''}', '${u.proveedor_oauth}', '${u.mascota}', ${u.puntos_totales}, ${u.ratxa_actual}, ${u.tokens}, ${u.vides}, '${u.rol}', '${u.fecha_registro}');\n`;
    });
    sql += `\n`;

    // Preguntas
    sql += `-- Preguntas\n`;
    preguntas.forEach(p => {
      sql += `INSERT INTO preguntas (id_pregunta, id_era, enunciado, opcion_a, opcion_b, opcion_c, opcion_d, opcion_correcta, dificultad) VALUES (${p.id_pregunta}, ${p.id_era}, '${p.enunciado.replace(/'/g, "''")}', '${p.opcion_a.replace(/'/g, "''")}', '${p.opcion_b.replace(/'/g, "''")}', '${p.opcion_c.replace(/'/g, "''")}', '${p.opcion_d.replace(/'/g, "''")}', '${p.opcion_correcta}', '${p.dificultad}');\n`;
    });
    sql += `\n`;

    // Respuestas
    sql += `-- Respuestas de usuario\n`;
    respuestas.forEach(r => {
      sql += `INSERT INTO respuestas_usuario (id_respuesta, id_usuario, id_pregunta, opcion_elegida, es_correcta, fecha_respuesta) VALUES (${r.id_respuesta}, ${r.id_usuario}, ${r.id_pregunta}, '${r.opcion_elegida}', ${r.es_correcta ? 1 : 0}, '${r.fecha_respuesta}');\n`;
    });
    sql += `\n`;

    // Transacciones
    sql += `-- Transacciones de la tienda\n`;
    transacciones.forEach(t => {
      sql += `INSERT INTO transacciones_tienda (id_transaccion, id_usuario, tipo_operacion, tokens_gastados, vides_obtenidas, fecha_compra) VALUES (${t.id_transaccion}, ${t.id_usuario}, '${t.tipo_operacion.replace(/'/g, "''")}', ${t.tokens_gastados}, ${t.vides_obtenidas}, '${t.fecha_compra}');\n`;
    });

    return sql;
  }
}

export const storage = new StorageService();
