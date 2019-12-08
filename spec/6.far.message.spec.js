const { expect } = require('chai')
const { create } = require('../lib')
const { quiet } = require ('./quiet')

describe('far message', ()=>{

    it('still forces origin column width', ()=>{
        let input = {
            config: {
                padding: 2,
                margin: 4
            },
            actors: [
                { name:'superman' },
                { name:'batman' },
                { name:'wonder womam' }
            ],
            steps: [
                { description:'superman -> wonder womam : can you help with that bat?'}
            ]
        }
        let expected = quiet(`
            +------------+                +----------+    +----------------+
            |  superman  |                |  batman  |    |  wonder womam  |
            +------------+                +----------+    +----------------+
            |                             |               |
            |can you help with that bat?  |               |
            |-------------------------------------------->|
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
