const { expect } = require('chai')
const { create } = require('../lib/sequence')
const { quiet } = require ('./quiet')

describe('messages', ()=>{

    it('work', ()=>{
        let input = {
            config: {
                padding: 2,
                margin: 4
            },
            actors: [
                { name:'batman' },
                { name:'wonder womam' }
            ],
            steps: [
                { description:'batman -> wonder womam : hello'},
                { description:'batman -> wonder womam : dinner?'}
            ]
        }
        let expected = quiet(`
            +----------+    +----------------+
            |  batman  |    |  wonder womam  |
            +----------+    +----------------+
            |               |
            |hello          |
            |-------------->|
            |               |
            |dinner?        |
            |-------------->|
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
