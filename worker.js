const { Worker, isMainThread, parentPort } = require('worker_threads')

const webcrawler = require('./source/webcrawler.js')

async function getAllModels(){
    console.log("fetch car index")
    const indexData = await webcrawler.getIndexData()
    console.log("start fetching car data")
    for (const modelData of indexData) {
        try {
            console.log("fetch " + modelData.link)
            modelDetails = await webcrawler.getCarData(modelData.link)
            console.log("got details " + modelData.link)
            modelData.details = modelDetails
        } catch (error) {
            console.error("error fetching:" + modelData.link);
        }
    }

    console.log("done fetching car data")

    return indexData
}

const doWork = () => {
    getAllModels().then((allData) => {
        parentPort.postMessage(allData)
        setTimeout(doWork, 60000) //run in a minute
    })
}

doWork()


