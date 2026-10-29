import { MascotaId } from './database';

export interface Logro {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  desbloqueado: boolean;
  progresoActual?: number;
  progresoObjetivo?: number;
  recompensaTokens: number;
}

export interface ArticuloTienda {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  precioTokens: number;
  videsOtorgadas: number;
  efectoEspecial?: 'escudo_racha' | 'pista_5050' | 'tiempo_extra' | 'pocion_vida';
  popular?: boolean;
}

export interface DialogoMascota {
  mascota: MascotaId;
  estado: 'bienvenida' | 'acierto' | 'error' | 'racha' | 'sin_vidas' | 'victoria_era' | 'tienda';
  texto: string;
}

export interface EstadisticasEra {
  id_era: number;
  nombre_era: string;
  totalRespondidas: number;
  aciertos: number;
  porcentajeAcierto: number;
}
