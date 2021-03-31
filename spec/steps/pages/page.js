const { By } = require('selenium-webdriver')

var Page = function(driver, options) {
    this.driver = driver
}
Page.prototype.open = async function(url) {
    await this.driver.get(url)
}
Page.prototype.input = async function(selector, value) {
    let field = await this.element(selector)

    let tryAgain = true
    let totalWait = 0
    while (tryAgain) {
        try {
            await field.clear()
            tryAgain = false
        }
        catch(error) {
            if (totalWait < 60 * 1000) {
                await this.wait(1000)
                totalWait += 1000
            }
            else {
                tryAgain = false
                throw error
            }
        }
    }
    await field.sendKeys(value)
}
Page.prototype.click = async function(selector) {
    let element = await this.element(selector)
    let tryAgain = true
    let totalWait = 0
    while (tryAgain) {
        try {
            await element.click()
            tryAgain = false
        }
        catch(error) {
            if (totalWait < 60 * 1000) {
                await this.wait(1000)
                totalWait += 1000
            }
            else {
                tryAgain = false
                throw error
            }
        }
    }
}
Page.prototype.list = async function(selector) {
    let elements = await this.elements(selector)
    return elements
}
Page.prototype.text = async function(selector) {
    let element = await this.element(selector)
    return await element.getText()
}
Page.prototype.source = async function() {
    return await this.driver.getPageSource()
}
Page.prototype.wait = async function(ms) {
    console.log('waiting ' + ms +'ms...')
    await this.driver.sleep(ms)
}
Page.prototype.elements = async function(options) {
    var found
    var tryAgain = true
    var totalWait = 0
    while (tryAgain) {
        found = await this.driver.findElements(options.by(options.selector));
        if (found.length == 0 && totalWait < options.timeout) {
            tryAgain = true
            totalWait += 1000
            await this.wait(1000)
        }
        else {
            tryAgain = false
        }
    }
    return found
}
Page.prototype.element = async function(selector) {
    let elements = await this.allElements(selector)
    return elements[0]
}
Page.prototype.allElements = async function(selector) {
    console.log('waiting for element(s) with css ' + selector)
    
    let options = { by:By.css, selector:selector, timeout:60*1000 }
    let elements = await this.elements(options)
    return elements
}
Page.prototype.elementByName = async function(selector) {
    let options = { by:By.name, selector:selector, timeout:60*1000 }
    let elements = await this.elements(options)
    return elements[0]
}
Page.prototype.className = async function(selector) {
    let el = await this.element(selector)
    return await el.getAttribute('class')
}

module.exports = { Page:Page }
