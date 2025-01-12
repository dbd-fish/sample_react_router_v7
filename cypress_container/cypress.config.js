const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://frontend:5173', // テスト対象のURL
    specPattern: 'e2e/cypress/**/*.cy.js', // 修正: 正しいパスを指定
    supportFile: 'cypress/support/e2e.js', //     // ブラウザ設定を追加
    // browser: {
    //   chromiumArgs: ['--no-sandbox', '--disable-setuid-sandbox']
    // }

  },
});
