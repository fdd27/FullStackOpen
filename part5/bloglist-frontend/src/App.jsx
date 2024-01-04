import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('username:', username, 'password:', password)
      const user = await loginService.login({ username, password })
      // window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log(user)
      // alert('Wrong credentials')
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
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App