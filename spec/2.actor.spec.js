const { expect } = require('chai')
const { create } = require('../lib/sequence')
const { quiet } = require ('./quiet')

describe('actor', ()=>{

    it('is covered', ()=>{
        let input = {
            actors: [
                { name:'superman' }
            ]
        }
        let expected = quiet(`
            +----------+
            | superman |
            +----------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
    it('has default padding', ()=>{
        let input = {
            config: {
                padding: 3
            },
            actors: [
                { name:'superman' }
            ]
        }
        let expected = quiet(`
            +--------------+
            |   superman   |
            +--------------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
