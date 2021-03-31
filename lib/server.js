let fs = require('fs')
let code = fs.readFileSync('lib/sequence.js').toString()

module.exports = (request, response)=>{
    response.setHeader('content-type', 'text/html')
    let body = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8"/>    
                <style>
                    .big {
                        width: 100%;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                                box-sizing: border-box;
                    }
                </style>        
                <script>
                    let module = {}
                    
                    ${code}

                    function go(document) {
                        let input = document.querySelector('#input').value
                        console.log('input', input)
                        let json = JSON.parse(input)
                        console.log('json', json)

                        let diagram = create(json)
                        console.log(diagram)
                        let target = document.querySelector('#diagram')
                        target.innerHTML = '<pre>' + diagram + '</pre>'
                    }
                </script>
            </head>
            <body>
                <div>
                    <textarea id="input" class="big", rows="15"></textarea>
                </div>
                <button id="generate" onclick="go(document)">generate</button>                
                <div id="diagram"></diagram>
            </body>
        </html>
    `
    response.write(body)
    response.end()
}