let emptyDiagram = (input)=> {
    let diagram = []
    let height = input.components.reduce((acc, curr)=> acc+curr.height, 0)
    let width = input.components.reduce((acc, curr)=> acc+curr.width, 0)
    for (var n=0; n<height; n++) {
        let line = []
        for (var i=0; i<width; i++) {
            line.push(' ')
        }
        diagram.push(line)
    }
    return diagram
}
let writeRight = (text, diagram, x, y)=>{
    let letters = text.split('')
    for (var j=0;j<text.length; j++) {
        var c = letters[j]
        diagram[x][y+j] = c
    }
}
let drawBoxAround = (component, diagram, x, y)=>{
    diagram[x][y] = '+'
    for (var j=y+1;j<y+component.width-1; j++) {
        diagram[x][j]='-'
    }
    diagram[x][y+component.width-1] = '+'

    diagram[x+1][y] = '|'
    writeRight(component.name, diagram, x+1, y+2)
    diagram[x+1][x+component.width-1] = '|'

    for (var i=0; i<component.height-3; i++) {
        diagram[x+2+i][y] = '|'
        diagram[x+2+i][x+component.width-1] = '|'
    }
    diagram[x+component.height-1][y] = '+'
    for (var j=y+1;j<y+component.width-1; j++) {
        diagram[x+component.height-1][j]='-'
    }
    diagram[x+component.height-1][y+component.width-1] = '+'
}
let create = (input)=>{
    let diagram = emptyDiagram(input)

    drawBoxAround(input.components[0], diagram, 0, 0)
    
    
    let lines = diagram.map(l => l.join(''));
    return lines.join('\n')
}

module.exports = {
    create:create
}
