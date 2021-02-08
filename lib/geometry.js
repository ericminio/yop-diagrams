let translate = (point, translation)=>{
    return {
        row: point.row + translation.row,
        column: point.column + translation.column
    }
}
let absolutePosition = (component, components)=>{
    let origin = { row:component.row, column:component.column }
    let current = component
    while (current.origin !== undefined) {
        let parent = components.filter(c => c.name==current.origin)[0] 
        origin.row += parent.row
        origin.column += parent.column
        current = parent
    }
    return origin
}

module.exports = {
    translate:translate,
    absolutePosition:absolutePosition
}