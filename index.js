const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const db = require('./queries.js')
// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true,}))
app.get('/', (request, response) => {
  response.sendFile( __dirname +"/views/index.html" )
})
// app.get('/users', async (request,response)=>{
// 	// response.status(200).json([{"id":77,"name":"appu","email":"appu@gmail.com"},{"id":76,"name":"anna","email":"anna@gmail.com"}])
// 	try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM users ORDER BY id DESC');
//       console.log(JSON.stringify(result))
//       // const results = { 'results': (result) ? result.rows : null};
//       // res.render('pages/db', results );
//       response.status(200).json(result.rows)
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
// })

// app.get('/users', async (request,response)=>{
// 	pool.query('SELECT * FROM users ORDER BY id DESC', (error, results) => {
// 	    if (error) {
// 	      throw error
// 	    }
// 	    response.status(200).json(results.rows)
//  	})
// })

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


