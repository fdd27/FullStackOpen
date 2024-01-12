import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleCreateBlog}>
                title: <input id='title' type="text" onChange={({ target }) => setTitle(target.value)} /> <br /><br />
                author: <input id='author' type="text" onChange={({ target }) => setAuthor(target.value)} /> <br /><br />
                url: <input id='url' type="text" onChange={({ target }) => setUrl(target.value)} /> <br /><br />
        <button id='btnCreate' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm