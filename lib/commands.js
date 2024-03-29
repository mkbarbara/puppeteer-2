module.exports = {
    clickElement: async function (page, selector) {
        console.log(page, selector)
        try {
            await page.waitForSelector(selector);
            await page.click(selector);
        } catch (error) {
            throw new Error(`Selector is not clickable: ${selector}`);
        }
    },
};