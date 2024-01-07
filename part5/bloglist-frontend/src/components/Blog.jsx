import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDeleteBlog }) => {
  const [fullView, setFullView] = useState(false)

  const toggleView = () => setFullView(!fullView)

  const hideWhenFull = { display: fullView ? 'none' : '', paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }
  const showWhenFull = { display: fullView ? '' : 'none', paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }

  const user = JSON.parse(localStorage.getItem('loggedBlogUser')) || { username: 'username', name: 'name' }

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

  return (
    <div>
      <div key={blog.id} style={hideWhenFull} className='short-view'>
        <p className='short-title'>{blog.title}</p>
        <p className='short-author'>{blog.author}</p>
        <button onClick={toggleView}>view</button>
      </div>
      <div key={blog.id} style={showWhenFull} className='full-view'>
        <p className='full-title'>{blog.title}</p>
        <p className='full-author'>{blog.author}</p>
        <button onClick={toggleView}>hide</button>
        <br />
        <a href={blog.url} className='url'>{blog.url}</a>
        <br />
        <p className='likes'>likes {blog.likes}</p>
        <button onClick={addLike}>like</button>
        <br />
        {blog.user && <p className='username'>{blog.user.name}</p>}
        <br />
        {blog.user.username === user.username &&
                    <button onClick={deleteBlog}>delete</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}

export default Blog