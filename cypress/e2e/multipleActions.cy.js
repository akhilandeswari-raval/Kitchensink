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
        { action: 'select' } // or 'drag-drop'
      );

    // Optional: Assert that files are attached
    // cy.get('input[type="file"]')[0].files.length.should('eq', 2);
  })

  it('uploads single file', ()=> {
    cy.visit('https://testkru.com/Elements/Files')
    cy.get('input[id="singleFileUpload"]').selectFile('C:/Users/akhil/OneDrive/Pictures/Happy Diwali.jpeg', {action:'select'})

    // cy.get('input[id="singleFileUpload"]').files.length.should('eq',1)
  })
});

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

describe('Drag and Drop with Native Events', () => {
  before(() => {
    cy.visit('https://testkru.com/Interactions/DragAndDrop')
  })

  it('Mouse Events', () => {
    cy.wait(5000)
    cy.get('#box1').drag('#dropZone1')
  })

  it('should drag item to target', () => {
    triggerDragAndDrop('#box2', '#dropZone1')
  })

  function triggerDragAndDrop (subject, target) {
    const dataTransfer = new DataTransfer()

    cy.get(subject).trigger('dragstart', { dataTransfer })
    cy.get(target).trigger('drop', { dataTransfer })
    cy.get(subject).trigger('dragend')
  }
})
