describe('Registration Fuctionality', () => {
  it('Registration', () => {
    cy.visit('http://127.0.0.1:5500/registration.html');

      cy.get("input[id='county']").type('Pakistan');
      cy.get("input[id='state']").type('Punjab');
      cy.get("input[id='monthDay']").type('May 10th');

//   email validation
      cy.get("input[id='email']").type('huamira@email.com');

        cy.get("input[id='email']").then(($input) => {
        const isValid = $input[0].checkValidity();

        if (isValid) {
            // Valid Email
            expect(isValid).to.be.true;
            expect($input[0].validationMessage).to.eq('');
            cy.log('✅ Email format is valid');
        } else {
            // Invalid Email
            expect(isValid).to.be.false;
            expect($input[0].validationMessage).to.include('@'); // Optional check
            cy.log('❌ Email format is invalid');
        }
        });

// phone number validation
        cy.get("input[id='phone']").type('+923119886745');

        cy.get("input[id='phone']").then(($input) => {
        const isValid = $input[0].checkValidity();

        if (isValid) {
            expect(isValid).to.be.true;
            expect($input[0].validationMessage).to.eq('');
            cy.log('✅ Phone number format is valid');
        } else {
            expect(isValid).to.be.false;
            expect($input[0].validationMessage).to.include('match the requested format'); // ✅ updated
            cy.log('❌ Phone number format is invalid');
        }
        });

      cy.get("input[id='buyerName']").type('Rashid Hameed');
      cy.get("input[id='buyerAddress']").type('WahCantt');
      cy.get("input[id='sellerName']").type('Ali');
      cy.get("input[id='sellerAddress']").type('Lahore');
      cy.get("input[id='vehicleMake']").type('Honda to');
      cy.get("input[id='bodyType']").type('orange');
      cy.get("input[id='vehicleYear']").type('2003');
      cy.get("input[id='vehicleColor']").type('silver');

// dropdown 
      // method 1
      cy.get('#vehicleType').select('suv');
      cy.get('#vehicleType').should('have.value', 'suv');
// method 2 with validation
// --------------------------------------------------------------------
    //   const desiredOption = 'suv';

    //   cy.get('#vehicleType').then($select => {
    //   const values = [...$select[0].options].map(o => o.value); //this line get all options in form of array
      
    //   if (values.includes(desiredOption)) {
    //     cy.wrap($select).select(desiredOption);
    //     cy.log(`✅ Selected: ${desiredOption}`);
    //   } else {
    //     cy.log(`❌ Option "${desiredOption}" not found in dropdown`);
    //     // You can also throw an error or skip further steps if needed
    //   }
    // });
// ------------------------------------------------------------------


// checkbox and radio button are same working
    // basic commands
    // cy.get('input[type="checkbox"][value="Cash"]').check().should('be.checked');
    // cy.get('input[type="checkbox"][value="Cash"]').check();
    // cy.get('input[type="checkbox"][value="Trade"]').check();
    // cy.get('input[value="Trade"]').uncheck().should('not.be.checked');

      cy.get('input[value="Cash"]').check().should('be.checked');
      cy.get('input[value="Trade"]').check().should('be.checked');
// check box valiadation
    //   cy.get('input[name="exchangeOption"]').then($options => {
    //   const checkedOptions = $options.filter(':checked');

    //   if (checkedOptions.length === 0) {
    //     cy.log('❌ No exchange option selected');
    //   } else {
    //     cy.log('✅ Exchange option selected');
    //   }
    // });

// file upload 
cy.get('#vehicleImage').selectFile("C:\\Users\\PMLS\\Pictures\\logo.png")
cy.get('#vehicleImage').selectFile("C:\\Users\\PMLS\\Pictures\\logo - Copy.png")
// check file upload validation
cy.get('#vehicleImage').then(($input) => {
  const isValid = $input[0].checkValidity();
  if (!isValid) {
    cy.log('❌ File upload is required and missing');
    expect(isValid).to.be.false;
  } else {
    cy.log('✅ File uploaded correctly');
    expect(isValid).to.be.true;
  }
});
// check file format validation 
// ------------------------------------------------------------------------
// const imagePath = "C:\\Users\\PMLS\\Downloads\\my_domicile _compressed.pdf";

// cy.get('#vehicleImage')
//   .selectFile(imagePath, { force: true })
//   .then(($input) => {
//     const file = $input[0].files[0];

//     if (file) {
//       const allowedTypes = ['image/png', 'image/jpeg'];

//       if (allowedTypes.includes(file.type)) {
//         cy.log(`✅ Valid file selected: ${file.name} (${file.type})`);
//       } else {
//         cy.log(`❌ Invalid file type: ${file.name} (${file.type}). Allowed types: ${allowedTypes.join(', ')}`);
        
//         // ✅ No test failure here — just a log
//       }
//     } else {
//       cy.log('❌ No file was selected.');
//     }
//   });
// -----------------------------------------------------------------------------

// Run your custom validator
    // cy.reportMissingFields();
    // ✅ Assert that the form is invalid before submitting
    cy.get('form').then(($form) => {
    const form = $form[0];
    const isValid = form.checkValidity();

    if (isValid) {
      cy.log('✅ Form is valid');
      expect(isValid).to.be.true;

      cy.get("button[type='submit']").click();

      // ✅ Expect to stay on the same page since redirect is disabled
      cy.url().should('include', 'registration.html');
    } else {
      cy.log('❌ Something is missing to submitt');
      expect(isValid).to.be.false;

      cy.get("button[type='submit']").click();
      cy.url().should('include', 'registration.html');
    }
  });
  })
})