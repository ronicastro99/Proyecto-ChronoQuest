import { EraHistorica } from '../types/database';

export const ERAS_DEFAULT: EraHistorica[] = [
  {
    id_era: 1,
    nombre_era: 'Prehistoria',
    descripcion: 'Desde el origen de los primeros homínidos y el dominio del fuego hasta las pinturas rupestres y la invención de la rueda.',
    epoca_rango: '2.500.000 a.C. - 3.500 a.C.',
    icono: 'Flame',
    color_acento: 'from-amber-600 to-orange-800',
  },
  {
    id_era: 2,
    nombre_era: 'Historia Antigua',
    descripcion: 'El esplendor del Nilo, las pirámides, la filosofía en la Grecia clásica y las legiones del Imperio Romano.',
    epoca_rango: '3.500 a.C. - 476 d.C.',
    icono: 'Pyramid',
    color_acento: 'from-yellow-500 to-amber-700',
  },
  {
    id_era: 3,
    nombre_era: 'Historia Medieval',
    descripcion: 'Castillos imponentes, caballeros andantes, órdenes monásticas, cruzadas y la era de los grandes gremios.',
    epoca_rango: '476 d.C. - 1492 d.C.',
    icono: 'Shield',
    color_acento: 'from-blue-600 to-indigo-900',
  },
  {
    id_era: 4,
    nombre_era: 'Historia Moderna',
    descripcion: 'Las carabelas y nuevos mundos, el arte del Renacimiento, la imprenta de Gutenberg y la era de la Ilustración.',
    epoca_rango: '1492 d.C. - 1789 d.C.',
    icono: 'Compass',
    color_acento: 'from-purple-600 to-violet-950',
  },
  {
    id_era: 5,
    nombre_era: 'Historia Contemporánea',
    descripcion: 'Las revoluciones industriales, el vapor y la electricidad, las grandes contiendas mundiales y la conquista del espacio.',
    epoca_rango: '1789 d.C. - Presente',
    icono: 'Globe2',
    color_acento: 'from-emerald-600 to-teal-900',
  },
];
