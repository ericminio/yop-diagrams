const { expect } = require('chai')
const { create } = require('../lib')
const { quiet } = require ('./quiet')

describe('multi-lines message', ()=>{

    it('works', ()=>{
        let input = {
            config: {
                padding: 2,
                margin: 4
            },
            actors: [
                { name:'superman' },
                { name:'batman' }
            ],
            steps: [
                { description:`superman -> batman : Hello :)\nNeed help ?`},
                { description:`batman -> superman : One minute, I've got this\nThank you btw`},
            ]
        }
        let expected = quiet(`
            +------------+              +----------+
            |  superman  |              |  batman  |
            +------------+              +----------+
            |                           |
            |Hello :)                   |
            |Need help ?                |
            |-------------------------->|
            |                           |
            |  One minute, I've got this|
            |              Thank you btw|
            |<--------------------------|
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
