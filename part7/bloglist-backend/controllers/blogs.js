const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url) response.status(400).end();

  const user = request.user;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    // user: user.id
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  if (!request.body.comment) response.status(400).end()

  const blog = await Blog.findById(request.params.id)
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: {
      id: blog.user.id,
      username: blog.user.username,
      name: blog.user.name
    },
    comments: blog.comments.concat(request.body)
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blog.id, newBlog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (blog.user.id.toString() !== user.id) {
    return response.status(401).json({ error: "invalid user" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (blog.user.id.toString() !== user.id)
    return response.status(401).json({ error: "invalid user" });

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: {
      id: request.user.id,
      username: request.user.username,
      name: request.user.name,
    },
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
