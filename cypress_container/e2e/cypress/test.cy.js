describe('ログインテスト', () => {
  it('フォームに正しく入力して送信', () => {
    cy.visit('/login');

    // ページの読み込みを待つ
    cy.wait(1000); // または適切な時間

    cy.get('input#email')
      .should('be.enabled') // 要素が有効になるまで待機
      .type('user@example.com');

    cy.get('input#password')
      .should('be.enabled')
      .type('securepassword');

    cy.get('button[type="submit"]').click();
    cy.wait(1000); // または適切な時間
    // マイページ画面に遷移
    cy.url().should('eq', 'https://frontend:5173/mypage');
  });

  it('ホーム画面のサンプルサイトリンクをクリックしてホーム画面に遷移', () => {
    cy.visit('/');

    // サンプルサイトリンクをクリック
    cy.contains('a', 'サンプルサイト').click();

    // ホーム画面に遷移したことを確認
    cy.url().should('eq', 'https://frontend:5173/');
  });

  it('ホーム画面からログアウト画面へ遷移', () => {
    cy.visit('/login');

    // ページの読み込みを待つ
    cy.wait(1000); // または適切な時間

    cy.get('input#email')
      .should('be.enabled') // 要素が有効になるまで待機
      .type('user@example.com');

    cy.get('input#password')
      .should('be.enabled')
      .type('securepassword');

    cy.get('button[type="submit"]').click();

    // マイページ画面に遷移
    cy.url().should('eq', 'https://frontend:5173/mypage');

    // 2. ユーザーアカウントアイコンをクリックしてメニューを表示
    cy.get('button:has(img[alt="User Avatar"])').should('be.visible').click();

    // 3. ログアウトボタンをクリック
    cy.contains('button', 'ログアウト').should('be.visible').click();


    // ログイン画面に遷移
    cy.wait(3000); // または適切な時間
    cy.get('form#login-form').should('be.visible');

    cy.url().should('eq', 'https://frontend:5173/login');
  });
});