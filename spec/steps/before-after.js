const { World, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { createBrowserDriver } = require('./browser')
const openHome = require('./open-home')
setDefaultTimeout(-1);
let http = require('http')
let serving = require('../../lib/server')

Before(async (testCase)=>{
    console.log(`\ntestCase: ${testCase.pickle.name}`)
    World.server = http.createServer(serving)
    World.server.port = 5001
    await World.server.listen(World.server.port)

    World.driver = createBrowserDriver()
    World.home = await openHome(World.driver) 
    World.page = World.home
    World.mainWindow = await World.driver.getWindowHandle();
    console.log('Main window is ' + World.mainWindow)
})

After(async ()=>{
    await World.server.close()
    await World.driver.quit()
})
                                                                   