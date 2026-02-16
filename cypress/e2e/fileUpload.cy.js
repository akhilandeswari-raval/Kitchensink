describe('File Upload', () => {
  it('uploads multiple files', () => {
    // Visit the page with the file input
    cy.visit('https://testkru.com/Elements/Files');

    // Select the file input element and upload multiple files
    cy.get('input[id="multiFileUpload"]')
      .selectFile(
        [
          'C:/Users/akhil/OneDrive/Pictures/Screenshots/Screenshot 2025-10-25 235119.png', // First file
          'C:/Users/akhil/OneDrive/Pictures/Screenshots/Screenshot 2025-10-25 234126.png'  // Second file
        ],
        { action: 'select' } )// or 'drag-drop'
  });
    // Optional: Assert that files are attached
    // cy.get('input[type="file"]')[0].files.length.should('eq', 2);

  it('uploads single file', ()=> {
    cy.visit('https://testkru.com/Elements/Files')
    cy.get('input[id="singleFileUpload"]').selectFile('C:/Users/akhil/OneDrive/Pictures/Happy Diwali.jpeg', {action:'select'})

    // cy.get('input[id="singleFileUpload"]').files.length.should('eq',1)
  })
})
