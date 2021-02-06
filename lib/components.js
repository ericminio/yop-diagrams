let { 
    drawBox,
    drawHorizontalLines,
    drawVerticalLines,
    drawCorner
 } = require('./box')

let emptyDiagram = (input)=> {
    let diagram = []
    let height = input.components.reduce((acc, curr)=> acc+curr.row+curr.height, 0)
    let width = input.components.reduce((acc, curr)=> acc+curr.column+curr.width, 0)
    for (var n=0; n<height; n++) {
        let line = []
        for (var i=0; i<width; i++) {
            line.push(' ')
        }
        diagram.push(line)
    }
    return diagram
}
let translated = (component, components)=>{
    let origin = { row:component.row, column:component.column }
    let current = component
    while (current.reference !== undefined) {
        let parent = components.filter(c => c.name==current.reference)[0] 
        origin.row += parent.row
        origin.column += parent.column
        current = parent
    }
    return origin
}
let translate = (point, translation)=>{
    return {
        row: point.row + translation.row,
        column: point.column + translation.column
    }
}
let create = (input)=>{
    let diagram = emptyDiagram(input)

    input.components.forEach((component)=>{
        let origin = translated(component, input.components)
        drawBox(component, diagram, origin)
    })

    if (input.links) {
        input.links.forEach((link)=>{
            let component = input.components.filter(c => c.name==link.origin)[0] 
            let origin = translated(component, input.components)

            for (var i=0; i<link.path.length-1; i++) {
                let start = translate(link.path[i], origin)
                let end = translate(link.path[i+1], origin)
                if (start.row == end.row) {
                    drawHorizontalLines(diagram, start.row, start.column, end.column)
                }
                else {
                    drawVerticalLines(diagram, start.row, end.row, start.column)
                }
            }
            for (var i=0; i<link.path.length-1; i++) {
                if (i < link.path.length - 2) {
                    let end = translate(link.path[i+1], origin)
                    drawCorner(diagram, end.row, end.column)
                }
            }
        })
    }
    
    let lines = diagram.map(l => l.join(''));
    return lines.join('\n')
}

module.exports = {
    create:create
}
