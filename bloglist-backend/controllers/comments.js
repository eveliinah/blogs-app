const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({}).populate('blog', {
    title: 1,
    author: 1,
    id: 1,
  })

  const requestedComments = comments.filter(
    (comment) => comment.blog.id === request.params.id
  )

  console.log(requestedComments)

  response.json(requestedComments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const comment = new Comment({
    content: body.content,
    blog: request.params.id,
  })

  const savedComment = await comment.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter
