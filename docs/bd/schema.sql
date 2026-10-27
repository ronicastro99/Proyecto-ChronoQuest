
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NULL,
    proveedor_oauth VARCHAR(20) NOT NULL DEFAULT 'local',
    mascota VARCHAR(20) NOT NULL DEFAULT 'Cleo',
    puntos_totales INT DEFAULT 0,
    ratxa_actual INT DEFAULT 0,
    tokens INT DEFAULT 0,
    vides INT DEFAULT 5,
    rol VARCHAR(20) NOT NULL DEFAULT 'Jugador',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE eras_historicas (
    id_era INT AUTO_INCREMENT PRIMARY KEY,
    nombre_era VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT NULL
);

CREATE TABLE preguntas (
    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    id_era INT NOT NULL,
    enunciado TEXT NOT NULL,
    opcion_a VARCHAR(255) NOT NULL,
    opcion_b VARCHAR(255) NOT NULL,
    opcion_c VARCHAR(255) NOT NULL,
    opcion_d VARCHAR(255) NOT NULL,
    opcion_correcta CHAR(1) NOT NULL,
    dificultad VARCHAR(20) DEFAULT 'Normal',
    FOREIGN KEY (id_era) REFERENCES eras_historicas(id_era) ON DELETE CASCADE
);

CREATE TABLE respuestas_usuario (
    id_respuesta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_pregunta INT NOT NULL,
    opcion_elegida CHAR(1) NOT NULL,
    es_correcta BOOLEAN NOT NULL,
    fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_pregunta) REFERENCES preguntas(id_pregunta) ON DELETE CASCADE
);

CREATE TABLE transacciones_tienda (
    id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_operacion VARCHAR(50) NOT NULL,
    tokens_gastados INT NOT NULL,
    vides_obtenidas INT NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);