import Blog from "./Blog"
import Toggleable from "./Toggleable";
import BlogForm from "./BlogForm";
import { useRef } from "react";
import blogService from '../services/blogs'
import { useDispatch } from "react-redux";
import { appendBlogs, setBlogs } from "../reducers/blogReducer";
import { initializeUsers } from "../reducers/userReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const Home = ({ blogs }) => {
    const dispatch = useDispatch()
    const blogFormRef = useRef();

    const handleCreateBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility();
            const blog = await blogService.create(blogObject);
            dispatch(appendBlogs(blog))
            dispatch(initializeUsers())
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
            dispatch(initializeUsers())
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

    const blogForm = () => (
        <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
        </Toggleable>
    );

    return (
        <div>
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
        </div>
    )
}

export default Home