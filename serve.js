let http = require('http')
let serving = require('./lib/server')

let server = http.createServer(serving)
server.port = 5001
server.listen(server.port, ()=>{
    console.log('listening on port ' + server.port + '...')
})