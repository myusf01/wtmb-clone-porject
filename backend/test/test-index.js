import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Test main page.', async t => {
  const user1Data = {
    name: 'Ben Index TEST',
    username: 'bnindex'
  }

  const getMain = await request(app).get('/')

  const _ = await request(app)
    .post('/user')
    .send(user1Data)

  const getMainUpdated = await request(app).get('/')

  t.is(getMainUpdated.status, 200)

  t.notDeepEqual(getMain, getMainUpdated)
})
