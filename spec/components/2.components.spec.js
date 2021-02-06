const { expect } = require('chai')
const { create } = require('../../lib/components')
const { quiet } = require ('../quiet')

describe('components', ()=>{

    it('are covered', ()=>{
        let input = {
            components: [
                { name:'First Box', x:0, y:0, width:20, height:5 },
                { name:'Second Box', x:2, y:25, width:20, height:5 }
            ]
        }
        let expected = quiet(`
            +------------------+     
            | First Box        |     
            |                  |     +------------------+
            |                  |     | Second Box       |
            +------------------+     |                  |
                                     |                  |
                                     +------------------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
