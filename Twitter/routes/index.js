const express = require('express')
const router = express.Router()
const app = express()
const moment = require('moment')

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

	// res.send(results.twitMessages)
	res.render('home', results)
}
})
})

module.exports = router