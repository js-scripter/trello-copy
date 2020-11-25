const pool = require('../../db/db.js')

const getBoardLists = async (request, response) => {
  const id = parseInt(request.params.id)

  try{
    const results = await pool.query('select * from lists WHERE board_id = $1', [id])
    response.status(200).send(results.rows)
  }catch(error){
    response.status(500).send(error.message)
  }
}

const getListById = async (request, response) => {
  const id = parseInt(request.params.id)

  try{
    const results = await pool.query('SELECT * FROM lists WHERE id = $1', [id])
    response.status(200).send(results.rows)
  }catch(error){
    response.status(500).send(error.message)
  }
}

const deleteBoardList = async (request, response) => {
  const id = parseInt(request.params.id)
  console.log(id)
  try{
    console.log('DELETE FROM lists WHERE id = '+id)
    const results = await pool.query('DELETE FROM lists WHERE id = $1', [id])
    //delete cards which belong to this list
    const deleteChildRecords = await pool.query('DELETE FROM cards WHERE list_id = $1', [id])
    response.status(200).send(results)
  }catch(error){
    console.log(error.message)
    response.status(500).send(error.message)
  }
}

const addListToBoard = async (request, response) => {
  console.log('in add list to board')
  const { name,board_id } = request.body
  try{
    const results = await pool.query('INSERT INTO lists (name,board_id) VALUES ($1,$2) RETURNING *', [name,board_id])
    response.status(201).send(results.rows[0])
  }catch(error){
    response.status(500).send(error.message)
  }
}

module.exports = {
  getBoardLists,
  deleteBoardList,
  addListToBoard,
  getListById
}