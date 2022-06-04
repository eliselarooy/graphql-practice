import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../queries/queries';
import BookList from './BookList';

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });

  if (loading) return 'Loading';

  if (error) return `Error! ${error.message}`;

  const { book } = data;

  function displayBookDetails() {
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((book) => {
              return <li key={book.id}>{book.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  }

  return <div id="book-details">{displayBookDetails()}</div>;
}

export default BookDetails;
