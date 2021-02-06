let drawBox = require('./box')

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
    
    let lines = diagram.map(l => l.join(''));
    return lines.join('\n')
}

module.exports = {
    create:create
}
