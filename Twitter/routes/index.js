const express = require('express')
const router = express.Router()
const app = express()

const twitProfile = require('../js/twit.js')



router.get('/', (req, res) => {
twitProfile.twitProfile((err, results) => {
	if (err){
		res.send(err)
		console.log(err)
	}
	else if(results){
		
	// res.send(results.twitTimeline[0].user.screen_name)
	res.render('home', results)
}
})
})

module.exports = router