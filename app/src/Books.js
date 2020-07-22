import React from 'react';

const isDev = process.env.NODE_ENV === 'development';
const booksEndpoint = `${isDev ? '' : '/api'}/browse/Books`;

function renderBooks(books) {
  return books.map((book, index) => {
    return (
      <div key={book.title + index}>
        <h6>{book.title}</h6>
        <ul style={{ marginLeft: '20px' }}>
          <li>Price: {book.price}$</li>
          <li>Stock: {book.stock}</li>
        </ul>
      </div>
    );
  });
}

async function fetchBooks() {
  const response = await fetch(booksEndpoint);
  const books = await response.json();
  return books.value;
}

async function submitBook({ title, price, stock }) {
  const response = await fetch(booksEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;IEEE754Compatible=true',
    },
    body: JSON.stringify({
      ID: Math.floor(Math.random() * 9999),
      descr: '',
      price: String(price),
      stock,
      title,
    }),
  });

  const newBook = await response.json();
  return newBook;
}

function Books() {
  const [books, setBooks] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(19.99);
  const [stock, setStock] = React.useState(400);

  React.useEffect(() => {
    async function updateBooks() {
      setBooks(await fetchBooks());
    }

    updateBooks();
  }, []);

  return (
    <div>
      <form
        style={{ textAlign: 'center' }}
        onSubmit={async () => {
          await submitBook({ title, price, stock });
          setTitle('');
          setBooks(await fetchBooks());
        }}
      >
        <input
          value={title}
          placeholder='Book title'
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>

        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        <input
          type='number'
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type='submit'>Upload Book</button>
      </form>
      {books && renderBooks(books)}
    </div>
  );
}

export default Books;
