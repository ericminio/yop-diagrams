let { 
    drawBox,
    drawHorizontalLines,
    drawVerticalLines,
    drawCorner
 } = require('./box')

let emptyDiagram = (input)=> {
    let diagram = []
    let height = input.components.reduce((acc, curr)=> acc+curr.x+curr.height, 0)
    let width = input.components.reduce((acc, curr)=> acc+curr.y+curr.width, 0)
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
        drawBox(component, diagram)    
    })

    if (input.links) {
        input.links.forEach((link)=>{
            for (var i=0; i<link.path.length-1; i++) {
                let start = link.path[i]
                let end = link.path[i+1]
                if (start.x == end.x) {
                    drawHorizontalLines(diagram, start.x, start.y, end.y)
                }
                else {
                    drawVerticalLines(diagram, start.x, end.x, start.y)
                }
            }
            for (var i=0; i<link.path.length-1; i++) {
                if (i < link.path.length - 2) {
                    let end = link.path[i+1]
                    drawCorner(diagram, end.x, end.y)
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
