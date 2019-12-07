const { expect } = require('chai')
const { create } = require('../lib')
const { quiet } = require ('./quiet')

describe('message', ()=>{

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
                { description:'superman -> batman : hello'}
            ]
        }
        let expected = quiet(`
            +------------+    +----------+
            |  superman  |    |  batman  |
            +------------+    +----------+
            |                 |
            |hello            |
            |---------------->|
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })

    it('support long message', ()=>{
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
                { description:'superman -> batman : sure we can be friends'}
            ]
        }
        let expected = quiet(`
            +------------+           +----------+
            |  superman  |           |  batman  |
            +------------+           +----------+
            |                        |
            |sure we can be friends  |
            |----------------------->|
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
