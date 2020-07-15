const restify = require('restify')

var apiData = null

function respond(req, res, next) {
    if(apiData === null){
        res.send({error: "data not ready"})
    } else {
        res.send(apiData)
    }
    next()
}
  
function setApiData(data){
    apiData = data
}

function createServer(){
    var server = restify.createServer()
    server.get('/clyde/models', respond)
    return server
}
  
module.exports = {
    createServer: createServer,
    setApiData: setApiData
}