const { createBrowserDriver } = require('./browser')
const { HomePage } = require('./pages')

module.exports = async(driver)=> {
    driver = driver || createBrowserDriver()
    let home = await HomePage(driver)
    
    return home
}
