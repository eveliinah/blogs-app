const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./helper.test')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.testUsers)
})

describe('user tests', () => {
  test('user without password or password too short not added to database', async () => {
    let newUser = {
      username: 'eve',
      name: 'Eveliina Heino'
    }


    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password required')


    newUser = {
      username: 'eve',
      name: 'Eveliina Heino',
      password: '1'
    }

    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password min length 3')


    const usersAfterPost = await helper.databaseUsers()
    expect(usersAfterPost).toHaveLength(helper.testUsers.length)

  })

  test('user without username or username too short not added to database', async () => {
    let newUser = {
      password: 'eve',
      name: 'Eveliina Heino'
    }

    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username required')

    newUser = {
      name: 'Eveliina Heino',
      password: '1234',
      username: 'e'
    }

    result =  await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length (3)')


    const usersAfterPost = await helper.databaseUsers()
    expect(usersAfterPost).toHaveLength(helper.testUsers.length)

  })

  test('username must be unique', async () => {
    const newUser =  {
      username: 'eve',
      name: 'Eveliina Heino',
      password: 'salasana'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAfterPost = await helper.databaseUsers()
    expect(usersAfterPost).toHaveLength(helper.testUsers.length)

  })

  test.only('valid user can be added', async () => {
    const newUser = {
      name: 'Maija Meikäläinen',
      password: '1234',
      username: 'maija'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.databaseUsers()
    expect(usersAfterPost).toHaveLength(helper.testUsers.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})