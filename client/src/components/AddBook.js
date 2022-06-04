import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK_MUTATION, GET_BOOKS } from '../queries/queries';

function AddBook() {
  const [input, setInput] = React.useState({
    name: '',
    genre: '',
    authorId: '',
  });
  const { loading, error, data } = useQuery(GET_AUTHORS);

  const [
    addBook,
    { data: addBookData, loading: addBookLoading, error: addBookError },
  ] = useMutation(ADD_BOOK_MUTATION);

  function submitForm(e) {
    e.preventDefault();
    addBook({
      variables: { ...input },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  }

  if (error) return `Error! ${error.message}`;

  return (
    <form action="" id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label htmlFor="">Book name:</label>
        <input
          type="text"
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor="">Genre:</label>
        <input
          type="text"
          onChange={(e) => setInput({ ...input, genre: e.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor="">Author:</label>
        <select
          name=""
          id=""
          onChange={(e) => setInput({ ...input, authorId: e.target.value })}
        >
          <option value="">Select author</option>
          {loading ? (
            <option disabled>Loading authors...</option>
          ) : (
            data.authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })
          )}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
