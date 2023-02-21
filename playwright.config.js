// @ts-check
const { devices } = require('@playwright/test');


const config = {
  testDir: './tests',
  retries : 1,
  /* Maximum time one test can run for. */
  timeout: 90 * 1000,
  expect: {
    timeout: 30000
  },

  use: {
    screenshot: 'on',//'only-on-failure',
    viewport: null,
    launchOptions: {
      args: ["--start-fullscreen"]
    },
    //...devices["Desktop Firefox"]
  },

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: 'chrome',
      use: {
        viewport: null,
        browserName: "chromium",
        headless: false,
        screeshot: 'on',//'only-on-failure', 'on',
        trace: 'retain-on-failure', //'on', 'off'
        video: 'on',//'on-first-retry',
        launchOptions: {
          args: ["--start-maximized"]
        },
      },
    },
    {
      name: 'firefox',
      use: {
        //viewport : null,
        browserName: "firefox",
        headless: true,
        screeshot: 'only-on-failure',
        trace: 'retain-on-failure', //'on', 'off'
        video: 'on-first-retry',
        launchOptions: {
          args: ["--start-maximized"]
        },
        ...devices['Desktop Firefox']
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: "webkit",
        headless: false,
        screeshot: 'only-on-failure',
        trace: 'retain-on-failure', //'on', 'off'
        //video: 'on-first-retry',
      },
    },
  ],
};

module.exports = config;
