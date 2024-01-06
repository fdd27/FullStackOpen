import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [fullView, setFullView] = useState(false)

  const toggleView = () => setFullView(!fullView)

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
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleView}>view</button>
        </div>
      }

      {fullView &&
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleView}>hide</button> <br />
          <a href={blog.url}>{blog.url}</a> <br /> likes {blog.likes} <button onClick={addLike}>like</button> <br /> {blog.user && blog.user.name}
        </div>
      }
    </div>
  )
}

export default Blog