const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const pool = require('./db.js')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true,}))
app.get('/', (request, response) => {
  response.sendFile( __dirname +"/views/index.html" )
})
app.get('/users', async (request,response)=>{
	// response.status(200).json([{"id":77,"name":"appu","email":"appu@gmail.com"},{"id":76,"name":"anna","email":"anna@gmail.com"}])
	try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users');
      // const results = { 'results': (result) ? result.rows : null};
      // res.render('pages/db', results );
      response.status(200).json(result.rows)
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


