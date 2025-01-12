describe('Sample Test', () => {
  it('Visits the app root', () => {
    cy.visit('/'); // ルートページにアクセス
    cy.contains('ホーム画面');
  });
});