const blog = require('../models/blog')
const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const sum = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(sum, 0)
}

const favouriteBlog = (blogs) => {
  const maxLikes = Object.keys(blogs).length > 0
    ? Math.max(...blogs.map(blog => blog.likes))
    : 0

  return Object.keys(blogs).length === 0
    ? {}
    : blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const blogsPerAuthor = lodash.countBy(blogs,'author')
  const result =lodash.map(blogsPerAuthor, (value,key) => ( { author:key,blogs:value }))
  return lodash.maxBy(result, 'blogs')
}

const mostLikes = (blogs) => {
  const likesPerAuthor =
  lodash(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'likes': lodash.sumBy(objs, 'likes') }))
    .value()
  return lodash.maxBy(likesPerAuthor, 'likes')
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}