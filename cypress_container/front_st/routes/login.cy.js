describe('ログイン画面の単体テスト', () => {

  let loginData;
  before(() => {
    // テストデータを読み込む
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  it('フォームに正しく入力して送信', () => {
    cy.visit('/login');

    // NOTE: これがないと以降の操作ができない
    // ページの読み込みを待つ
    cy.wait(1000); // または適切な時間

    // NOTE: ここで正しいemailとパスワードの組み合わせは別コンテナを参照する必要がある
    cy.get('input#email')
      .should('be.enabled') // 要素が有効になるまで待機
      .type(loginData.correctEmail);

    cy.get('input#password')
      .should('be.enabled')
      .type(loginData.correctPassword);

    cy.get('button[type="submit"]').click();
    cy.wait(1000); // または適切な時間
    // マイページ画面に遷移
    cy.url().should('eq', 'https://frontend:5173/mypage');
  });

  it('誤った情報でログインに失敗する', () => {

    cy.visit('/login');

    // ページの読み込みを待つ
    cy.wait(1000); // または適切な時間
    // 間違ったメールアドレスを入力
    cy.get('input#email')
      .should('be.enabled') // 要素が有効になるまで待機
      .type(loginData.incorrectEmail);
    cy.get('input#password')
      .should('be.enabled')
      .type(loginData.correctPassword);


    // ログインボタンをクリック
    cy.get('button').contains('ログイン').click();

    // エラーメッセージを確認
    cy.get('#error-message') // エラーメッセージのセレクタ
      .should('be.visible')
      .and('contain', 'ログインに失敗しました');
  });
});