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
let create = (input)=>{
    input.components.forEach((component)=>{
        component.absolutePosition = absolutePosition(component, input.components)
    })
    input.links = input.links || []
    
    let diagram = emptyDiagram(input)

    input.components.forEach((component)=>{
        drawBox(component, diagram)
    })
    input.links.forEach((link)=>{
        let component = input.components.filter(c => c.name==link.origin)[0] 
        let position = component.absolutePosition

        for (var i=0; i<link.path.length-1; i++) {
            let start = translate(link.path[i], position)
            let end = translate(link.path[i+1], position)
            if (start.row == end.row) {
                drawHorizontalLines(diagram, start.row, start.column, end.column)
            }
            else {
                drawVerticalLines(diagram, start.row, end.row, start.column)
            }
        }
        for (var i=0; i<link.path.length-1; i++) {
            if (i < link.path.length - 2) {
                let end = translate(link.path[i+1], position)
                drawCorner(diagram, end.row, end.column)
            }
        }
    })
    let lines = diagram.map(l => l.join(''));
    return lines.join('\n')
}

module.exports = {
    create:create,
    createComponentDiagram:create,
    emptyDiagram:emptyDiagram
}
