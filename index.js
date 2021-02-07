#!/usr/bin/env node

const { createSequenceDiagram } = require('./lib')
const { createComponentDiagram } = require('./lib/components')
let fs = require('fs')
let path = require('path')

let definition = fs.readFileSync(path.join('.', process.argv[2])).toString()
let input = JSON.parse(definition)
let diagram = 'Unknown json format' 

if (definition.includes('actors')) {
    diagram = createSequenceDiagram(input)
}
if (definition.includes('components')) {
    diagram = createComponentDiagram(input)
}


console.log(diagram)