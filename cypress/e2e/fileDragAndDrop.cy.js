
describe('Drag and Drop with Native Events', () => {
  before(() => {
    cy.visit('https://testkru.com/Interactions/DragAndDrop')
  })

  it('Mouse Events', () => {
    cy.wait(5000)
    cy.get('#box1').drag('#dropZone1')
  })

//   it('should drag item to target', () => {
//     cy.visit('https://testkru.com/Interactions/DragAndDrop')
//     triggerDragAndDrop('#box2', '#dropZone1')
//   })

//   function triggerDragAndDrop (subject, target) {
//     const dataTransfer = new DataTransfer()

//     cy.get(subject).trigger('dragstart', { dataTransfer })
//     cy.get(target).trigger('drop', { dataTransfer })
//     cy.get(subject).trigger('dragend')
//   }
})
