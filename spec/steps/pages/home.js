const { Page } = require('./page')

module.exports = async(driver) => {
    let page = new Page(driver)
    await page.open(`http://localhost:5001/`)

    return page
}