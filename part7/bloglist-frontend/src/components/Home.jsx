import Toggleable from "./Toggleable";
import BlogForm from "./BlogForm";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import blogService from '../services/blogs'

import { appendBlogs } from "../reducers/blogReducer";
import { initializeUsers } from "../reducers/userReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const Home = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
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

    const blogForm = () => (
        <Toggleable buttonLabel="create new" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
        </Toggleable>
    );

    return (
        <div>
            {blogForm()}
            {blogs && blogs.map((blog) => (
                // <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} />

                <div key={blog.id} className="p-1 my-1 border border-neutral-400">
                    <Link to={`/blogs/${blog.id}`} className="hover:text-sky-600 hover:underline underline-offset-2">{blog.title}</Link>
                </div>
            ))}
        </div>
    )
}

export default Home