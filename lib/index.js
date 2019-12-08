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

let computeColumnsWidth = (input)=> {
    let config = input.config
    let columns = []
    for (var i=0; i<input.actors.length; i++) {
        let actor = input.actors[i]
        let column = {
            actor:actor,
            width:boxWidth(actor.name, config)
        }
        columns.push(column)
    }
    if (input.steps) {
        for (var i=0; i<input.steps.length; i++) {
            let step = input.steps[i]            
            let fields = pattern.exec(step.description)
            let from = fields[1]
            let action = fields[3]
            let column = columns.find(c => c.actor.name == from)
            if ((action.length + 2 + config.trailing)> column.width) {
                column.width = action.length + 2 + config.trailing
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
let write = (text, diagram, start, line)=>{
    for (var j=0;j<text.length; j++) {
        var c = text.split('')[j]
        diagram[line][start +j] = c
    }
}

let create = (input)=>{
    let config = cleanConfig(input).config
    let columns = computeColumnsWidth(input)
    columns = computeColumnsPosition(columns, input)

    let diagram = emptyDiagram(columns, input)
    for (var i=0; i<columns.length; i++) {
        let column = columns[i]
        let actor = column.actor
        let start = column.x
        let end = start + config.padding+1 + actor.name.length + config.padding

        diagram[0][start] = '+'
        for (var x=start+1;x<end; x++) {
            diagram[0][x]='-'
        }
        diagram[0][end] = '+'

        diagram[1][start] = '|'
        write(actor.name, diagram, start + config.padding+1, 1)
        diagram[1][end] = '|'

        diagram[2][start] = '+'
        for (var x=start+1;x<end; x++) { diagram[2][x]='-' }
        diagram[2][end] = '+'
    }

    if (input.steps) {
        let y = 3

        let step = input.steps[0]

        columns.forEach((column)=>{
            diagram[y][column.x] = '|'
            diagram[y+2][column.x] = '|'
        })

        let fields = pattern.exec(step.description)
        let from = columns.find(c => c.actor.name == fields[1])
        let to = columns.find(c => c.actor.name == fields[2])
        let action = fields[3]

        diagram[y+1][from.x] = '|'
        diagram[y+1][to.x] = '|'
        write(action, diagram, from.x+1, y+1)

        for (var x=from.x+1;x<to.x; x++) {
            diagram[y+2][x] = '-'
        }
        diagram[y+2][to.x-1] = '>'
    }


    let lines = diagram.map(l => l.join(''));

    return lines.join('\n')
}

module.exports = {
    create:create
}
