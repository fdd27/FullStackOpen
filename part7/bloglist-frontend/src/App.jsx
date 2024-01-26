import { useState, useEffect } from "react";
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import "./index.css";

import blogService from "./services/blogs";
import loginService from "./services/login";

import Home from "./components/Home";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import BlogPage from "./components/BlogPage";

import { useDispatch, useSelector } from "react-redux";
import { setNotification, removeNotification } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { logIn, logOut } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";


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

  if (!loggedUser) {
    return (
      <div>
        <h2>log in</h2>
        <Notification msg={notification} type={notificationType} />
        <form onSubmit={handleLogin}>
          username{" "}<input id="input-username" type="text" onChange={({ target }) => setUsername(target.value)} />
          <br />
          <br />
          password{" "}<input id="input-password" type="password" onChange={({ target }) => setPassword(target.value)} />
          <br />
          <br />
          <button id="submit-button" type="submit">log in</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={notification} type={notificationType} />

      <p>{loggedUser.name} logged in</p>
      <button onClick={handleLogout}>log out</button>
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path='/users/:id' element={<User user={user} />} />
        <Route path="/blogs/:id" element={<BlogPage blog={blog} handleLike={handleLike} handleDelete={handleDeleteBlog} />} />
      </Routes>
    </div>
  );
};

export default App;
