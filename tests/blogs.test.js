const Page = require('./helpers/page')
let page

beforeEach(async () => {
  page = await Page.build()
  await page.goto('localhost:3000')
})

afterEach(async () => {
  await page.close()
})

describe('When logged in', async () => {
  beforeEach(async () => {
    await page.login()
    await page.click('a.btn-floating')
  })

  test('Can see blog create form', async () => {
    const label = await page.getContentOf('form label')
    expect(label).toEqual('Blog Title')
  })

  describe('And using invalid inputs', async () => {
    beforeEach(async () => {
      await page.click('form button')
    })

    test('the form show error message', async () => {
      const titleError = await page.getContentOf('.title .red-text')
      const contentError = await page.getContentOf('.content .red-text')

      expect(titleError).toEqual('You must provide a value')
      expect(contentError).toEqual('You must provide a value')
    })
  })
})
