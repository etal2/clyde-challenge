/**
 * @jest-environment node
 */

const webcrawler = require('../source/webcrawler.js')
const fs = require('fs')

test('parse car index page', () => {
    expect.assertions(2);
    const html = fs.readFileSync("./test/auto_index.html", "utf8")
    const data = webcrawler.parseIndexData(html)
    expect(data[0].name).toBe("AC 3000ME");
    expect(data[0].link).toBe("https://en.wikipedia.org/wiki/AC_3000ME")
});

test('parse car data page', () => {
    expect.assertions(1);
    const html = fs.readFileSync("./test/car_me3000.html","utf8")
    const data = webcrawler.parseCarData(html)
    console.log(data.length)
    expect(data.length).toBe(3762)
});

test('extract top 10 data', () => {
    const words = [
        'Bohanna', 'Stables', 'company', 'and', 'shown', 'at', 'the',
        'The', 'AC', '3000ME' ,'was', 'based', 'on',  'a', 'prototype', 'called', 'the', 'Diablo', 
        'built', 'by', 'the' ,'Bohanna', 'Stables', 'company', 'and', 'shown', 'at', 'the',
        'Bohanna', 'Stables', 'company', 'and', 'shown','at', 'the',
        'shown', 'at', 'the',
        'built', 'by', 'the' ,'Bohanna', 'Stables', 'company', 'and', 'shown', 'at', 'the',
        'Bohanna', 'Stables', 'company' ,'at', 'the',
        'Bohanna', 'Stables', 'company', 'and', 'shown','at', 'the'
    ]
    expect.assertions(1)
    const top10 = webcrawler.extractTop10(words)
    console.log(top10)
    expect(top10).toStrictEqual([
        { word: 'the', count: 11 },
        { word: 'at', count: 7 },
        { word: 'bohanna', count: 6 },
        { word: 'stables', count: 6 },
        { word: 'company', count: 6 },
        { word: 'shown', count: 6 },
        { word: 'and', count: 5 },
        { word: 'built', count: 2 },
        { word: 'by', count: 2 },
        { word: 'ac', count: 1 }
    ])
})
    