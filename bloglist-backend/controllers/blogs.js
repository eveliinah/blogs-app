const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate([
    { path: 'user', select: ['username', 'name', 'id'] },
  ])

  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate([
    { path: 'user', select: ['username', 'name', 'id'] },
  ])
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = request.user
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (!user) {
    return response.status(401).json({ error: 'user does not exist' })
  }

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing',
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if (!blog.user.toString() === user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (!user) {
    return response.status(401).json({ error: 'user does not exist' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate([{ path: 'user', select: ['username', 'name', 'id'] }])

  response.json(updatedBlog).status(204)
})

module.exports = blogRouter
