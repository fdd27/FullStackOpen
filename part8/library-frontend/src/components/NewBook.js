import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, GET_BOOKS_BY_GENRE } from '../query'
import { updateCache } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    },
    update: (cache, response) => {
      updateCache(cache, { query: GET_BOOKS_BY_GENRE, variables: { genre: '' } }, response.data)
      // cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        // const authorId = response.data.allBooks.author.id
        // const updatedAuthors = allAuthors.map(author => {
        //   if (author.id === authorId) {
        //     return {
        //       ...author,
        //       bookCount: author.bookCount //+ 1
        //     }
        //   }
        //   return author
        // })
      //   return {
      //     allAuthors: allAuthors.concat(response.data.addBook.author)
      //   }
      // })
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    props.setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>title <input value={title} onChange={({ target }) => setTitle(target.value)}/></div>
        <div>author <input value={author} onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>published <input type="number" value={published} onChange={({ target }) => setPublished(Number(target.value))}/></div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)}/>
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>genres: {genres.join(', ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook