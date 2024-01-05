import { useState } from "react"

const Blog = ({ blog }) => {
  const [fullView, setFullView] = useState(false)

  const toggleView = () => setFullView(!fullView)

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
          {blog.url} <br /> likes {blog.likes} <br /> {blog.user && blog.user.name}
        </div>
      }
    </div>
  )
}

export default Blog