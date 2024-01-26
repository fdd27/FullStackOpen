const BlogPage = ({ blog, handleLike, handleDelete }) => {
    const user = JSON.parse(localStorage.getItem("loggedBlogUser")) || {
        username: "username",
        name: "name",
    };

    const addLike = () => {
        handleLike({
            id: blog.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user,
        });
    }

    const deleteBlog = () => {
        handleDelete(blog);
    }

    return (
        <div>
            <h3>{blog.title}</h3>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes <button onClick={addLike}>like</button> </div>
            <p>added by {blog.author}</p>
            {blog.user.username === user.username && (
                <button id='btnDelete' onClick={deleteBlog}>delete</button>
            )}
        </div>
    )
}

export default BlogPage