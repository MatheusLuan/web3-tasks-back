const jwt = require('jsonwebtoken')

const connection = require('../database/connection')
const hash = require('../helpers/hashPassword')

module.exports = {
  async authenticate(request, response) {
    const { email, password } = request.body
    
    const user = await connection('users').where({ email: email.trim() }).first()
    
    if (!user) {
      return response.sendStatus(401)
    }
    
    const isValidPassword = await hash.compare(password, user.password)
    
    if (!isValidPassword) {
      return response.sendStatus(401)
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' })

    return response.status(200).json({ user: { id: user.id, email: user.email }, token })
  }
}