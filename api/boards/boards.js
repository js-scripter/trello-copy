const pool = require('../../db/db.js')

const getBoards = async (request, response) => {
  try{

    const results = await pool.query('SELECT * FROM board ORDER BY id DESC')
    response.status(200).send(results.rows)

  }catch(error){
    response.status(500).send(error.message)
  }
}
const getBoardById = async (request, response) => {
  const id = parseInt(request.params.id)

  try{
    const results = await pool.query('SELECT * FROM board WHERE id = $1', [id])
    response.status(200).send(results.rows)
  }catch(error){
    response.status(500).send(error.message)
  }
}

const createBoard = async (request, response) => {
  const { name } = request.body
  try{
    const results = await pool.query('INSERT INTO board (name) VALUES ($1) RETURNING *', [name])
    response.status(201).send(results.rows[0])
  }catch(error){
    response.status(500).send(error.message)
  }
}

const updateBoard = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    }
  )
}

const deleteBoard = async (request, response) => {
  const id = parseInt(request.params.id)
  try{
    const results = await pool.query('DELETE FROM board WHERE id = $1', [id])
    //delete lists which belong to this board
    const deleteChildLists = await pool.query('DELETE FROM lists WHERE board_id = $1', [id])
  	response.status(200).send(results)
  }catch(error){
  	response.status(500).send(error.message)
  }
}



module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
}