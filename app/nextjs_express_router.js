// This class is used to route requests
class NextjsExpressRouter {
  constructor(app, next) {
    this.app = app
    this.next = next
  }

  async init() {
    this.initApi()
    this.initPages()
    this.initErrors()
  }

  initApi() {
    return new (require("./routes/api.js"))(this.app).init()
  }

  initPages() {
    return new (require("./routes/pages.js"))(this.app, this.next).init()
  }

  initErrors() {
    // catch 404 and forward to error handler
    this.app.use((_, __, next) => {
      const err = new Error("Not Found")
      err.status = 404
      next(err)
    })

    this.app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.locals.error = err
      res.locals.errorDescription = err.message
      this.next.render(req, res, "/_error", {})
    })
  }
}

module.exports = NextjsExpressRouter
