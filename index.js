const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
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


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


