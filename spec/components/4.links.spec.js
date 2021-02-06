const { expect } = require('chai')
const { create } = require('../../lib/components')
const { quiet } = require ('../quiet')

describe('links', ()=>{

    it('is available', ()=>{
        let input = {
            components: [
                { name:'One', x:0, y:0, width:10, height:4 },
                { name:'Two', x:6, y:10, width:10, height:4 },
                { name:'Three', x:6, y:25, width:10, height:3 }
            ],
            links: [
                { name:'One-Two', path: [
                    { x:4, y:2 }, { x:7, y:2 }, { x:7, y:9 }
                ]},
                { name:'Two-Three', path: [
                    { x:7, y:20 }, { x:7, y:24 }
                ]}
            ]
        }
        let expected = quiet(`
            +--------+ 
            | One    |
            |        |     
            +--------+
              |
              |
              |       +--------+     +--------+
              +-------| Two    |-----| Three  |
                      |        |     +--------+
                      +--------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
