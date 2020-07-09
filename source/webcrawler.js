const axios = require("axios")
const cheerio = require("cheerio")

const INDEX_URL = "https://en.wikipedia.org/wiki/List_of_automobile_sales_by_model"
const WIKI_BASE_URL = "https://en.wikipedia.org"

async function fetchHTML(url) {
  const { data } = await axios.get(url)
  return data;
}

async function getIndexData() {
    const html = await fetchIndexHtml()
    const data = parseIndexData(html)
    return data
}

async function fetchIndexHtml() {
    return fetchHTML(INDEX_URL)
}

function parseIndexData(html) {
    const $data = cheerio.load(html)
    
    const $table = $data(".mw-body-content table.wikitable")
    const data = $table.find("tr th a").map(parseIndexElement).get()
    
    return data
}

function parseIndexElement(i, el) {
    const $el = cheerio(el)
    
    const modelUrl = $el.attr('href')
    const modelUrlFull = modelUrl ? WIKI_BASE_URL + modelUrl : null;
    const rowdata = {
        name: $el.text(),
        link: modelUrlFull
    }
    
    return rowdata
}

async function getCarData(url) {
    const html = await fetchHTML(url)
    const words = parseCarData(html)
    const top10 = extractTop10(words)

    return { 
        count: words.length,
        top_words: top10
    }
}

function parseCarData(html) {
    const $article = cheerio.load(html)
    const article = $article(".mw-body-content #mw-content-text").text()
    const words = article.trim().split(/\s+/)

    return words
}

function extractTop10(words) {
    //there are more efficient ways of doing this

    const wordsData = {}

    //count them all
    words.forEach(element => {
        element = element.toLowerCase()
        if (wordsData[element] === undefined){
            wordsData[element] = 1
        } else {
            wordsData[element] = wordsData[element] + 1
        }
    });
    
    
    //move to array
    const wordsCountArray = []
    Object.keys(wordsData).forEach(function(key) {
        var val = wordsData[key];
        wordsCountArray.push({
            word: key,
            count: val
        })
    });

    //sort array
    wordsCountArray.sort((a,b) => { return (a.count > b.count) ? -1 : ((b.count > a.count) ? 1 : 0)} )

    return wordsCountArray.slice(0, 10);
}

module.exports = {
    getIndexData: getIndexData,
    parseIndexData: parseIndexData,
    getCarData: getCarData,
    parseCarData: parseCarData,
    extractTop10: extractTop10,
}

