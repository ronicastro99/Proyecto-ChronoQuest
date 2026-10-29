import { MascotaId } from '../types/database';

export interface MascotaInfo {
  id: MascotaId;
  nombre: string;
  titulo: string;
  origen: string;
  descripcion: string;
  color: string;
  avatarBg: string;
}

export const MASCOTAS: Record<MascotaId, MascotaInfo> = {
  Cleo: {
    id: 'Cleo',
    nombre: 'Cleo',
    titulo: 'La más sabia de todo Egipto',
    origen: 'Reino Ptolemaico de Egipto',
    descripcion: 'Gobernante perspicaz, políglota y estratega diplomática. Te guiará con paciencia y sabiduría a través de los anales del tiempo.',
    color: '#eab308', // gold
    avatarBg: 'bg-gradient-to-br from-amber-400 to-yellow-600',
  },
  Alex: {
    id: 'Alex',
    nombre: 'Alejandro',
    titulo: 'El más valiente del Reino de Macedonia',
    origen: 'Imperio Macedonio',
    descripcion: 'Audaz general invicto y pupilo de Aristóteles. Te motivará a superar cada desafío con determinación y espíritu de victoria.',
    color: '#3b82f6', // blue
    avatarBg: 'bg-gradient-to-br from-blue-500 to-indigo-700',
  },
};

export const OBTENER_DIALOGO_MASCOTA = (
  mascota: MascotaId,
  situacion: 'bienvenida' | 'acierto' | 'error' | 'racha' | 'sin_vidas' | 'victoria' | 'tienda'
): string => {
  const dialogos: Record<MascotaId, Record<string, string[]>> = {
    Cleo: {
      bienvenida: [
        '¡Saludos, viajero! La sabiduría del Nilo ilumina tu camino en ChronoQuest.',
        '¿Listo para desentrañar los secretos que los siglos han guardado?',
        'El conocimiento es el mayor tesoro. ¡Comencemos nuestra expedición!',
      ],
      acierto: [
        '¡Brillante deducción! Ni los sabios de la Biblioteca de Alejandría lo dirían mejor.',
        '¡Por Isis y Osiris, tu respuesta ha sido impecable!',
        '¡Exacto! El conocimiento histórico florece en tu mente.',
      ],
      error: [
        'Incluso los faraones tuvieron que aprender. ¡Analiza y volveremos más fuertes!',
        'Un tropiezo no empaña tu destino. ¡Respira y mantén la concentración!',
        'No te desanimes; hasta el templo de Karnak se construyó piedra a piedra.',
      ],
      racha: [
        '¡Tu racha resplandece como el sol sobre las pirámides de Guiza!',
        '¡Imparable! Tienes la agudeza mental de los grandes monarcas.',
        '¡Racha en llamas! Los dioses bendicen tu constancia.',
      ],
      sin_vidas: [
        'Tus energías se han agotado, noble explorador. Visita la tienda de tokens para restaurar vidas.',
        'Necesitas descansar o beber un elixir en la tienda para continuar.',
      ],
      victoria: [
        '¡Victoria gloriosa! Has dominado esta era con elegancia insuperable.',
        '¡Fabuloso! Tu nombre quedará grabado en los jeroglíficos dorados.',
      ],
      tienda: [
        'Bienvenido al bazar histórico. Canjea tus tokens sabiamente por vidas o ventajas.',
      ],
    },
    Alex: {
      bienvenida: [
        '¡Saludos, camarada! El mundo no se conquistó dudando, ¡vamos a por todas!',
        '¡Ponte tu armadura del saber! Hoy conquistaremos otra página de la historia.',
        'No hay montaña que no podamos escalar si tenemos el valor de intentarlo.',
      ],
      acierto: [
        '¡Un golpe certero digno de la falange macedonia! ¡Excelente!',
        '¡Victoria táctica! Sabía que tenías madera de líder invicto.',
        '¡Bravo! Tu memoria es más rápida que Bucéfalo al galope.',
      ],
      error: [
        '¡Mantén la guardia alta! Un guerrero aprende de cada estocada fallida.',
        'No nos rendimos jamás. ¡Reorganiza tus ideas y vuelve a la carga!',
        'Los contratiempos forjan a los campeones. ¡La próxima será nuestra!',
      ],
      racha: [
        '¡Avanzamos arrollando como en la Batalla de Gaugamela! ¡Sigue así!',
        '¡Fuerza y determinación! Esta racha nadie la detendrá.',
        '¡Impresionante racha! El Olimpo entero celebra tu marcha triunfal.',
      ],
      sin_vidas: [
        '¡Caímos en combate, camarada! Necesitamos pócimas de la tienda para volver a la batalla.',
        'Nuestras defensas han cedido. ¡Reabastécete en la tienda y regresa al frente!',
      ],
      victoria: [
        '¡El territorio ha sido conquistado! Tu audacia y conocimiento no tienen rival.',
        '¡Triunfo total! Un paso más cerca del dominio absoluto del tiempo.',
      ],
      tienda: [
        '¡Reabastécete aquí para la siguiente campaña militar! Las vidas son tu escudo.',
      ],
    },
  };

  const lista = dialogos[mascota][situacion] || ['¡Sigamos adelante!'];
  return lista[Math.floor(Math.random() * lista.length)];
};
