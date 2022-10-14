const glob = require('glob')
const { join } = require('path')
const { parse } = require('node-html-parser')
const { writeFileSync, readFileSync } = require('fs')
const files = glob.sync('**/*.html', { cwd: __dirname })
const translations = {}
const langRegex = /(?=[^\.]+\.)[^\.]+(?=\.html$)/

const queryMap = {
    introTitle: '.jumbotron .container h1',
    introPart1: '.jumbotron .container p:nth-of-type(1)',
    introPart2: '.jumbotron .container p:nth-of-type(2)',
}

files.forEach((file) => {
    const lang = file.match(langRegex)
    const outputPath = join(__dirname, 'json', lang + '.json')
    const outputData = {}
    const doc = parse(readFileSync(join(__dirname, file)))
    Object.entries(queryMap).forEach(([piece, query]) => {
        outputData[piece] = doc.querySelector(query).innerText.trim()
    })
    writeFileSync(outputPath, JSON.stringify(outputData))
})
