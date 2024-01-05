import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new blog</h2>
            <form onSubmit={handleCreateBlog}>
                title: <input type="text" onChange={({ target }) => setTitle(target.value)} /> <br /><br />
                author: <input type="text" onChange={({ target }) => setAuthor(target.value)} /> <br /><br />
                url: <input type="text" onChange={({ target }) => setUrl(target.value)} /> <br /><br />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm