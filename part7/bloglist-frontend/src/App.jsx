import { useState, useEffect } from "react";
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { setNotification, removeNotification } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { logIn, logOut } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";

import Home from "./components/Home";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import BlogPage from "./components/BlogPage";

import { Container, ButtonGroup, Button, ThemeProvider, TextField } from '@mui/material'
import { createTheme } from "@mui/material/styles";

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes))))
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(logIn(user));
      blogService.setToken(user.token);
    }
  }, []);

  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification ? state.notification.msg : null)
  const notificationType = useSelector(state => state.notification ? state.notification.type : null)
  const loggedUser = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const userMatch = useMatch('/users/:id')
  const user = userMatch ? users.find(u => u.id === userMatch.params.id) : null
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(logIn(user));
      setUsername("");
      setPassword("");
    }
    catch (exception) {
      dispatch(setNotification({ msg: 'Wrong credentials', type: 'error' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(logOut())
  };

  const handleLike = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject);
      const updatedBlogs = await blogService.getAll();
      dispatch(setBlogs(updatedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)));
      dispatch(setNotification({ msg: `Added a like to ${updatedBlog.title} from ${updatedBlog.author}`, type: 'success' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
    }
    catch (e) {
      dispatch(setNotification({ msg: 'Could not add like', type: 'error' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
    }
  };

  const handleDeleteBlog = async (blogObject) => {
    try {
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`);
      await blogService.deleteBlog(blogObject.id);
      dispatch(setBlogs(blogs.filter((b) => b.id !== blogObject.id)));
      dispatch(initializeUsers())
      dispatch(setNotification({ msg: `Deleted ${blogObject.title} from ${blogObject.author}`, type: 'success' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
      navigate('/')
    }
    catch (exception) {
      dispatch(setNotification({ msg: "Could not delete blog", type: 'error' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#ffffff',
      },
    },
  })

  if (!loggedUser) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <h2 className="my-5 text-2xl">Sign in</h2>
          <Notification msg={notification} type={notificationType} />
          <form onSubmit={handleLogin} className="flex flex-col max-w-80 gap-4">
            <TextField id="input-username" label="Username" variant="outlined" onChange={({ target }) => setUsername(target.value)} />
            <TextField id="input-password" label="Password" variant="outlined" type="password" onChange={({ target }) => setPassword(target.value)} />
            <Button id="submit-button" variant="contained" type="submit">log in</Button>
          </form>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <nav>
          <ButtonGroup variant="outlined" aria-label="nav button group">
            <Button>
              <Link to="/">blogs</Link>
            </Button>
            <Button>
              <Link to="/users">users</Link>
            </Button>
            <Button onClick={handleLogout}>log out</Button>
          </ButtonGroup>
          <span className="ml-2">
            <span className="font-semibold">{loggedUser.name}</span> logged in
          </span>
        </nav>

        <h2 className="text-3xl my-6">blog app</h2>
        <Notification msg={notification} type={notificationType} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path='/users/:id' element={<User user={user} />} />
          <Route path="/blogs/:id" element={<BlogPage blog={blog} handleLike={handleLike} handleDelete={handleDeleteBlog} />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
