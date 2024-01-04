import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotification('Wrong credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleCreateBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = { title, author, url }
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNotification(`Added blog ${title} from ${author}`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch (exception) {
      setNotification('Could not create blog')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in</h2>
        <form onSubmit={handleLogin}>
          username <input type="text" onChange={({ target }) => setUsername(target.value)} /> <br /><br />
          password <input type="text" onChange={({ target }) => setPassword(target.value)} /> <br /><br />
          <button type="submit">log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={notification} type={notificationType} />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>log out</button>
      <br /><br />

      <h2>create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        title: <input type="text" onChange={({ target }) => setTitle(target.value)} /> <br /><br />
        author: <input type="text" onChange={({ target }) => setAuthor(target.value)} /> <br /><br />
        url: <input type="text" onChange={({ target }) => setUrl(target.value)} /> <br /><br />
        <button type="submit">create</button>
      </form>

      <br /><br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App