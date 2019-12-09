#!/usr/bin/env node

const { create } = require('./lib')
let fs = require('fs')
let path = require('path')

let input = JSON.parse(fs.readFileSync(path.join('.', process.argv[2])).toString())
let diagram = create(input)

console.log(diagram)