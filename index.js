const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express()

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true,}))
app.get('/', (request, response) => {
  response.sendFile( __dirname +"/views/index.html" )
})
app.get('/users', (request,response)=>{
	response.status(200).json([{"id":77,"name":"appu","email":"appu@gmail.com"},{"id":76,"name":"anna","email":"anna@gmail.com"}])
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))