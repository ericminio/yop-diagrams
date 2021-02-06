const { expect } = require('chai')
const { create } = require('../../lib/components')
const { quiet } = require ('../quiet')

describe('component', ()=>{

    it('has a top-left positionned name', ()=>{
        let input = {
            components: [
                { name:'Secret Box', x:0, y:0, width:20, height:5 }
            ]
        }
        let expected = quiet(`
            +------------------+
            | Secret Box       |
            |                  |
            |                  |
            +------------------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
