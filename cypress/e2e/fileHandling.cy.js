describe('File Handling in Cypress', () => {
it('Reading Files using Fixtures', () => {
    cy.fixture('example.json').then((data) => {
        cy.log(data.name)
    })
})

it('Reading File using read File method', ()=> {
    cy.readFile('./cypress/fixtures/example.json').then((data_read) => {
        cy.log(data_read.email)
    })
})

it('Writing some text in a File', ()=> {
    cy.writeFile('./cypress/fixtures/written.txt','This is Akhila learning basic Cypress\n Life is good and all is well. \n I am joining a new company as a Lead QA Engineer on March 3rd 2026 with a pay of 170,000 CAD. \r The position is fully remote and is very safe with all the benefits.')
})
})
