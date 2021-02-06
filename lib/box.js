let drawCorner = (diagram, x, y)=>{
    diagram[x][y] = '+'
}
let drawHorizontalLine = (diagram, x, y)=>{
    diagram[x][y] = '-'
}
let drawVerticalLine = (diagram, x, y)=>{
    diagram[x][y] = '|'
}
let drawCorners = (component, diagram, x, y)=> {
    drawCorner(diagram, x, y)
    drawCorner(diagram, x, y+component.width-1)
    drawCorner(diagram, x+component.height-1, y)
    drawCorner(diagram, x+component.height-1, y+component.width-1)
}
let drawHorizontalLines = (diagram, x, startY, endY)=>{
    for (var j=startY;j<endY; j++) {
        drawHorizontalLine(diagram, x, j)
    }
}
let drawHorizontalBorder = (component, diagram, x, y)=>{
    drawHorizontalLines(diagram, x, y+1, y+component.width-1)
}
let drawVerticalBorder = (component, diagram, x, y)=>{
    for (var i=x+1;i<x+component.height-1; i++) {
        drawVerticalLine(diagram, i, y)
    }
}
let write = (text, diagram, x, y)=>{
    let letters = text.split('')
    for (var j=0;j<text.length; j++) {
        var c = letters[j]
        diagram[x][y+j] = c
    }
}

let drawBox = (component, diagram)=>{
    let x = component.x
    let y = component.y
    drawCorners(component, diagram, x, y)
    drawHorizontalBorder(component, diagram, x, y)
    drawHorizontalBorder(component, diagram, x+component.height-1, y)
    drawVerticalBorder(component, diagram, x, y)
    drawVerticalBorder(component, diagram, x, y+component.width-1)
    write(component.name, diagram, x+1, y+2)
}
module.exports = {
    drawBox:drawBox,
    drawHorizontalLines:drawHorizontalLines
}