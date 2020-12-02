const router = require('express').Router()

const { authMiddleware } = require('./middlewares/auth.middleware')

const AuthController = require('./controllers/auth.controller')
const UsersController = require('./controllers/users.controller')
const TasksController = require('./controllers/tasks.controller')

router.post('/auth', AuthController.authenticate)

router.post('/users', UsersController.store)
router.put('/users/:id', UsersController.update)
router.delete('/users/:id', UsersController.delete)
router.get('/users', UsersController.index)
router.get('/user', authMiddleware, UsersController.show)

router.post('/tasks', authMiddleware, TasksController.store)
router.put('/tasks/:id', authMiddleware, TasksController.update)
router.delete('/tasks/:id', authMiddleware, TasksController.delete)
router.get('/tasks', authMiddleware, TasksController.index)
router.get('/tasks/:id', authMiddleware, TasksController.show)

module.exports = router