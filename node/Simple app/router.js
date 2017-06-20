var Profile = require ("./profile.js")
var renderer = require("./renderer.js")
var querystring = require("querystring")

function homeRoute(req, res){
	if (req.url === "/"){
	if (req.method.toLowerCase() === "get") {
	res.writeHead(200, {'Content-Type': 'text/html'});
	renderer.view("header", {}, res)
	renderer.view("search", {}, res)
	renderer.view("footer", {}, res)
	res.end("stuff")
} 
	else {
		req.on("data", function(postBody){
		
		var query = querystring.parse(postBody.toString())
		console.log(query.username)
		res.writeHead(303, {"Location": "/" + query.username});
		res.end()
	})
		

}
}
}

function userRoute(req, res) {
	var username = req.url.replace("/", "")
	if (username.length > 0) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		renderer.view("header", {}, res)
		
		renderer.view("footer", {}, res)

		var studentProfile = new Profile(username)

		studentProfile.on("end", function(profileJSON){
			var values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name  ,
				badges: profileJSON.badges.length ,
				javascriptPoints: profileJSON.points.JavaScript
			}
			
			renderer.view("profile", values, res)
			renderer.view("footer", {}, res)	
			res.end()
		})

		studentProfile.on("error", function(error){
			
			renderer.view("error", {errorMessage: error.message}, res)
			renderer.view("footer", {}, res)
			res.end()
		})

		
		
	}
}

module.exports.homeRoute = homeRoute
module.exports.userRoute = userRoute