var http = require('http')
var url = require('url')


var server = http.createServer(function(req, res) {
	res.writeHead(200, { 'Content-Type': 'application/json' })
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	
	var lang = req.headers["accept-language"]
	var langIndex = lang.indexOf(',')
	if (langIndex != -1) {
		lang = lang.substr(0, langIndex)
	} else {
		langIndex = lang.indexOf(';')
		if (langIndex != -1) {
			lang = lang.substr(0, langIndex)
		}
	}
	
	var os = req.headers['user-agent']
	var firstIndex = os.indexOf('(') + 1
	var lastIndex = os.indexOf(')', firstIndex)
	os = os.substr(firstIndex, lastIndex-firstIndex)
	
	var result = JSON.stringify({"ipaddress": ip,
	                             "language": lang,
	                             "software": os})
	res.end(result)
})
var port = process.env.PORT || 8080;
server.listen(port)