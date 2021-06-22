const app = require('./app')

// LISTEN
app.listen(process.env.PORT|| 3000, err => {
  if (err) console.log(err)
  console.log('Listening Server')
})
