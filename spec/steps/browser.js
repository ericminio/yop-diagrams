const { Builder } = require('selenium-webdriver')

module.exports = {
    createBrowserDriver: ()=> {
        const browser = ()=> new Builder()
            .withCapabilities({acceptInsecureCerts:true, browserName:'firefox'})
            .build()
        return browser()
    }
}