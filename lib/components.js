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

let create = (input)=>{
    let diagram = emptyDiagram(input)

    input.components.forEach((component)=>{
        let origin = component.reference 
            ? input.components.filter(c => c.name==component.reference)[0] 
            : undefined
        
        drawBox(component, diagram, origin)
    })

    if (input.links) {
        input.links.forEach((link)=>{
            for (var i=0; i<link.path.length-1; i++) {
                let start = link.path[i]
                let end = link.path[i+1]
                if (start.row == end.row) {
                    drawHorizontalLines(diagram, start.row, start.column, end.column)
                }
                else {
                    drawVerticalLines(diagram, start.row, end.row, start.column)
                }
            }
            for (var i=0; i<link.path.length-1; i++) {
                if (i < link.path.length - 2) {
                    let end = link.path[i+1]
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
