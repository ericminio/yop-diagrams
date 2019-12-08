let pattern = /(.*) -> (.*) : (.*)/
let cleanConfig = (input)=> {
    let padding = input.config && input.config.padding ? input.config.padding : 1
    let margin = input.config && input.config.margin ? input.config.margin : 3
    let trailing = input.config && input.config.trailing ? input.config.trailing : 1

    input.config = {
        padding:padding,
        margin:margin,
        trailing:trailing
    }
    return input
}
let boxWidth = (text, config)=> {
    return text.length + 2*config.padding + 2
}
let extractData = (step, columns)=> {
    let fields = pattern.exec(step.description)
    let from = columns.find(c => c.actor.name == fields[1])
    let to = columns.find(c => c.actor.name == fields[2])
    let action = fields[3]

    return { from:from, to:to, action:action }
}
let isLeftMessage = (from, to)=>{
    return to.index < from.index
}
let computeColumnsWidth = (input)=> {
    let config = input.config
    let columns = []
    for (var i=0; i<input.actors.length; i++) {
        let actor = input.actors[i]
        let column = {
            index: i,
            actor:actor,
            width:boxWidth(actor.name, config)
        }
        columns.push(column)
    }
    if (input.steps) {
        for (var i=0; i<input.steps.length; i++) {
            let step = input.steps[i]  
            let { from, to, action } = extractData(step, columns)
            
            let mayNeedEnlargement = from
            if (isLeftMessage(from, to)) {
                mayNeedEnlargement = columns.find(c => c.index == (from.index-1))
            }
            if ((action.length + 2 + config.trailing)> mayNeedEnlargement.width) {
                mayNeedEnlargement.width = action.length + 2 + config.trailing
            }
        }
    }
    return columns
}
let computeColumnsPosition = (columns, input)=> {
    let config = input.config
    for (var i=0; i<columns.length; i++) {
        let column = columns[i]
        column.x = i==0? 0 : columns[i-1].x + columns[i-1].width
        if (i>0) {
            let delta = column.x - (columns[i-1].x+boxWidth(columns[i-1].actor.name, config) +config.margin)
            if (delta < 0) {
                column.x += -delta
            }
        }
    }
    return columns
}
let emptyDiagram = (columns, input)=> {
    let config = input.config
    let totalWidth = columns.reduce((acc, curr)=> acc + curr.width, 0) + (columns.length-1)*config.margin
    let diagram = []
    let height = 3
    if (input.steps) {
        height += 3*input.steps.length
    }
    for (var n=0; n<height; n++) {
        let line = []
        for (var i=0; i<totalWidth; i++) {
            line.push(' ')
        }
        diagram.push(line)
    }
    return diagram
}
let writeRight = (text, diagram, start, line)=>{
    let letters = text.split('')
    for (var j=0;j<text.length; j++) {
        var c = letters[j]
        diagram[line][start +j] = c
    }
}
let writeLeft = (text, diagram, start, line)=>{
    let letters = text.split('').reverse()
    for (var j=0;j<text.length; j++) {
        var c = letters[j]
        diagram[line][start -j] = c
    }
}
let drawBoxAround = (text, diagram, start, end, config)=>{
    diagram[0][start] = '+'
    for (var x=start+1;x<end; x++) {
        diagram[0][x]='-'
    }
    diagram[0][end] = '+'

    diagram[1][start] = '|'
    writeRight(text, diagram, start + config.padding+1, 1)
    diagram[1][end] = '|'

    diagram[2][start] = '+'
    for (var x=start+1;x<end; x++) { diagram[2][x]='-' }
    diagram[2][end] = '+'
}
let drawRightArrow = (diagram, start, end, line)=>{
    for (var x=start;x<end; x++) {
        diagram[line][x] = '-'
    }
    diagram[line][end-1] = '>'
}
let drawLeftArrow = (diagram, start, end, line)=>{
    for (var x=start;x>end; x--) {
        diagram[line][x] = '-'
    }
    diagram[line][end+1] = '<'
}
let create = (input)=>{
    let config = cleanConfig(input).config
    let columns = computeColumnsWidth(input)
    columns = computeColumnsPosition(columns, input)

    let diagram = emptyDiagram(columns, input)
    for (var i=0; i<columns.length; i++) {
        let column = columns[i]
        let start = column.x
        let end = start + config.padding+1 + column.actor.name.length + config.padding

        drawBoxAround(column.actor.name, diagram, start, end, config)
    }

    if (input.steps) {
        for (var y = 3, i=0; i<input.steps.length; i++, y+= 3) {

            let step = input.steps[i]

            columns.forEach((column)=>{
                diagram[y][column.x] = '|'
                diagram[y+1][column.x] = '|'        
                diagram[y+2][column.x] = '|'
            })
            let { from, to, action } = extractData(step, columns)
                        
            if (isLeftMessage(from, to)) {
                writeLeft(action, diagram, from.x-1, y+1)
                drawLeftArrow(diagram, from.x-1, to.x, y+2)
            }
            else {
                writeRight(action, diagram, from.x+1, y+1)
                drawRightArrow(diagram, from.x+1, to.x, y+2)
            }
        }
    }


    let lines = diagram.map(l => l.join(''));

    return lines.join('\n')
}

module.exports = {
    create:create
}
