const puppeteer = require('puppeteer')
let browser, page

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()
  await page.goto('localhost:3000')
})

afterEach(async () => {
  await browser.close()
})

test('The header has correct text', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML)
  expect(text).toEqual('Blogster')
})

test('clicking login to start oauth flow', async () => {
  await page.click('.right a')
  const url = await page.url()
  expect(url).toMatch(/accounts\.google\.com/)
})

test('when sign in, shows log out button', async () => {
  const id = '62e4bd6960838031077a53d3'
  const Buffer = require('safe-buffer').Buffer
  const sessionObject = {
    passport: { user: id }
  }
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64')

  const Keygrip = require('keygrip')
  const keys = require('../config/keys')
  const keygrip = new Keygrip([keys.cookieKey])
  const sig = keygrip.sign('session=' + sessionString)
  console.log(sessionString)
  console.log(sig)
})
