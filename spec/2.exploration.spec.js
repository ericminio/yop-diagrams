const { expect } = require('chai')
const { create } = require('../lib')
const { quiet } = require ('./quiet')

describe('column size', ()=>{

    it('is calculated', ()=>{
        let input = `
            contributors: 
              - max
              - bob
              - santa
        `
        let expected = quiet(`
            +-----+ +-----+ +-------+
            | max | | bob | | Santa |
            +-----+ +-----+ +-------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})