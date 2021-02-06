const { expect } = require('chai')
const { create } = require('../../lib/components')
const { quiet } = require ('../quiet')

describe('link', ()=>{

    it('can be horizontal', ()=>{
        let input = {
            components: [
                { name:'One', row:3, column:0, width:10, height:4 },
                { name:'Two', row:3, column:15, width:10, height:4 }
            ],
            links: [
                { origin:'One', path: [
                    { row:1, column:10 }, { row:1, column:14 }
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
                { name:'One', row:0, column:0, width:10, height:4 },
                { name:'Two', row:6, column:0, width:10, height:4 }
            ],
            links: [
                { origin:'One', path: [
                    { row:4, column:2 }, { row:5, column:2 }
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
    it('can turn', ()=>{
        let input = {
            components: [
                { name:'One', row:0, column:0, width:10, height:4 },
                { name:'Two', row:6, column:10, width:10, height:4 }
            ],
            links: [
                { origin:'One', path: [
                    { row:4, column:2 }, { row:7, column:2 }, { row:7, column:9 }
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
              |       +--------+ 
              +-------| Two    |
                      |        |     
                      +--------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
    it('can go left and up', ()=>{
        let input = {
            components: [
                { name:'One', row:0, column:0, width:10, height:4 },
                { name:'Two', row:6, column:10, width:10, height:4 }
            ],
            links: [
                { origin:'Two', path: [
                    { row:1, column:-1 }, { row:1, column:-8 }, { row:-2, column:-8 }
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
              |       +--------+ 
              +-------| Two    |
                      |        |     
                      +--------+
        `)
        let actual = quiet(create(input))

        expect(actual).to.deep.equal(expected)
    })
})
