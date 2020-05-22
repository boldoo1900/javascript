const puppeteer = require('puppeteer')
const screenshot = 'dashboard.png';

function run() {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: null, 
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

      let urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('a.list-group-item');
        items.forEach((item) => {
          results.push({
            url: item.getAttribute('href'),
            text: item.innerText,
          });
        });
        return results;
      })

      await page.screenshot({ path: screenshot })
      browser.close()

      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  })
}
run().then(console.log).catch(console.error);