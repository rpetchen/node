const express = require('express')
const router = express.Router()
const app = express()
const moment = require('moment')
const postTwit = require('../js/postTwit.js')
const twitProfile = require('../js/twit.js')





router.get('/', (req, res) => {
twitProfile.twitProfile((err, results) => {
	if (err){
		res.send(err)
		console.log(err)
	}
	else if(results){
		results.twitTimeline.forEach( (val) =>{
			val.created_at = moment(val.created_at).format('MM-DD-YYYY')
		})
		results.twitMessages.forEach((val) =>{
			val.created_at_time = moment(val.created_at).format("hh:mm a")
			val.created_at = moment(val.created_at).format('MM-DD-YYYY')
			
		
		})

	// res.send(results)
	res.render('home', results)
}
})
})

router.post('/post', (req,res) =>{

if (req.body.postText){
var tweetContent = req.body.postText
postTwit.postTwit(tweetContent, (err,results) => {
	if (err){
	res.send('Unable to retrieve results')
	console.log(err)	
	}
else if (results){
	res.redirect('/')
}

else {
	res.redirect('/')
}
})
}
})


router.use ((req, res) => {
	res.send('404 Page not found')
})



module.exports = router