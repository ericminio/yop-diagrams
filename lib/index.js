let box = (actor, config)=> {
    let padding = config && config.padding ? config.padding : 1
    let border = Array(2*padding + actor.name.length+1).join('-')
    let space = Array(padding+1).join(' ')
    let lines = [
        '+' + border + '+',
        '|' + space + actor.name + space + '|',
        '+' + border + '+',
    ]
    return lines
}
let create = (input)=>{
    let lines = []

    let boxes = []
    let height = 0
    for (var i=0; i<input.actors.length; i++) {
        let actor = input.actors[i]
        let actorBox = box(actor, input.config)
        boxes.push(actorBox)
        if (actorBox.length > height) {
            height = actorBox.length
        }
    }

    let padding = input.config && input.config.padding ? input.config.padding : 1
    let margin = input.config && input.config.margin ? input.config.margin : 3
    let space = Array(margin+1).join(' ')
    for (var i=0; i<height; i++) {
        let line = ''
        for (var j=0; j<boxes.length; j++) {
            line += boxes[j][i]
            line += space
        }
        lines.push(line)
    }

    if (input.steps) {
        let pattern = /(.*) -> (.*) : (.*)/
        let fields = pattern.exec(input.steps[0].description)
        let from = fields[1]
        let action = fields[3]
        let space = Array(2*padding+margin + from.length + 2).join(' ')
        let arrow = Array(2*padding+margin + from.length + 1).join('-')
        lines.push('|'+space+'|')
        lines.push(`|${action}            |`)
        lines.push('|'+arrow+'>|')
    }

    return lines.join('\n')
}

module.exports = {
    create:create
}
