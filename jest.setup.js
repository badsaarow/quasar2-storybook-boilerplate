const playwright = require('playwright')
const { setConfig } = require('storybook-addon-playwright/configs')
const { toMatchScreenshots } = require('storybook-addon-playwright')

expect.extend({ toMatchScreenshots })

let browser = {}

beforeAll(async () => {
  browser = {
    chromium: await playwright['chromium'].launch(),
    firefox: await playwright['firefox'].launch(),
    webkit: await playwright['webkit'].launch()
  }
  setConfig({
    storybookEndpoint: `http://localhost:6006/`, // or  `./storybook-static`
    getPage: async (browserType, options) => {
      const page = await browser[browserType].newPage(options)
      return page
    },
    afterScreenshot: async page => {
      await page.close()
    }
  })
})

afterAll(async () => {
  const promises = Object.keys(browser).map(browserType =>
    browser[browserType].close()
  )
  await Promise.resolve(promises)
})
