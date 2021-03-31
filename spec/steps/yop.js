const { World, Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { quiet } = require('../quiet')

Given('I enter the following json', async (input)=> {             
    console.log(input)
    await World.page.input('#input', input)
})
When('I click generate', async ()=> {             
    await World.page.click('#generate')
})
Then('I see the following diagram', async (expected)=> {             
    let actual = await World.page.text('#diagram')

    expect(quiet(actual)).to.deep.equal(quiet(expected))
})
