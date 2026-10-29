# ChronoQuest - Plataforma Web Gamificada de Historia

> **Proyecto:** MP0492 Proyecto  
> **Autor:** Ronnye Castro  
> **Repositorio:** [https://github.com/ronicastro99/Proyecto-ChronoQuest.git](https://github.com/ronicastro99/Proyecto-ChronoQuest.git)  
> **Stack:** React 18, Vite, TypeScript, Tailwind CSS, Web Audio API, Lucide Icons, Canvas-Confetti

---

## 🏛️ Descripción del Proyecto
**ChronoQuest** es una aplicación web gamificada orientada al aprendizaje de la historia universal inspirada en el formato ágil y adictivo de **Duolingo**. Los usuarios viajan a través de 5 grandes épocas históricas resolviendo cuestionarios interactivos de opción múltiple, manteniendo rachas de aciertos, ganando tokens, gestionando sus vidas y desbloqueando logros históricos.

---

## 🎯 Trazabilidad de Requisitos Funcionales (RF)

| Requisito | Descripción | Implementación en la Web |
| :--- | :--- | :--- |
| **RF-01** | Alta e inicio de sesión tradicional y con OAuth | Formulario de autenticación por email/contraseña, y botones integrados para **Google OAuth 2.0** y **Apple Sign-In**. Incluye selector rápido para alternar entre usuario *Jugador* (Roni) y *Admin*. |
| **RF-02** | Selección de personaje / mascota | Pantalla interactiva *"Elige a tu personaje"* entre **Cleo** (Cleopatra, la más sabia de todo Egipto) y **Alex** (Alejandro Magno, el más valiente de Macedonia). Las mascotas reaccionan con diálogos y consejos en cada pantalla y durante el quiz. |
| **RF-03** | Cinco apartados temáticos (Eras históricas) | Navegación por las 5 eras: **Prehistoria**, **Historia Antigua**, **Historia Medieval**, **Historia Moderna** e **Historia Contemporánea**, con tarjetas temáticas ilustradas y métricas de progreso. |
| **RF-04** | Motor de preguntas de opción múltiple y rachas | Cuestionario interactivo (A, B, C, D) con temporizador de 30s, cálculo de puntos EXP, racha de aciertos (**🔥**), soporte de comodines (Papiro 50/50, Reloj +15s, Escudo de falange) y explicaciones históricas didácticas. |
| **RF-05** | Economía de tokens y compra de vidas | Tienda/Bazar donde los tokens ganados con rachas se canjean por vidas extras (**❤️ 1 a 5 vidas**), elixires y comodines. Registro de operaciones en la tabla `transacciones_tienda`. |
| **RF-06** | Consulta de desempeño, estadísticas y logros | Perfil con métricas de precisión global (%), racha récord, desglose de aciertos por cada era histórica, catálogo de insignias/logros y visor del historial de respuestas (`respuestas_usuario`). |
| **RF-07** | Panel de administración de contenidos | Panel Admin con filtros por era y dificultad, búsqueda, CRUD completo de preguntas (Crear, Editar, Eliminar), botón de restauración y **exportador SQL** compatible con `docs/bd/schema.sql`. |

---

## 🎨 Decisiones de Diseño y Experiencia de Usuario (UX/UI)

1. **Estética Histórico-Mítica Refinada:**
   - Paleta cromática profunda basada en el prototipo Penpot: azules oscuros y medianoche (`#080d1a`, `#0f172a`), dorados imperiales (`#f59e0b`, `#fbbf24`), y acentos vibrantes por era histórica.
   - Tipografía épica ceremonial (`Cinzel`) combinada con una tipografía sans-serif moderna de alta legibilidad (`Plus Jakarta Sans`).
2. **Sensación Gamificada Fluida (Estilo Duolingo):**
   - **Sintetizador Web Audio API nativo:** Efectos de sonido generados en tiempo real para aciertos (acorde mayor C-E-G), fallos (tono descendente), rachas (armónicos crecientes), monedas (ping de token) y fanfarria de victoria con confeti animado.
   - **Mascotas vivas:** Ilustraciones vectoriales detalladas con expresiones variables (alegre, pensativa, celebrando o animando ante un error) y bocadillos de diálogo interactivos.
   - **Feedback pedagógico inmediato:** Al responder, no solo se indica si es correcto o incorrecto, sino que se despliega una tarjeta con el contexto histórico real del acontecimiento.
3. **100% Responsive y Accesible:**
   - Interfaz perfectamente optimizada tanto para smartphones (menú inferior táctil, botones de respuesta adaptados al pulgar) como para tabletas y monitores de escritorio.
   - Botón accesible para silenciar/activar el sonido en cualquier momento desde la barra superior.

---

## 🗄️ Modelo de Base de Datos y Persistencia

La aplicación implementa fielmente las 5 tablas del esquema de base de datos relacional definido en `docs/bd/schema.sql`:
- `usuarios`: Gestión de perfiles, contraseñas, proveedores OAuth, mascota activa, puntos, vidas y tokens.
- `eras_historicas`: Catálogo de las 5 eras temáticas con descripciones cronológicas.
- `preguntas`: Banco de preguntas de opción múltiple vinculadas por clave foránea a cada era.
- `respuestas_usuario`: Registro detallado de cada intento para análisis estadístico de aciertos/fallos.
- `transacciones_tienda`: Auditoría de consumo de tokens y adquisición de vidas en el bazar.

> 💡 **Exportación SQL automática:** En el *Panel de Administración* se dispone de la opción *"Exportar SQL"*, que genera las sentencias `INSERT INTO` exactas correspondientes a las tablas de `schema.sql` para su importación directa en MySQL/MariaDB.

---

## 🚀 Puesta en Marcha (Desarrollo y Producción)

### Requisitos previos
- Node.js (v18 o superior)
- npm (v9 o superior)

### Ejecutar en modo desarrollo
```bash
# Instalar dependencias (si no se han instalado)
npm install

# Iniciar servidor de desarrollo Vite con Hot Reload
npm run dev
```
La aplicación estará disponible de inmediato en: `http://localhost:5173`

### Compilar para producción
```bash
npm run build
```
Genera la carpeta optimizada y minificada `dist/` lista para ser desplegada en cualquier hosting estático (Vercel, Netlify, GitHub Pages, Apache, Nginx).

### Previsualizar la versión de producción
```bash
npm run preview
```
