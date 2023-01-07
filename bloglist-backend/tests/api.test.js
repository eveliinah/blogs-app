const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./helper.test')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
let token
//const { response } = require('../app')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.testBlogs)

  const user = {
    password: '1234',
    username: 'maija'
  }

  const res = await api
    .post('/api/login')
    .set('Content-Type', 'application/json')
    .send(user).expect(200)

  token = res._body.token
})

describe('api tests', () => {
  test('get all blogs from database', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.testBlogs.length)
  })

  test('id named correctly', async () => {
    const dbBlogs = await helper.databaseBlogs()
    expect(dbBlogs[0].id).toBeDefined()
  })

  test.only('new blog can be added to database', async () => {
    const newBlog = {
      title: 'This is the best new blog in the world',
      author: 'Eveliina Heino',
      url: 'http://www.eveliina.blog.com',
      likes: 5000
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAfterPost = await helper.databaseBlogs()
    expect(blogsAfterPost).toHaveLength(helper.testBlogs.length + 1)

    const contents = blogsAfterPost.map(blog => blog.title)
    expect(contents).toContain(
      'This is the best new blog in the world'
    )
  })

  test('likes value 0 if left empty', async () => {
    const newBlog = {
      title: 'Zero likes',
      author: 'Zero',
      url: 'http://www.zero.blog.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAfterPost = await helper.databaseBlogs()
    expect(blogsAfterPost[blogsAfterPost.length - 1].likes).toBe(0)
  })

  test('blog without title and url not added', async () => {
    let newBlog = {
      title: 'No url',
      author: 'Zero'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    newBlog = {
      url: 'www.notitle.com',
      author: 'Zero'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.databaseBlogs()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
  })

  test('delete one blog', async () => {

    const newBlog = {
      title: 'Blog to Delete',
      author: 'Zero',
      url: 'http://www.zero.blog.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogs = await helper.databaseBlogs()
    const blogToDelete = blogs[blogs.length-1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAfterDelete = await helper.databaseBlogs()

    expect(blogsAfterDelete).toHaveLength(
      helper.testBlogs.length
    )

    const contents = blogsAfterDelete.map(b => b.title)

    expect(contents).not.toContain(blogToDelete.title)
  })

  test('update one blog', async () => {
    const blogs = await helper.databaseBlogs()
    const blogToUpdate = blogs[0]

    const updateBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 50
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`).send(updateBlog)
      .expect(204)

    const blogsAfterUpdate = await helper.databaseBlogs()

    expect(blogsAfterUpdate[0].likes).toBe(updateBlog.likes)

  })

  test('new blog can not be added without token', async () => {
    const newBlog = {
      title: 'This is the best new blog in the world',
      author: 'Eveliina Heino',
      url: 'http://www.eveliina.blog.com',
      likes: 5000
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)


    const blogsAfterPost = await helper.databaseBlogs()
    expect(blogsAfterPost).toHaveLength(helper.testBlogs.length)

    const contents = blogsAfterPost.map(blog => blog.title)
    expect(contents).not.toContain(
      'This is the best new blog in the world'
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})
