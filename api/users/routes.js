const express = require('express')
const router = express.Router()
const model = require('./users')

router.get('/api/users', model.getUsers)
router.get('/api/users/:id', model.getUserById)
router.post('/api/users', model.createUser)
router.delete('/api/users/:id', model.deleteUser)
router.put('/api/users/:id', model.updateUser)

router.get('/api/users/getBoardUsers/:id', model.getBoardUsers)
router.post('/api/users/addUser',model.addUserToBoard)
router.delete('/api/users/deleteBoardUser/:id',model.deleteBoardUser)

router.post('/api/users/addUserToCard',model.addUserToCard)

module.exports = router;