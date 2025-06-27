describe('Handle dynamic dropdown Fuctionality', () => {
  it('Dropdown Testing', () => {
    cy.visit('https://www.yatra.com',{headers: {"Accept-Encoding":"gzip, deflate"}});
    // dynamic dropdown
    cy.get('write id').click().clear().type('ABC', {delay:200}) //get id of where you will type
    // get all elements when you write something so .classname span last-child
    cy.get('enter locator').each(($el, index, $list) => {
        cy.log($el.text())
        if($el.text() === 'write'){
            cy.wrap($el).click()
        }
    })


    // check box and radio buttons 
    cy.get("select css selector").click()

    // check file 

    cy.get('write id, css selector').scrollIntoView()
    cy.get('write id, css selector').selectFile("add file location with double \\")


  })
})