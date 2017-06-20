
var http = require('http')

var router = require ("./router.js")

http.createServer(function(req, res){
console.log(req.url)
router.homeRoute(req, res)
router.userRoute(req, res)


}).listen(3000)
