const express = require("express")
const next = require("next")
const NextjsExpressRouter = require("./nextjs_express_router")
const Middleware = require("./middleware")

const httpServer = (express) => {
  return require("http").createServer(express)
}

const httpsServer = (app) => {
  const fs = require("fs")
  const options = {
    key: fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH, "utf8"),
    cert: fs.readFileSync(process.env.SSL_CERTIFICATE_PATH, "utf8"),
  }

  return require("https").createServer(options, app)
}

class Server {
  constructor(port) {
    this.port = port
    this.app = express()
    this.next = next({ dev: process.env.NODE_ENV !== "production", hostname: "localhost", port: this.port })
    this.middleware = new Middleware(this.app)
    this.router = new NextjsExpressRouter(this.app, this.next)
  }

  async start() {
    await this.next.prepare()
    await this.middleware.init()
    await this.router.init()
    this.server = httpsServer(this.app)
    this.server.listen(process.env.EXPRESS_PORT)
  }
}

module.exports = Server
