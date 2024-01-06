import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDeleteBlog }) => {
  const [fullView, setFullView] = useState(false)

  const toggleView = () => setFullView(!fullView)
  const user = JSON.parse(localStorage.getItem('loggedBlogUser'))

  const addLike = () => {
    handleLike({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    })
  }

  const deleteBlog = () => {
    handleDeleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {!fullView &&
        <div style={blogStyle} key={blog.id}>
          {blog.title} {blog.author} <button onClick={toggleView}>view</button>
        </div>
      }

      {fullView &&
        <div style={blogStyle} key={blog.id}>
          {blog.title} {blog.author} <button onClick={toggleView}>hide</button> <br />
          <a href={blog.url}>{blog.url}</a> <br />
          likes {blog.likes} <button onClick={addLike}>like</button> <br />
          {blog.user && blog.user.name} <br />
          {blog.user.username === user.username &&
            <button onClick={deleteBlog}>delete</button>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}

export default Blog