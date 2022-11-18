const glob = require('glob')
const { join } = require('path')
const { parse } = require('node-html-parser')
const { writeFileSync, readFileSync } = require('fs')
const { type } = require('os')
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
    spotlight: {
        title: '.band:nth-of-type(5) h2',
    },
    features: {
        title: '.band:nth-of-type(6) h2',
        list: [
            '.band:nth-of-type(6) ul > li:nth-of-type(1)',
            '.band:nth-of-type(6) ul > li:nth-of-type(2)',
            '.band:nth-of-type(6) ul > li:nth-of-type(3)',
            '.band:nth-of-type(6) ul > li:nth-of-type(4)',
            '.band:nth-of-type(6) ul > li:nth-of-type(5)',
            '.band:nth-of-type(6) ul > li:nth-of-type(6)',
            '.band:nth-of-type(6) ul > li:nth-of-type(7)',
            [
                '.band:nth-of-type(6) ul > li:nth-of-type(7) li:nth-of-type(1)',
                '.band:nth-of-type(6) ul > li:nth-of-type(7) li:nth-of-type(2)',
                '.band:nth-of-type(6) ul > li:nth-of-type(7) li:nth-of-type(3)',
                '.band:nth-of-type(6) ul > li:nth-of-type(7) li:nth-of-type(4)',
            ],
            '.band:nth-of-type(6) ul > li:nth-of-type(8)',
            [
                '.band:nth-of-type(6) ul > li:nth-of-type(8) li:nth-of-type(1)',
                '.band:nth-of-type(6) ul > li:nth-of-type(8) li:nth-of-type(2)',
                '.band:nth-of-type(6) ul > li:nth-of-type(8) li:nth-of-type(3)',
                '.band:nth-of-type(6) ul > li:nth-of-type(8) li:nth-of-type(4)',
                '.band:nth-of-type(6) ul > li:nth-of-type(8) li:nth-of-type(5)',
            ],
            '.band:nth-of-type(6) ul > li:nth-of-type(9)',
            [
                '.band:nth-of-type(6) ul > li:nth-of-type(9) li:nth-of-type(1)',
                '.band:nth-of-type(6) ul > li:nth-of-type(9) li:nth-of-type(2)',
                '.band:nth-of-type(6) ul > li:nth-of-type(9) li:nth-of-type(3)',
                '.band:nth-of-type(6) ul > li:nth-of-type(9) li:nth-of-type(4)',
            ],
            '.band:nth-of-type(6) ul > li:nth-of-type(10)',
            '.band:nth-of-type(6) ul > li:nth-of-type(11)',
            '.band:nth-of-type(6) ul > li:nth-of-type(12)',
            '.band:nth-of-type(6) ul > li:nth-of-type(13)',
            '.band:nth-of-type(6) ul > li:nth-of-type(14)',
            '.band:nth-of-type(6) ul > li:nth-of-type(15)',
        ],
    },
    compatibility: {
        title: '.band:nth-of-type(6) .col-md-6:nth-of-type(2) h2',
        description: '.band:nth-of-type(6) .col-md-6:nth-of-type(2) p',
    },
}

const completeOutput = {}

const extract = (node) => {
    const text = [...node.childNodes].find((child) => child.nodeType === 3)
    return text && text.textContent.trim()
}

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
            target[piece] = extract(element)
        }
    }
    Object.entries(queryMap).forEach(([piece, query]) =>
        getPiece(piece, query, outputData)
    )
    writeFileSync(outputPath, JSON.stringify(outputData))
})

const completeOutputPath = join(__dirname, 'json', 'complete.json')
writeFileSync(completeOutputPath, JSON.stringify(completeOutput))
