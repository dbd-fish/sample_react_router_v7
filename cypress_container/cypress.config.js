const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://frontend:5173', // テスト対象のURL
    specPattern: [
       'e2e/cypress/**/*.cy.js', //ローカル環境におけるE2Eテスト
      'front_st/**/*.cy.js',  //画面単位のテスト
    ], 
    // NOTE: 原因不明なエラーで悩まされる場合はこのファイルでスキップするように定義する。
    supportFile: 'cypress/support/errorHandling.js', 
  },
});
