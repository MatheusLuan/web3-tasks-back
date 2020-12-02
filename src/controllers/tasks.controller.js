const moment = require('moment')

const connection = require('../database/connection')

module.exports = {
  async store(request, response) {
    const { title, description, status } = request.body

    const task = {
      title,
      description,
      status,
      user_id: request.userId,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    await connection('tasks').insert(task)

    return response.status(201).json(task)
  },

  async update(request, response) {
    const id = request.params.id
    const taskData = request.body

    const storedTask = await connection('tasks').where({ id, user_id: request.userId }).first()

    if (!storedTask) return response.sendStatus(422)

    taskData.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')

    await connection('tasks').where({ id }).update(taskData)

    return response.status(200).json(taskData)
  },

  async delete(request, response) {
    const id = request.params.id

    const storedTask = await connection('tasks').where({ id, user_id: request.userId }).delete()

    if (!storedTask) return response.sendStatus(422)

    return response.sendStatus(200)
  },

  async index(request, response) {
    const tasks = await connection('tasks').where({ user_id: request.userId })

    return response.status(200).json(tasks)
  },

  async show(request, response) {
    const id = request.params.id

    const task = await connection('tasks').where({ id, user_id: request.userId }).first()

    if (!task) return response.sendStatus(422)

    return response.status(200).json(task)
  }
}