const glob = require('glob')
const { join } = require('path')
const { parse } = require('node-html-parser')
const { writeFileSync, readFileSync } = require('fs')
const files = glob.sync('**/*.html', { cwd: __dirname })
const langRegex = /(?=[^\.]+\.)[^\.]+(?=\.html$)/

const queryMap = {
    intro: {
        title: '.jumbotron .container h1',
        part1: '.jumbotron .container p:nth-of-type(1)',
        part2: '.jumbotron .container p:nth-of-type(2)',
    },
    benefitsSection: [{ title: '.band:nth-of-type(3) .col-md-4 h2' }],
}

files.forEach((file) => {
    const lang = file.match(langRegex)
    const outputPath = join(__dirname, 'json', lang + '.json')
    const outputData = {}
    const doc = parse(readFileSync(join(__dirname, file)))
    const getPiece = (piece, query, target) => {
        if (Array.isArray(query)) {
            const newTarget = (target[piece] = [])
            query.forEach((subQuery, index) => {
                getPiece(index, subQuery, newTarget)
            })
        } else if (typeof query == 'object' && query !== null) {
            if (!target.hasOwnProperty(piece)) target[piece] = {}
            const newTarget = target[piece]
            Object.entries(query).forEach(([piece, query]) => {
                getPiece(piece, query, newTarget)
            })
        } else {
            const element = doc.querySelector(query)
            if (!element)
                return console.warn(
                    `Could not find the target using query ${query}`
                )
            target[piece] = element.innerText.trim()
        }
    }
    Object.entries(queryMap).forEach(([piece, query]) =>
        getPiece(piece, query, outputData)
    )
    writeFileSync(outputPath, JSON.stringify(outputData))
})
