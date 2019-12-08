const { create } = require('./lib')
let fs = require('fs')
let path = require('path')

let input = JSON.parse(fs.readFileSync(path.join(__dirname, 'demo', process.argv[2])).toString())
console.log(input)

let diagram = create(input)
console.log(diagram)