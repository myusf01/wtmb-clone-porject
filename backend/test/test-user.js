import test from 'ava'
import request from 'supertest'
import app from '../app'

// Create new user.
test('Create new user.', async t => {
  t.plan(3)
  const newUser = {
    username: 'myusuf1',
    name: 'Yusuf11'
  }

  const res = await request(app)
    .post('/user')
    .send(newUser)
  t.is(res.status, 200)

  t.is(res.body.name, newUser.name)
  t.is(res.body.username, newUser.username)
})

// Fetch a user.
test('Fetch a user.', async t => {
  t.plan(3)
  const userToCreate = {
    username: 'testUser1',
    name: 'User1'
  }

  // create a user
  const userCreated = (
    await request(app)
      .post('/user')
      .send(userToCreate)
  ).body

  // fetch recently created user
  const fetchRes = await request(app).get(`/user/${userCreated._id}`)
  t.is(fetchRes.status, 200)

  const fetchResJson = await request(app).get(`/user/${userCreated._id}/json`)
  t.is(fetchResJson.status, 200)

  const userFetched = fetchResJson.body
  t.deepEqual(userFetched, userCreated)
})

// delete a user
test('Delete a user', async t => {
  t.plan(4)

  const userToCreate = {
    username: 'testUser2',
    name: 'User2'
  }

  const userCreated = (
    await request(app)
      .post('/user')
      .send(userToCreate)
  ).body

  const deleteUser = await request(app).delete(`/user/${userCreated._id}`)

  t.is(deleteUser.status, 200)
  t.is(deleteUser.ok, true)

  const fetchDeletedUser = await request(app).get(`/user/${userCreated._id}`)
  // console.log(fetchDeletedUser);
  t.is(fetchDeletedUser.status, 404)

  const fetchDeletedUserJson = await request(app).get(
    `/user/${userCreated._id}/json`
  )
  t.is(fetchDeletedUserJson.status, 404)
})

// get a list of users.
test('Get a list of created users.', async t => {
  // create a user to be sure there's atleast one user.
  const userToCreate = {
    username: 'testUser2',
    name: 'User2'
  }
  const _ = await request(app)
    .post('/user')
    .send(userToCreate)

  const getListRendered = await request(app).get('/user/all')
  t.is(getListRendered.status, 200)

  const getListJson = await request(app).get('/user/all/json')
  t.is(getListJson.status, 200)

  //get the list of all users
  t.true(Array.isArray(getListJson.body), 'Body should be an array')
  t.true(getListJson.body.length > 0)
})
