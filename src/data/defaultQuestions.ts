import { Pregunta } from '../types/database';

export const PREGUNTAS_DEFAULT: Pregunta[] = [
  // --- ERA 1: PREHISTORIA (id_era: 1) ---
  {
    id_pregunta: 1,
    id_era: 1,
    enunciado: '¿Cuál de los siguientes descubrimientos marcó un punto de inflexión decisivo en el Paleolítico para la supervivencia humana?',
    opcion_a: 'La rueda de madera',
    opcion_b: 'El control y uso del fuego',
    opcion_c: 'La escritura cuneiforme',
    opcion_d: 'La forja del hierro',
    opcion_correcta: 'B',
    dificultad: 'Fácil',
    explicacion: 'El control del fuego permitió cocinar alimentos, ahuyentar depredadores y sobrevivir en climas gélidos.'
  },
  {
    id_pregunta: 2,
    id_era: 1,
    enunciado: '¿En qué cueva española se encuentran las famosas pinturas rupestres polícromas de bisontes conocidas como la "Capilla Sixtina del arte cuaternario"?',
    opcion_a: 'Cueva de Altamira',
    opcion_b: 'Cueva de Lascaux',
    opcion_c: 'Cueva del Sidrón',
    opcion_d: 'Cueva de Nerja',
    opcion_correcta: 'A',
    dificultad: 'Normal',
    explicacion: 'La Cueva de Altamira, en Cantabria, alberga bisontes y ciervos pintados con carbón y ocre con un realismo asombroso.'
  },
  {
    id_pregunta: 3,
    id_era: 1,
    enunciado: '¿Qué gran revolución en la historia humana trajo consigo la agricultura, la ganadería y el sedentarismo?',
    opcion_a: 'La Revolución Industrial',
    opcion_b: 'La Revolución Neolítica',
    opcion_c: 'La Revolución Urbana del Bronce',
    opcion_d: 'El periodo Mesolítico',
    opcion_correcta: 'B',
    dificultad: 'Fácil',
    explicacion: 'El Neolítico (hace unos 10.000 años) transformó a las sociedades cazadoras-recolectoras en agricultoras y sedentarias.'
  },
  {
    id_pregunta: 4,
    id_era: 1,
    enunciado: '¿Cuál fue el primer metal que los seres humanos aprendieron a fundir y moldear en la Prehistoria?',
    opcion_a: 'El Hierro',
    opcion_b: 'El Oro',
    opcion_c: 'El Cobre',
    opcion_d: 'El Bronce',
    opcion_correcta: 'C',
    dificultad: 'Normal',
    explicacion: 'La Edad del Cobre (Calcolítico) precedió a las aleaciones de bronce y al forjado del hierro.'
  },
  {
    id_pregunta: 5,
    id_era: 1,
    enunciado: '¿Cómo se denomina a los grandes monumentos prehistóricos formados por enormes bloques de piedra, como Stonehenge?',
    opcion_a: 'Zigurats',
    opcion_b: 'Pirámides',
    opcion_c: 'Megalitos',
    opcion_d: 'Mastabas',
    opcion_correcta: 'C',
    dificultad: 'Normal',
    explicacion: 'Los megalitos (menhires, dólmenes y crómlechs) eran estructuras funerarias y ceremoniales en Europa.'
  },

  // --- ERA 2: HISTORIA ANTIGUA (id_era: 2) ---
  {
    id_pregunta: 6,
    id_era: 2,
    enunciado: '¿Cuál fue la última faraona de la dinastía ptolemaica del Antiguo Egipto, célebre por su inteligencia y diplomacia?',
    opcion_a: 'Hatshepsut',
    opcion_b: 'Nefertiti',
    opcion_c: 'Cleopatra VII',
    opcion_d: 'Nitocris',
    opcion_correcta: 'C',
    dificultad: 'Fácil',
    explicacion: 'Cleopatra VII gobernó Egipto y habló múltiples idiomas, forjando alianzas con Julio César y Marco Antonio.'
  },
  {
    id_pregunta: 7,
    id_era: 2,
    enunciado: '¿Qué célebre rey de Macedonia conquistó el Imperio Persa y fundó un vasto imperio que se extendió hasta la India?',
    opcion_a: 'Filipo II',
    opcion_b: 'Alejandro Magno',
    opcion_c: 'Leónidas de Esparta',
    opcion_d: 'Pericles',
    opcion_correcta: 'B',
    dificultad: 'Fácil',
    explicacion: 'Alejandro Magno fue educado por Aristóteles y creó uno de los imperios más extensos de la antigüedad antes de morir a los 32 años.'
  },
  {
    id_pregunta: 8,
    id_era: 2,
    enunciado: '¿En qué año se produjo la tradicional caída del Imperio Romano de Occidente con la deposición de Rómulo Augústulo?',
    opcion_a: '313 d.C.',
    opcion_b: '476 d.C.',
    opcion_c: '800 d.C.',
    opcion_d: '1453 d.C.',
    opcion_correcta: 'B',
    dificultad: 'Normal',
    explicacion: 'El año 476 d.C. marca convencionalmente el final de la Edad Antigua y el inicio de la Edad Media.'
  },
  {
    id_pregunta: 9,
    id_era: 2,
    enunciado: '¿Qué polis griega fue la cuna de la democracia y del florecimiento de la filosofía con Sócrates y Platón?',
    opcion_a: 'Esparta',
    opcion_b: 'Corinto',
    opcion_c: 'Tebas',
    opcion_d: 'Atenas',
    opcion_correcta: 'D',
    dificultad: 'Fácil',
    explicacion: 'Atenas consolidó el sistema democrático durante el Siglo de Pericles en el siglo V a.C.'
  },
  {
    id_pregunta: 10,
    id_era: 2,
    enunciado: '¿Qué conjunto de leyes babilónicas talladas en una estela de diorita es uno de los códigos jurídicos más antiguos conservados?',
    opcion_a: 'Código de Hammurabi',
    opcion_b: 'Ley de las Doce Tablas',
    opcion_c: 'Código de Justiniano',
    opcion_d: 'Leyes de Solón',
    opcion_correcta: 'A',
    dificultad: 'Normal',
    explicacion: 'El Código de Hammurabi es conocido por formular el principio de reciprocidad penal: "ojo por ojo, diente por diente".'
  },

  // --- ERA 3: HISTORIA MEDIEVAL (id_era: 3) ---
  {
    id_pregunta: 11,
    id_era: 3,
    enunciado: '¿En qué batalla decisiva del año 732 Carlos Martel frenó el avance de las fuerzas omeyas en Europa occidental?',
    opcion_a: 'Batalla de Covadonga',
    opcion_b: 'Batalla de Hastings',
    opcion_c: 'Batalla de Poitiers (Tours)',
    opcion_d: 'Batalla de las Navas de Tolosa',
    opcion_correcta: 'C',
    dificultad: 'Normal',
    explicacion: 'La Batalla de Poitiers en 732 detuvo la expansión del Califato Omeya al norte de los Pirineos.'
  },
  {
    id_pregunta: 12,
    id_era: 3,
    enunciado: '¿Qué tremenda epidemia asoló Europa a mediados del siglo XIV (1347-1351) reduciendo notablemente la población del continente?',
    opcion_a: 'La Gripe Española',
    opcion_b: 'La Peste Negra',
    opcion_c: 'El Cólera de Londres',
    opcion_d: 'La Viruela Mayor',
    opcion_correcta: 'B',
    dificultad: 'Fácil',
    explicacion: 'La Peste Negra, transmitida por pulgas de ratas negras portadoras de Yersinia pestis, diezmó entre un 30% y un 60% de los habitantes.'
  },
  {
    id_pregunta: 13,
    id_era: 3,
    enunciado: '¿Qué conflicto militar enfrentó a las dinastías gobernantes de Inglaterra y Francia entre 1337 y 1453?',
    opcion_a: 'La Guerra de los Treinta Años',
    opcion_b: 'La Guerra de las Dos Rosas',
    opcion_c: 'La Guerra de los Cien Años',
    opcion_d: 'La Cruzada Albigense',
    opcion_correcta: 'C',
    dificultad: 'Fácil',
    explicacion: 'Duró en realidad 116 años y destacó por figuras legendarias como Juana de Arco.'
  },
  {
    id_pregunta: 14,
    id_era: 3,
    enunciado: '¿Qué monarca carolingio fue coronado emperador por el Papa León III en Roma en la Navidad del año 800?',
    opcion_a: 'Pipino el Breve',
    opcion_b: 'Carlomagno',
    opcion_c: 'Otón I el Grande',
    opcion_d: 'Luis el Piadoso',
    opcion_correcta: 'B',
    dificultad: 'Normal',
    explicacion: 'Carlomagno restauró la idea imperial en Europa Occidental con el Imperio Carolingio.'
  },
  {
    id_pregunta: 15,
    id_era: 3,
    enunciado: '¿Qué hito en el año 1453 suele considerarse como el fin formal de la Edad Media?',
    opcion_a: 'La invención del telescopio',
    opcion_b: 'La caída de Constantinopla en manos del Imperio Otomano',
    opcion_c: 'El Tratado de Tordesillas',
    opcion_d: 'La coronación de Enrique VIII',
    opcion_correcta: 'B',
    dificultad: 'Difícil',
    explicacion: 'La toma de Constantinopla por Mehmed II provocó la migración de sabios griegos a Italia, acelerando el Renacimiento.'
  },

  // --- ERA 4: HISTORIA MODERNA (id_era: 4) ---
  {
    id_pregunta: 16,
    id_era: 4,
    enunciado: '¿En qué año llegó Cristóbal Colón al continente americano según la historiografía oficial?',
    opcion_a: '1492',
    opcion_b: '1450',
    opcion_c: '1789',
    opcion_d: '476',
    opcion_correcta: 'A',
    dificultad: 'Fácil',
    explicacion: 'El 12 de octubre de 1492 la expedición comandada por Colón desembarcó en la isla de Guanahaní.'
  },
  {
    id_pregunta: 17,
    id_era: 4,
    enunciado: '¿Quién inventó la imprenta de tipos móviles metálicos en Europa hacia mediados del siglo XV?',
    opcion_a: 'Leonardo da Vinci',
    opcion_b: 'Johannes Gutenberg',
    opcion_c: 'Erasmo de Róterdam',
    opcion_d: 'Galileo Galilei',
    opcion_correcta: 'B',
    dificultad: 'Fácil',
    explicacion: 'Gutenberg revolucionó la difusión del conocimiento y la imprenta masiva de libros, comenzando por la Biblia de 42 líneas.'
  },
  {
    id_pregunta: 18,
    id_era: 4,
    enunciado: '¿Qué monje agustino clavó sus 95 tesis en Wittenberg en 1517, iniciando la Reforma Protestante?',
    opcion_a: 'Martín Lutero',
    opcion_b: 'Juan Calvino',
    opcion_c: 'Tomás Moro',
    opcion_d: 'Ulrico Zuinglio',
    opcion_correcta: 'A',
    dificultad: 'Normal',
    explicacion: 'Lutero cuestionó la venta de indulgencias y la autoridad papal, transformando el mapa religioso europeo.'
  },
  {
    id_pregunta: 19,
    id_era: 4,
    enunciado: '¿Qué astrónomo renacentista formuló el modelo heliocéntrico del sistema solar en su obra "De revolutionibus orbium coelestium"?',
    opcion_a: 'Johannes Kepler',
    opcion_b: 'Nicolás Copérnico',
    opcion_c: 'Tycho Brahe',
    opcion_d: 'Isaac Newton',
    opcion_correcta: 'B',
    dificultad: 'Normal',
    explicacion: 'Copérnico propuso que la Tierra y los demás planetas giran alrededor del Sol.'
  },
  {
    id_pregunta: 20,
    id_era: 4,
    enunciado: '¿Qué célebre monarca francés fue conocido como el "Rey Sol" y personificó la cumbre de la monarquía absoluta?',
    opcion_a: 'Luis XIV',
    opcion_b: 'Luis XVI',
    opcion_c: 'Felipe II',
    opcion_d: 'Carlos V',
    opcion_correcta: 'A',
    dificultad: 'Normal',
    explicacion: 'Luis XIV mandó construir el Palacio de Versalles y acuñó la célebre frase: "L\'État, c\'est moi" (El Estado soy yo).'
  },

  // --- ERA 5: HISTORIA CONTEMPORÁNEA (id_era: 5) ---
  {
    id_pregunta: 21,
    id_era: 5,
    enunciado: '¿En qué año estalló la Revolución Francesa con la simbólica Toma de la Bastilla el 14 de julio?',
    opcion_a: '1776',
    opcion_b: '1789',
    opcion_c: '1804',
    opcion_d: '1815',
    opcion_correcta: 'B',
    dificultad: 'Fácil',
    explicacion: 'En 1789 se proclamó la Declaración de los Derechos del Hombre y del Ciudadano con los ideales de Libertad, Igualdad y Fraternidad.'
  },
  {
    id_pregunta: 22,
    id_era: 5,
    enunciado: '¿Qué científico británico desarrolló la máquina de vapor moderna que impulsó de forma definitiva la Revolución Industrial?',
    opcion_a: 'James Watt',
    opcion_b: 'Thomas Newcomen',
    opcion_c: 'Michael Faraday',
    opcion_d: 'George Stephenson',
    opcion_correcta: 'A',
    dificultad: 'Normal',
    explicacion: 'Las mejoras de James Watt con el condensador separado multiplicaron la eficiencia de las máquinas térmicas.'
  },
  {
    id_pregunta: 23,
    id_era: 5,
    enunciado: '¿Qué acontecimiento en Sarajevo desencadenó el inicio de la Primera Guerra Mundial en el verano de 1914?',
    opcion_a: 'El hundimiento del RMS Lusitania',
    opcion_b: 'El asesinato del archiduque Francisco Fernando',
    opcion_c: 'La invasión de Polonia',
    opcion_d: 'El Tratado de Versalles',
    opcion_correcta: 'B',
    dificultad: 'Fácil',
    explicacion: 'El asesinato del heredero del Imperio Austrohúngaro activó el complejo sistema de alianzas europeas.'
  },
  {
    id_pregunta: 24,
    id_era: 5,
    enunciado: '¿En qué año pisó el ser humano la Luna por primera vez durante la misión Apolo 11 comandada por Neil Armstrong?',
    opcion_a: '1961',
    opcion_b: '1969',
    opcion_c: '1972',
    opcion_d: '1959',
    opcion_correcta: 'B',
    dificultad: 'Fácil',
    explicacion: 'El 20 de julio de 1969 Neil Armstrong pronunció: "Un pequeño paso para el hombre, un gran salto para la humanidad".'
  },
  {
    id_pregunta: 25,
    id_era: 5,
    enunciado: '¿Qué trascendental suceso pacífico en noviembre de 1989 simbolizó el declive del Bloque del Este y el final de la Guerra Fría?',
    opcion_a: 'La caída del Muro de Berlín',
    opcion_b: 'La crisis de los misiles en Cuba',
    opcion_c: 'La Primavera de Praga',
    opcion_d: 'La firma del Pacto de Varsovia',
    opcion_correcta: 'A',
    dificultad: 'Fácil',
    explicacion: 'La caída del Muro de Berlín allanó el camino para la reunificación de Alemania y la disolución de la Unión Soviética.'
  }
];
