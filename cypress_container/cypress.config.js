const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://frontend:5173', // テスト対象のURL
    specPattern: [
       'e2e/cypress/**/*.cy.js', //ローカル環境におけるE2Eテスト
      'front_st/**/*.cy.js',  //画面単位のテスト
    ], 
    supportFile: 'cypress/support/e2e.js', //     // ブラウザ設定を追加
    // browser: {
    //   chromiumArgs: ['--no-sandbox', '--disable-setuid-sandbox']
    // }

  },
});
