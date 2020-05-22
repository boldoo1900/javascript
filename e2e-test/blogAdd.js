const puppeteer = require('puppeteer')
const screenshot = 'bloglist.png';

function run() {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: null,
        slowMo: 100,
        args: [
          '--window-size=1920,1080',
        ]
      })

      const page = await browser.newPage()
      await page.goto('localhost:8000/login')
      await page.setDefaultNavigationTimeout(90000);

      await page.type('#email', "test@yahoo.com")
      await page.type('#password', "12345678")
      await page.click('[name="btnLogin"]')
      // await page.waitForNavigation()
      await page.waitForSelector('a#Blog');

      // dashboard
      const pageBloglist = await page.$('a#Blog');
      await pageBloglist.click()                                  // redirect Blog list page
      await page.waitForSelector('#blogAdd');

      // // // show blog list
      const pageBlogAdd = await page.$('#blogAdd');
      await pageBlogAdd.click()                                   // redirect Blog Add page
      await page.waitForSelector("#blog_name");

      // fill form 
      await page.type("input[name='blog_name']", "blog name")
      await page.type("input[name='sub_title']", "blog title")
      await page.click('.btn-primary')

      await page.screenshot({ path: screenshot })
      browser.close()

      return resolve("SUCCESS");
    } catch (e) {
      return reject(e);
    }
  })
}
run().then(console.log).catch(console.error);