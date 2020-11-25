const pool = require('../../db/db.js')

const getUsers = async (request, response) => {
  try{

    const results = await pool.query('SELECT * FROM users ORDER BY id DESC')
    response.status(200).send(results.rows)

  }catch(error){
    response.status(500).send(error.message)
  }
}

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id)

  try{
    const results = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    response.status(200).send(results.rows)
  }catch(error){
    response.status(500).send(error.message)
  }
}

const createUser = async (request, response) => {
  const { name, email } = request.body
  try{
    const results = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
    response.status(201).send(results.rows[0])
  }catch(error){
    response.status(500).send(error.message)
  }
}

const updateUser = (request, response) => {
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

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    // response.status(200).send(`User deleted with ID: ${id}`)
    response.status(200).json(results);
  })
}

const getBoardUsers = async (request, response) => {
  const id = parseInt(request.params.id)

  try{
    const results = await pool.query('select bu.id,bu.user_id,u.name from board_users as bu INNER JOIN users as u ON bu.user_id=u.id WHERE board_id = $1', [id])

    response.status(200).send(results.rows)
  }catch(error){
    response.status(500).send(error.message)
  }
}

const deleteBoardUser = async (request, response) => {
  const id = parseInt(request.params.id)
  console.log(id)
  try{
    console.log('DELETE FROM board_users WHERE id = '+id)
    const results = await pool.query('DELETE FROM board_users WHERE id = $1', [id])
    response.status(200).send(results)
  }catch(error){
    console.log(error.message)
    response.status(500).send(error.message)
  }
}

const addUserToBoard = async (request, response) => {
  const { user_id,board_id } = request.body
  try{
    const results = await pool.query('INSERT INTO board_users (user_id,board_id) VALUES ($1,$2) RETURNING *', [user_id,board_id])
    response.status(201).send(results.rows[0])
  }catch(error){
    response.status(500).send(error.message)
  }
}

const addUserToCard = async (request, response) => {
  const { id,user_id } = request.body
  try{
    const results = await pool.query(
      'UPDATE cards SET user_id = $1 WHERE id=$2', [user_id,id]
    )
    console.log(results.rows[0])
    response.status(201).send(results.rows[0])
  }catch(error){
    response.status(500).send(error.message)
    console.log(error)
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getBoardUsers,
  deleteBoardUser,
  addUserToBoard,
  addUserToCard
}