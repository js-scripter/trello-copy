const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true,}))

//routes for views
app.get('/', (request, response) => {
  response.sendFile( __dirname +"/views/index.html" )
})
app.get('/users', (request, response) => {
  response.sendFile( __dirname +"/views/users.html" )
})
app.get('/boards', (request, response) => {
  response.sendFile( __dirname +"/views/boards.html" )
})

//routes for API
const entity = ['users','boards','lists','cards'];
for (const ent of entity){
	let routes = require(`./api/${ent}/routes`);
	app.use(routes);
}


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


