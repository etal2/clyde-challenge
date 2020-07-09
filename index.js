
const { Worker, isMainThread,  workerData } = require('worker_threads');
const restapi = require('./source/restapi.js')

global.globalApiData = {}

if(isMainThread) {
	    console.log("this is the main thread")
   
        let worker = new Worker('./worker.js');
    
        worker.on('message',(data) => {
            globalApiData = data
        })
        
        worker.on('error',(err) => {
            console.log(err);
        })

        worker.on('exit',(code) => {
            if(code != 0) 
                console.error(`Worker stopped with exit code ${code}`)
        })

        const server = restapi()
        //run restapi server
        server.listen(3333, function() {
            console.log('%s listening at %s', server.name, server.url)
        });
}