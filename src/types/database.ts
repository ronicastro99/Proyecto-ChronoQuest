// Tipos de datos correspondientes al esquema SQL de ChronoQuest (docs/bd/schema.sql)

export type ProveedorOAuth = 'local' | 'google' | 'apple';
export type RolUsuario = 'Jugador' | 'Admin';
export type MascotaId = 'Cleo' | 'Alex';
export type OpcionChar = 'A' | 'B' | 'C' | 'D';
export type DificultadPregunta = 'Fácil' | 'Normal' | 'Difícil';

export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  password_hash?: string | null;
  proveedor_oauth: ProveedorOAuth;
  mascota: MascotaId;
  puntos_totales: number;
  ratxa_actual: number;
  ratxa_maxima?: number; // métrica agregada para logros
  tokens: number;
  vides: number; // por defecto 5 vidas (RF-05)
  rol: RolUsuario;
  fecha_registro: string;
}

export interface EraHistorica {
  id_era: number;
  nombre_era: string; // Prehistoria, Historia Antigua, Historia Medieval, Historia Moderna, Historia Contemporánea
  descripcion: string;
  epoca_rango?: string;
  imagen_url?: string;
  icono?: string;
  color_acento?: string;
}

export interface Pregunta {
  id_pregunta: number;
  id_era: number;
  enunciado: string;
  opcion_a: string;
  opcion_b: string;
  opcion_c: string;
  opcion_d: string;
  opcion_correcta: OpcionChar;
  dificultad: DificultadPregunta;
  explicacion?: string; // Dato curioso o histórico de feedback educativo
}

export interface RespuestaUsuario {
  id_respuesta: number;
  id_usuario: number;
  id_pregunta: number;
  opcion_elegida: OpcionChar;
  es_correcta: boolean;
  fecha_respuesta: string;
}

export interface TransaccionTienda {
  id_transaccion: number;
  id_usuario: number;
  tipo_operacion: string;
  tokens_gastados: number;
  vides_obtenidas: number;
  fecha_compra: string;
}
