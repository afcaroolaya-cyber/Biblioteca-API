# API HTTP de Biblioteca
API construida con Node.js y TypeScript para gestionar libros en memoria.
## Requisitos- Node.js LTS- npm
## Instalación
```bash
npm install
```
## Desarrollo
```bash
npm run dev
```
## Verificación y compilación
```bash
npm run check
```
## Producción local
```bash
npm run build
npm start
```
## Endpoints
| Método | Ruta | Propósito | Códigos de estado posibles |
| --- | --- | --- | --- |
| **GET** | ``/api/health`` | Verificar estado del servidor | 200 OK |
| **GET** | ``/api/books`` | Listar libros (con filtros opcionales) | 200 OK, 400 VALIDATION_ERROR |
| **GET** | ``/api/books/:id`` | Obtener detalle de un libro por id | 200 OK, 400 VALIDATION_ERROR, 404 BOOK_NOT_FOUND |
| **POST** | ``/api/books`` | Crear un nuevo libro | 201 CREATED, 400 VALIDATION_ERROR |
| **PUT** | ``/api/books/:id`` | Actualizar libro completo | 200 OK, 400 VALIDATION_ERROR, 404 BOOK_NOT_FOUND |
| **PATCH** | ``/api/books/:id`` | Actualizar libro parcial | 200 OK, 400 VALIDATION_ERROR, 404 BOOK_NOT_FOUND |
| **DELETE** | ``/api/books/:id`` | Eliminar un libro | 200 OK, 400 VALIDATION_ERROR, 404 BOOK_NOT_FOUND |
## Ejemplos
GET
curl -i http://localhost:3000/api/books

POST
curl -i -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Domain-Driven Design","author":"Eric Evans","publicationYear":2003}'

PATCH
curl -i -X PATCH http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"available":false}'

DELETE
curl -i -X DELETE http://localhost:3000/api/books/1

## Limitaciones
Los datos se almacenan en memoria y se pierden al reiniciar el servidor.
## Autor
Jaider Andrés González Ovalle 