const express = require('express')
const router = express.Router()
const model = require('./cards')

router.get('/api/cards/getListCards/:id', model.getListCards)
router.post('/api/cards/addCardToList', model.addCardToList)
router.delete('/api/cards/deleteListCard/:id',model.deleteListCard)
router.get('/api/cards/:id', model.getCardById)

module.exports = router;