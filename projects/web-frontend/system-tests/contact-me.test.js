const test = require('tape');
const { Builder, By, Key, until } = require('selenium-webdriver');

test('contact me', async t => {
    const driver = new Builder().forBrowser('safari').build();

    try {
        await driver.get('http://' + process.env.DOMAIN_NAME);
        await driver.findElement(By.name('name')).sendKeys('Matthew');
        await driver.findElement(By.name('email')).sendKeys('matthew@matthewriley.name');
        await driver.findElement(By.name('phone')).sendKeys('0430512239');
        await driver.findElement(By.name('message')).sendKeys('How much for the van package?');
        await driver.findElement(By.css('button')).click();
    }
    finally {
    //    await driver.quit();
    }

    t.end();
});
