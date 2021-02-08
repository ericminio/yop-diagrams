let { 
    drawBox,
    drawHorizontalLines,
    drawVerticalLines,
    drawCorner
 } = require('./box')
 let {
     translate,
     absolutePosition
 } = require('./geometry')

let create = (input)=>{
    input.components.forEach((component)=>{
        component.absolutePosition = absolutePosition(component, input.components)
    })
    let diagram = emptyDiagram(input)
    input.components.forEach((component)=>{
        drawBox(component, diagram)
    })
    input.links = input.links || []
    input.links.forEach((link)=>{
        let component = input.components.find(c => c.name==link.origin)
        link.path.forEach((point)=>{
            point.absolutePosition = translate(point, component.absolutePosition)
        })
        for (var i=0; i<link.path.length-1; i++) {
            let start = link.path[i].absolutePosition
            let end = link.path[i+1].absolutePosition
            start.row == end.row ?
                drawHorizontalLines(diagram, start.row, start.column, end.column) :
                drawVerticalLines(diagram, start.row, end.row, start.column)            
        }
        for (var i=0; i<link.path.length-1; i++) {
            if (i < link.path.length - 2) {
                let end = link.path[i+1].absolutePosition
                drawCorner(diagram, end.row, end.column)
            }
        }
    })

    let lines = diagram.map(l => l.join(''));
    return lines.join('\n')
}

let emptyDiagram = (input)=> {
    let diagram = []
    let height = 0
    let width = 0
    input.components.forEach((component)=>{
        let position = component.absolutePosition
        if (position.row + component.height > height) {
            height = position.row + component.height
        }
        if (position.column + component.width > width) {
            width = position.column + component.width
        }
    })
    for (var n=0; n<height; n++) {
        let line = []
        for (var i=0; i<width; i++) {
            line.push(' ')
        }
        diagram.push(line)
    }
    return diagram
}

module.exports = {
    create:create,
    createComponentDiagram:create,
    emptyDiagram:emptyDiagram
}
