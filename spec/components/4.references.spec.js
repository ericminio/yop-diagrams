const { expect } = require('chai')
const { create } = require('../../lib/components')
const { quiet } = require ('../quiet')

describe('references', ()=>{

    it('allows relative position of component', ()=>{
        let input = {
            components: [
                { name:'One', row:0, column:0, width:10, height:4 },
                { name:'Two', row:6, column:10, width:10, height:4 },
                { name:'Three', origin:'Two', row:0, column:15, width:10, height:3 }
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
    it('is transitive', ()=>{
        let input = {
            components: [
                { name:'One', row:0, column:7, width:10, height:3 },
                { name:'Two', origin:'One', row:6, column:-7, width:10, height:3 },
                { name:'Three', origin:'Two', row:0, column:15, width:10, height:3 }
            ]
        }
        let expected = quiet(`
                   +--------+ 
                   | One    |
                   +--------+

            +--------+     +--------+
            | Two    |     | Three  |
            +--------+     +--------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
    it('applies to links', ()=>{
        let input = {
            components: [
                { name:'One', row:0, column:7, width:10, height:3 },
                { name:'Two', origin:'One', row:6, column:-7, width:10, height:3 },
                { name:'Three', origin:'Two', row:0, column:15, width:10, height:3 },
                { name:'Four', origin:'Three', row:0, column:12, width:10, height:3 }
            ],
            links: [
                { origin:'Three', path: [
                    { row:1, column:10 }, { row:1, column:11 }
                ]}
            ]
        }
        let expected = quiet(`
                   +--------+ 
                   | One    |
                   +--------+

            +--------+     +--------+  +--------+
            | Two    |     | Three  |--| Four   |
            +--------+     +--------+  +--------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
