const jwt = require('jsonwebtoken')

module.exports = {
  authMiddleware(request, response, next) {
    const auth = request.headers.authorization

    if (!auth) {
      return response.sendStatus(401)
    }

    const token = auth.split(' ')[1]

    try {
      const data = jwt.verify(token, process.env.SECRET_KEY)

      const { id } = data

      request.userId = id

      return next()
    } catch {
      return response.sendStatus(500)
    }
  }
}