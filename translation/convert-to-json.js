const glob = require('glob')
const { join } = require('path')
const { parse } = require('node-html-parser')
const { writeFileSync, readFileSync } = require('fs')
const files = glob.sync('**/*.html', { cwd: __dirname })
const langRegex = /(?=[^\.]+\.)[^\.]+(?=\.html$)/

const queryMap = {
    intro: {
        title: '.jumbotron .container h1',
        parts: [
            '.jumbotron .container p:nth-of-type(1)',
            '.jumbotron .container p:nth-of-type(2)',
        ],
    },
    benefits: [
        {
            title: '.band:nth-of-type(3) .col-md-4 h2',
            summary: '.band:nth-of-type(3) .col-md-4 blockquote p',
            reasons: [
                '.band:nth-of-type(3) .col-md-4 blockquote li',
                '.band:nth-of-type(3) .col-md-4 blockquote li:nth-of-type(2)',
                '.band:nth-of-type(3) .col-md-4 blockquote li:nth-of-type(3)',
            ],
        },
        {
            title: '.band:nth-of-type(3) .col-md-4:nth-of-type(2) h2',
            summary:
                '.band:nth-of-type(3) .col-md-4:nth-of-type(2) blockquote p',
            reasons: [
                '.band:nth-of-type(3) .col-md-4:nth-of-type(2) blockquote p:nth-of-type(2)',
                '.band:nth-of-type(3) .col-md-4:nth-of-type(2) blockquote p:nth-of-type(3)',
                '.band:nth-of-type(3) .col-md-4:nth-of-type(2) blockquote p:nth-of-type(4)',
            ],
        },
        {
            title: '.band:nth-of-type(3) .col-md-4:nth-of-type(3) h2',
            summary:
                '.band:nth-of-type(3) .col-md-4:nth-of-type(3) blockquote p',
            reasons: [
                '.band:nth-of-type(3) .col-md-4:nth-of-type(3) blockquote p',
                '.band:nth-of-type(3) .col-md-4:nth-of-type(3) blockquote p:nth-of-type(2)',
                '.band:nth-of-type(3) .col-md-4:nth-of-type(3) blockquote p:nth-of-type(3)',
            ],
        },
    ],
    powerful: {
        title: '.band:nth-of-type(4) h2',
        description: '.band:nth-of-type(4) p',
    },
    spotlight: {},
}

const completeOutput = {}

files.forEach((file) => {
    const lang = file.match(langRegex)
    const outputPath = join(__dirname, 'json', lang + '.json')
    const outputData = (completeOutput[lang] = {})
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
            let element
            try {
                element = doc.querySelector(query)
            } catch (error) {
                console.error(error)
            }
            if (!element)
                return console.warn(
                    `Could not find the target using query ${query}, lang: ${lang}`
                )
            target[piece] = element.innerText.trim()
        }
    }
    Object.entries(queryMap).forEach(([piece, query]) =>
        getPiece(piece, query, outputData)
    )
    writeFileSync(outputPath, JSON.stringify(outputData))
})

const completeOutputPath = join(__dirname, 'json', 'complete.json')
writeFileSync(completeOutputPath, JSON.stringify(completeOutput))
