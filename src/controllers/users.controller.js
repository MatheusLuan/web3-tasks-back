const moment = require('moment')

const connection = require('../database/connection')
const hash = require('../helpers/hashPassword')

module.exports = {
  async store(request, response) {
    const { name, email, password } = request.body

    const storedUser = await connection('users').where({ email }).first()

    if(storedUser) {
      return response.status(422).json({ error: 'User already exists!' })
    }

    if (!name || !email || !password) {
      return response.sendStatus(422)
    }

    const hashedPassword = await hash.make(password, 10)
    
    const user = {
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    await connection('users').insert(user)

    user.password = undefined

    return response.status(201).json(user)
  },

  async update(request, response) {
    const id = request.params.id
    const userData = request.body

    const storedUser = await connection('users').where({ id }).first()

    if (!storedUser) return response.sendStatus(422)

    if (userData.password) {
      const hashedPassword = await hash.make(userData.password, 10)

      userData.password = hashedPassword
    }

    userData.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')

    await connection('users').where({ id }).update(userData)

    userData.password = undefined

    return response.status(200).json(userData)
  },

  async delete(request, response) {
    const id = request.params.id

    const storedUser = await connection('users').where({ id }).delete()

    if (!storedUser) return response.sendStatus(422)

    return response.sendStatus(200)
  },

  async index(request, response) {
    const users = await connection('users')

    for (const user of users) {
      user.password = undefined
    }

    return response.status(200).json(users)
  },

  async show(request, response) {
    const user = await connection('users').where({ id: request.userId }).first()

    if (!user) return response.sendStatus(422)

    user.password = undefined

    return response.status(200).json(user)
  }
}