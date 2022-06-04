import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const [selected, setSelected] = React.useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => {
          return (
            <li
              key={book.id}
              onClick={(e) => {
                setSelected(book.id);
              }}
            >
              {book.name}
            </li>
          );
        })}
      </ul>

      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
