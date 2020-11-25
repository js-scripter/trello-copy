const express = require('express')
const router = express.Router()
const model = require('./boards')

router.get('/api/boards', model.getBoards)
router.get('/api/boards/:id', model.getBoardById)
router.post('/api/boards', model.createBoard)
router.delete('/api/boards/:id', model.deleteBoard)
router.put('/api/boards/:id', model.updateBoard)


module.exports = router;