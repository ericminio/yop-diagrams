const { expect } = require('chai')
const { create } = require('../../lib/components')
const { quiet } = require ('../quiet')

describe('refrences', ()=>{

    it('allows relative position of component', ()=>{
        let input = {
            components: [
                { name:'One', row:0, column:0, width:10, height:4 },
                { name:'Two', row:6, column:10, width:10, height:4 },
                { name:'Three', reference:'Two', row:0, column:15, width:10, height:3 }
            ]
        }
        let expected = quiet(`
            +--------+ 
            | One    |
            |        |     
            +--------+
              
              
                      +--------+     +--------+
                      | Two    |     | Three  |
                      |        |     +--------+
                      +--------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
