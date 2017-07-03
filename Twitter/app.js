
const express = require('express')
const app = express()

//set up public assets
app.use('/static', express.static('public'))
app.set('view engine', 'pug')


const mainRoute = require('./routes/index')


// app.use("/", twitter)
app.use(mainRoute)



app.listen(3000, ()=>{
	console.log('application is running')
});


