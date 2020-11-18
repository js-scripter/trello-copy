const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
// const db = require('./queries.js')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true,}))

app.get('/', (request, response) => {
  response.sendFile( __dirname +"/views/index.html" )
})

const entity = ['users'];
for (const ent of entity){
	let routes = require(`./api/${ent}/routes`);
	app.use(routes);
}

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


