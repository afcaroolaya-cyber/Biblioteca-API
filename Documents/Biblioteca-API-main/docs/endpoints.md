# Contratos de la API Biblioteca

| Método | Ruta               | Descripción                       | Parámetros / Body | Respuestas posibles |
|--------|--------------------|-----------------------------------|------------------|---------------------|
| GET    | /api/health        | Verifica estado del servidor      | -                | 200                 |
| GET    | /api/books         | Lista libros con filtros          | ?author, ?available | 200, 400          |
| GET    | /api/books/:bookId | Obtiene detalle de un libro       | bookId (path)    | 200, 400, 404       |
| POST   | /api/books         | Crea un nuevo libro               | JSON body: {title, author, publicationYear, available?} | 201, 400 |
| PUT    | /api/books/:bookId | Actualiza un libro existente      | bookId (path), JSON body parcial | 200, 400, 404 |
| DELETE | /api/books/:bookId | Elimina un libro existente        | bookId (path)    | 200, 400, 404       |