/* eslint-disable no-undef */
describe('access site', () => {
  it('loads site', () => {
    cy.visit('/');
    cy.contains('Chie');
  });
});
