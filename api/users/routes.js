const express = require('express')
const router = express.Router()
const model = require('./users')

router.get('/users', model.getUsers)
router.get('/users/:id', model.getUserById)
router.post('/users', model.createUser)
router.delete('/users/:id', model.deleteUser)
// router.put('/users/:id', db.updateUser)


module.exports = router;