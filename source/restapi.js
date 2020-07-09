const restify = require('restify')

function respond(req, res, next) {
    res.send(global.globalApiData)
    next()
}
  
function createServer(){
    var server = restify.createServer()
    server.get('/clyde/models', respond)
    return server
}
  
module.exports = createServer