import { useState, useEffect, useRef } from "react";
import "./index.css";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from './services/users'

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import Users from "./components/Users";

import { useDispatch, useSelector } from "react-redux";
import { setNotification, removeNotification } from "./reducers/notificationReducer";
import { setBlogs, appendBlogs } from "./reducers/blogReducer";
import { logIn, logOut } from "./reducers/loginReducer";
import { setUsers } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch()

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
  const user = useSelector(state => state.login)

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

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create(blogObject);
      dispatch(appendBlogs(blog))
      const users = await userService.getAll()
      dispatch(setUsers(users))

      dispatch(setNotification({ msg: `Added blog ${blog.title} from ${blog.author}`, type: 'success' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
    }
    catch (exception) {
      dispatch(setNotification({ msg: 'Could not create blog', type: 'error' }))
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

      dispatch(setNotification({ msg: `Deleted ${blogObject.title} from ${blogObject.author}`, type: 'success' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
    }
    catch (exception) {
      dispatch(setNotification({ msg: "Could not delete blog", type: 'error' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000);
    }
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

  const blogFormRef = useRef();

  const blogForm = () => (
    <Toggleable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Toggleable>
  );

  if (!user) {
    return (
      <div>
        <h2>log in</h2>
        <Notification msg={notification} type={notificationType} />
        <form onSubmit={handleLogin}>
          username{" "}
          <input
            id="input-username"
            type="text"
            onChange={({ target }) => setUsername(target.value)}
          />{" "}
          <br />
          <br />
          password{" "}
          <input
            id="input-password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />{" "}
          <br />
          <br />
          <button id="submit-button" type="submit">
            log in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={notification} type={notificationType} />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>log out</button>
      <br />
      <br />

      {blogForm()}

      <br />
      <br />
      {blogs && blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDeleteBlog={handleDeleteBlog}
        />
      ))}

      <Users />
    </div>
  );
};

export default App;
