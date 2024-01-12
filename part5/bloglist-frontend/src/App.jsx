import { useState, useEffect, useRef } from 'react'
import './index.css'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes))
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

  const blogFormRef = useRef()

  const blogForm = () => (
    <Toggleable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Toggleable>
  )

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

  const handleCreateBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setNotification(`Added blog ${blog.title} from ${blog.author}`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification('Could not create blog')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async blogObject => {
    try {
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
      await blogService.deleteBlog(blogObject.id)
      setBlogs(blogs.filter(b => b.id !== blogObject.id))

      setNotification(`Deleted ${blogObject.title} from ${blogObject.author}`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification('Could not delete blog')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLike = async blogObject => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes))
      setNotification(`Added a like to ${updatedBlog.title} from ${updatedBlog.author}`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification('Could not add like')
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
        <Notification msg={notification} type={notificationType} />
        <form onSubmit={handleLogin}>
          username <input id='input-username' type="text" onChange={({ target }) => setUsername(target.value)} /> <br /><br />
          password <input id='input-password' type="password" onChange={({ target }) => setPassword(target.value)} /> <br /><br />
          <button id='submit-button' type="submit">log in</button>
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

      {blogForm()}

      <br /><br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} />
      )}
    </div>
  )
}

export default App