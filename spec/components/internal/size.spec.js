const { expect } = require('chai')
const { create, emptyDiagram } = require('../../../lib/components')

describe('size', ()=>{

    it('is easy for one component', ()=>{
        let input = {
            components: [
                { name:'Secret Box', row:0, column:0, width:20, height:5 }
            ]
        }
        let diagram = emptyDiagram(input)
        
        expect(diagram.length).to.equal(5)
        for (var i=0; i<diagram.length; i++) {
            expect(diagram[i].length).to.equal(20)    
        }
    })
    it('ignores internal component', ()=>{
        let input = {
            components: [
                { name:'One', row:0, column:0, width:20, height:5 },
                { name:'Two', row:0, column:0, width:10, height:3 }
            ]
        }
        let diagram = emptyDiagram(input)
        
        expect(diagram.length).to.equal(5)
        for (var i=0; i<diagram.length; i++) {
            expect(diagram[i].length).to.equal(20)    
        }
    })
})
