const { expect } = require('chai')
const { create } = require('../lib')
const { quiet } = require ('./quiet')

describe('actors', ()=>{

    it('are covered', ()=>{
        let input = {
            actors: [
                { name:'superman' },
                { name:'batman' }
            ]
        }
        let expected = quiet(`
            +----------+   +--------+
            | superman |   | batman |
            +----------+   +--------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
    it('uses default margin', ()=>{
        let input = {
            config: {
                margin: 5,
                padding: 2
            },
            actors: [
                { name:'superman' },
                { name:'batman' },
                { name:'wonder woman' }
            ]
        }
        let expected = quiet(`
            +------------+     +----------+     +----------------+
            |  superman  |     |  batman  |     |  wonder woman  |
            +------------+     +----------+     +----------------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
