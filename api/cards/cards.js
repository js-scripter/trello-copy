const pool = require('../../db/db.js')

const getListCards = async (request, response) => {
  const id = parseInt(request.params.id)

  try{
    const results = await pool.query('select * from cards WHERE list_id = $1', [id])
    response.status(200).send(results.rows)
  }catch(error){
    response.status(500).send(error.message)
  }
}

const addCardToList = async (request, response) => {
  console.log('in add card to list')
  const { name,description,board_id,list_id } = request.body
  try{
    const results = await pool.query('INSERT INTO cards (name,description,board_id,list_id) VALUES ($1,$2,$3,$4) RETURNING *', [name,description,board_id,list_id])
    response.status(201).send(results.rows[0])
  }catch(error){
    response.status(500).send(error.message)
  }
}

const deleteListCard = async (request, response) => {
  const id = parseInt(request.params.id)
  console.log(id)
  try{
    console.log('DELETE FROM cards WHERE id = '+id)
    const results = await pool.query('DELETE FROM cards WHERE id = $1', [id])
    response.status(200).send(results)
  }catch(error){
    console.log(error.message)
    response.status(500).send(error.message)
  }
}

const getCardById = async (request, response) => {
  const id = parseInt(request.params.id)

  try{
    const results = await pool.query('SELECT * FROM cards WHERE id = $1', [id])
    response.status(200).send(results.rows)
  }catch(error){
    response.status(500).send(error.message)
  }
}

module.exports = {
  addCardToList,
  getListCards,
  deleteListCard,
  getCardById
}