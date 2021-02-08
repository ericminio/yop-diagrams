const { expect } = require('chai')
const { emptyDiagram } = require('../../../lib/components')
const { absolutePosition } = require('../../../lib/geometry')

describe('size', ()=>{

    it('is easy for one component', ()=>{
        let input = {
            components: [
                { name:'Secret Box', row:0, column:0, width:20, height:5 }
            ]
        }
        input.components.forEach((component)=>{
            component.absolutePosition = absolutePosition(component, input.components)
        })
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
        input.components.forEach((component)=>{
            component.absolutePosition = absolutePosition(component, input.components)
        })
        let diagram = emptyDiagram(input)
        
        expect(diagram.length).to.equal(5)
        for (var i=0; i<diagram.length; i++) {
            expect(diagram[i].length).to.equal(20)    
        }
    })
})
