const test = require('ava')
const makeApp = require('./app')
const supertest = require('supertest')
const {deleteAll} = require('./lib/books')

test.after.always('guaranteed cleanup', t => {
  return deleteAll()
})

test('GET:  /books (no results)', t => {
	t.plan(2)

	return supertest(makeApp(false))
		.get('/books')
    .then(res => {
      // console.log('RES', Object.keys(res).sort())
      t.is(res.status, 200)
      t.truthy(res.body.length === 0)
      return res
    })
});

test('POST: /books (create 1 record)', t => {
	t.plan(2)

	return supertest(makeApp(false))
		.post('/books')
    .send({title: 'Prototypes', author: 'Kyle Simpson', genre: 'Jedi Dev', description: 'This & that'})
    .then(res => {
      // console.log('RES', Object.keys(res).sort())
      t.is(res.status, 200)
      t.truthy(res.body.bookId)
      return res
    })
})


test('GET:  /books (1 result)', t => {

	return supertest(makeApp(false))
		.get('/books')
    .then(res => {
      // console.log('RES', Object.keys(res).sort())
      t.is(res.status, 200)
      t.truthy(res.body.length === 1)
      return res
    })
});