const path = require("path")
const favicon = require("serve-favicon")
const express = require("express")

class Middleware {
  constructor(app) {
    this.app = app
  }

  async init() {
    this.app.use(favicon(path.join(__dirname, "..", "public", "favicon.png")))

    this.initErrors()
  }

  initErrors() {
    this.app.use(async (err, req, res, next) => {
      /* This will be the first error handler to be called */
      console.error("Unexpected error")
      return next(err)
    })
  }
}

module.exports = Middleware
