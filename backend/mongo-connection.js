const mongoose = require('mongoose')

async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  console.log('Connection Established.')
}

main()
