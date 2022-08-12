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

  describe('And using valid inputs', async () => {
    beforeEach(async () => {
      await page.type('.title input', 'My title')
      await page.type('.content input', 'My content')
      await page.click('form button')
    })

    test('Submitting takes user to review screen', async () => {
      const confirmText = await page.getContentOf('form h5')
      expect(confirmText).toEqual('Please confirm your entries')
    })

    test('Submitting then saving takes user to index page', async () => {
      await page.click('button.green')
      await page.waitFor('.card')

      const title = await page.getContentOf('.card-title')
      const content = await page.getContentOf('p')

      expect(title).toEqual('My title')
      expect(content).toEqual('My content')
    })
  })
})

describe('When User is not logged in', async () => {
  const actions = [
    {
      method: 'get',
      path: '/api/blogs'
    },
    {
      method: 'post',
      path: '/api/blogs',
      data: { title: 'My title', content: 'My content' }
    }
  ]
  test('Blog CRUD prohabited', async () => {
    const results = await page.execRequests(actions)
    for (const result of results) {
      expect(result).toEqual({ error: 'You must log in!' })
    }
  })
})
