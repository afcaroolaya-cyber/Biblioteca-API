import express, { Request, Response } from 'express';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  available: boolean;
}

let books: Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    publicationYear: 2008,
    available: true
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt y David Thomas',
    publicationYear: 1999,
    available: false
  }
];

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    booksInMemory: books.length,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/books', (req: Request, res: Response): void => {
  const { author, available } = req.query;
  let filteredBooks = [...books];

  if (author) {
    const authorStr = String(author).toLowerCase();
    filteredBooks = filteredBooks.filter(b => b.author.toLowerCase().includes(authorStr));
  }

  if (available !== undefined) {
    const availableStr = String(available).toLowerCase();
    if (availableStr !== 'true' && availableStr !== 'false') {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'El filtro available solo acepta true o false'
      });
      return;
    }
    const isAvailable = availableStr === 'true';
    filteredBooks = filteredBooks.filter(b => b.available === isAvailable);
  }

  res.status(200).json({
    data: filteredBooks,
    total: filteredBooks.length
  });
});

app.get('/api/books/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const bookId = Number(id);

  if (isNaN(bookId) || !Number.isInteger(bookId) || bookId <= 0) {
    res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'El id debe ser un número entero positivo'
    });
    return;
  }

  const book = books.find(b => b.id === bookId);

  if (!book) {
    res.status(404).json({
      error: 'BOOK_NOT_FOUND',
      message: 'No existe un libro con el identificador solicitado'
    });
    return;
  }

  res.status(200).json({ data: book });
});

app.post('/api/books', (req: Request, res: Response): void => {
  const { title, author, publicationYear, available } = req.body;

  if (!title || !author || publicationYear === undefined) {
    res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Faltan campos obligatorios para crear el libro'
    });
    return;
  }

  const newBook: Book = {
    id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title: String(title),
    author: String(author),
    publicationYear: Number(publicationYear),
    available: available !== undefined ? Boolean(available) : true
  };

  books.push(newBook);
  res.status(201).json({ data: newBook });
});

app.patch('/api/books/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const bookId = Number(id);

  if (isNaN(bookId) || !Number.isInteger(bookId) || bookId <= 0) {
    res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'El id debe ser un número entero positivo'
    });
    return;
  }

  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    res.status(404).json({
      error: 'BOOK_NOT_FOUND',
      message: 'No existe un libro con el identificador solicitado'
    });
    return;
  }

  const { title, author, publicationYear, available } = req.body;

  books[index] = {
    ...books[index],
    ...(title && { title: String(title) }),
    ...(author && { author: String(author) }),
    ...(publicationYear !== undefined && { publicationYear: Number(publicationYear) }),
    ...(available !== undefined && { available: Boolean(available) })
  };

  res.status(200).json({ data: books[index] });
});

app.delete('/api/books/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const bookId = Number(id);

  if (isNaN(bookId) || !Number.isInteger(bookId) || bookId <= 0) {
    res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'El id debe ser un número entero positivo'
    });
    return;
  }

  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    res.status(404).json({
      error: 'BOOK_NOT_FOUND',
      message: 'No existe un libro con el identificador solicitado'
    });
    return;
  }

  const deletedBook = books.splice(index, 1)[0];
  res.status(200).json({ data: deletedBook });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});