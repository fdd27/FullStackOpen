import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2 className="text-xl mb-2">create new blog</h2>
      <form onSubmit={handleCreateBlog} className="flex flex-row items-center gap-2 mb-1">
        <TextField id="title" label='Title' variant="outlined" onChange={({ target }) => setTitle(target.value)} />
        <TextField id="author" label='Author' variant="outlined" onChange={({ target }) => setAuthor(target.value)} />
        <TextField id="url" label='URL' variant="outlined" onChange={({ target }) => setUrl(target.value)} />
        <Button id="btnCreate" type="submit" variant="contained">
          create
        </Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
