require("dotenv").config()
const server = require("./app/server")

const begin = async () => {
  await new server(process.env.EXPRESS_PORT).start()
  console.log(`Server running in --- ${process.env.NODE_ENV} --- on port ${process.env.EXPRESS_PORT}`)
}

begin()
