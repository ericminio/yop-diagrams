let quiet = (s)=>{
    return s.split('\n').map(x=> x.trim()).filter(x => x.length > 0)
}

module.exports = {
    quiet:quiet
}