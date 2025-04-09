# Proyecto: Desarrollo de Plataforma para Campaña Publicitaria

Este proyecto ayuda a las empresas a conocer el impacto de las campañas publicitarias que han publicado. Permite el registro de nuevas campañas, la edición de campañas ya creadas, su eliminación y la consulta de campañas por estado: activa, pausada o finalizada.

La plataforma ofrece seguridad mediante roles y JWT para autenticar al usuario, permitiéndole o denegándole acciones según su rol.


## 📃 Tabla de Contenidos
- [Instalación de Instancia](#instalación-de-instancia)
  - [Visual Studio Code](#visual-studio-code)
  - [Git](#git)
  - [Node.js](#nodejs)
  - [Nginx](#nginx)
  - [Descripción de Endpoints](#descripción-de-endpoints)

## 🛠️ Instalación de Instancia

Para desarrollar y ejecutar este proyecto de forma local, se necesitan instalar las siguientes herramientas:

### 🔧 Visual Studio Code (VS Code)
- Descargar e instalar [Visual Studio Code](https://code.visualstudio.com/).

### 🧑‍💻 Git
- Descargar e instalar [Git](https://git-scm.com/).
- Verificar instalación con: 
  git --version
⚙️ Node.js
Descargar e instalar Node.js.

Verificar instalación con:
node -v
npm -v
🚀 Instalación de dependencias
Clonar el repositorio:
git clone <repositorio_url>
Instalar dependencias del proyecto:

npm install
💻 Ejecutar el Proyecto
Iniciar el servidor de desarrollo:
node app.js
Esto mostrará en la consola mensajes como:

Servidor corriendo en puerto 4000

Conexión a la base de datos exitosa

Modelo de usuario sincronizado

Modelo de campaña sincronizado

📚 Descripción de Endpoints
Auth - Registro y Login
1. Registro de Usuario
Método: POST
URL: http://localhost:4000/auth/register

Cuerpo (JSON):
{
  "username": "admin1",
  "password": "password123",
  "role": "super_admin"
}
2. Login de Usuario
Método: POST
URL: http://localhost:4000/auth/login

Cuerpo (JSON):
{
  "username": "admin1",
  "password": "password123"
}
Usuarios
3. Obtener Usuarios
Método: GET
URL: http://localhost:4000/auth/usuarios

Requiere Token en Header: Authorization: Bearer <token>
Campañas
4. Obtener Listado de Campañas
Método: GET
URL: http://localhost:4000/campaigns

5. Obtener Campañas por Estado
Método: GET

URL: http://localhost:4000/campaigns?status=activa

URL: http://localhost:4000/campaigns?status=pausada

URL: http://localhost:4000/campaigns?status=finalizada

6. Crear Campaña
Método: POST

URL: http://localhost:4000/campaigns

Cuerpo (JSON):
{
  "title": "Campaña de verano",
  "start_date": "2025-07-01",
  "end_date": "2025-07-31",
  "budget": 50000,
  "status": "activa"
}
7. Editar Campaña por ID
Método: PUT

URL: http://localhost:4000/campaigns/:id

Cuerpo (JSON):

{
  "title": "Campaña actualizada",
  "budget": 60000,
  "status": "pausada"
}
8. Eliminar Campaña por ID
Método: DELETE

URL: http://localhost:4000/campaigns/:id

Requiere Token en Header: Authorization: Bearer <token>

9. Obtener Dashboard de Campañas
Método: GET

URL: http://localhost:4000/campaigns/dashboard

Landing Page
10. Obtener Datos de la Landing Page por ID de Campaña
Método: GET

URL: http://localhost:4000/campaigns/landing/:campaign_id


📝 Notas
Seguridad: El proyecto usa JWT para la autenticación de usuarios. Asegúrate de obtener el token correcto para interactuar con la mayoría de los endpoints de las campañas.

Datos de ejemplo: En algunos endpoints, como la creación de campañas, se proporcionan ejemplos de cuerpos JSON. Asegúrate de reemplazar los valores con los adecuados según tu necesidad.

