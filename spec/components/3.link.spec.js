const { expect } = require('chai')
const { create } = require('../../lib/components')
const { quiet } = require ('../quiet')

describe('link', ()=>{

    it('can be horizontal', ()=>{
        let input = {
            components: [
                { name:'One', x:3, y:0, width:10, height:4 },
                { name:'Two', x:3, y:15, width:10, height:4 }
            ],
            links: [
                { name:'one-two', path: [
                    { x:4, y:10 }, { x:4, y:14 }
                ] }
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
    it('can be vertical', ()=>{
        let input = {
            components: [
                { name:'One', x:0, y:0, width:10, height:4 },
                { name:'Two', x:6, y:0, width:10, height:4 }
            ],
            links: [
                { name:'one-two', path: [
                    { x:4, y:2 }, { x:5, y:2 }
                ] }
            ]
        }
        let expected = quiet(`
            +--------+ 
            | One    |
            |        |     
            +--------+
              |
              |
            +--------+ 
            | Two    |
            |        |     
            +--------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
