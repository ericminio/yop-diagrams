const { expect } = require('chai')
const { create } = require('../../lib/components')
const { quiet } = require ('../quiet')

describe('link', ()=>{

    it('is aligned with names', ()=>{
        let input = {
            components: [
                { name:'One', x:3, y:0, width:10, height:4 },
                { name:'Two', x:3, y:15, width:10, height:4 }
            ],
            links: [
                { start:'First Box', end:'Second Box' }
            ]
        }
        let expected = quiet(`
            +--------+     +--------+
            | One    |-----| Two    |
            |        |     |        |
            +--------+     +--------+                              
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
