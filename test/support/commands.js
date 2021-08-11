Cypress.Commands.add(`mount`, node => cy.document()
.then(doc => {
  const main = doc.getElementById(`main`);
  console.log(main);
  main.innerHTML = ``;
  main.appendChild(node);
}));
