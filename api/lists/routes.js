const express = require('express')
const router = express.Router()
const model = require('./lists')

// router.get('/api/lists', model.getUsers)
// router.get('/api/users/:id', model.getUserById)
// router.post('/api/users', model.createUser)
// router.delete('/api/users/:id', model.deleteUser)
// router.put('/api/users/:id', model.updateUser)
router.get('/api/lists/:id', model.getListById)
router.get('/api/lists/getBoardLists/:id', model.getBoardLists)
router.post('/api/lists/addListToBoard', model.addListToBoard)
router.delete('/api/lists/deleteBoardList/:id',model.deleteBoardList)

module.exports = router;