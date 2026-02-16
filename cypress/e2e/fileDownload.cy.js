it('Downloading files', ()=> {
    cy.visit('https://testkru.com/Elements/Files')

    const downloadsFolder = Cypress.config('downloadsFolder');
    // const fileName = 'plant_image.jpg';
    // const filePath = `${downloadsFolder}/${fileName}`;

    // 3. Click the button
    cy.contains('Download Now').click();

    // 4. Verify file exists in the folder
    // Note: It's best to allow a few seconds for the download to complete
    cy.readFile(`${downloadsFolder}/plant_image.jpg`, { timeout: 10000 }).should('exist');
    cy.wait(5000);
    cy.contains('File 1').click();
    cy.readFile(`${downloadsFolder}/codekru.png`,{timeout: 10000}).should('exist')
});