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
    let actor = input.actors[0]
    let actorBox = box(actor, input.config)
    
    return actorBox.join('\n')
}

module.exports = {
    create:create
}
