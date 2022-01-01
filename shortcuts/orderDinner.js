// List of items to order

const EVENT_OPTIONS = {bubbles: true, cancelable: false, composed: true};
const EVENTS = {
    CHANGE: new Event("change", EVENT_OPTIONS)
};

    const orderItems = ["restaurants.menu.item-view-2b6233bb-4e25-4745-8d12-5f1d0cce75b9",
    "restaurants.menu.item-view-f7e99ff6-5052-4114-b10c-f1a62b7184a0",
    "restaurants.menu.item-view-62f1a108-6a68-41e6-8f23-dabd9f75eb02"
    ]

    const viewCart = "restaurants.open-cart-button";
    const goToCheckout = "restaurants.cart-go-to-checkout-button";
    const continueWithCheckout = "restaurants.address-information.continue"
    const manualPayment = "wcn-payment-method-item-input-offline";
    const continueAfterPaymentOption = "restaurants.checkout-payments.continue";
    
//Order function that delays resolve by 2 seconds to delay the call order() again in the then()
  function select(item) {
      return new Promise(resolve => {
        document.querySelector('[data-hook="'+item+'"]').click();
        setTimeout(()=>resolve(), 2000);});
  }

  function populateContactDetails() {
    return new Promise(resolve => {
        const firstNameElement = "checkout-flow-first-name-input"
        const lastNameElement = "checkout-flow-last-name-input"
        const phoneElement = "checkout-flow-phone-input"
        const emailElement = "checkout-flow-email-input"
      const firstName =  getElement(firstNameElement);
      dispatchChangeEventForElement(firstName, "FirstName");
      const lastName = getElement(lastNameElement);
      dispatchChangeEventForElement(lastName, "Lastname");
      const phone = getElement(phoneElement);
      dispatchChangeEventForElement(phone, "0861234567");
      const email = getElement(emailElement);
      dispatchChangeEventForElement(email, "email@gmail.com" );
      document.querySelector('[data-hook="restaurants.contact-information.continue"]').click();
      setTimeout(()=>resolve(), 2000);});
}

    function getElement(element) {
        return document.querySelector('input[data-hook="'+element+'"]');
    }

    function dispatchChangeEventForElement(element, value) {
        // .value is passed in the change event
        element.value = value
        // .value not reflected in UI so setAttribute is needed
        element.setAttribute("value",value);
        // React tracker value needs to be different to .value
        const tracker = element._valueTracker;
        tracker && tracker.setValue("T");
        // Manually trigger CHANGE event
        element.dispatchEvent(EVENTS.CHANGE);
    }
  
  function addToBasket(item) {
      document.querySelector('[data-hook="restaurants.dish-modal.add-to-cart"]').click();
  }
  
  select(orderItems[0])
      .then(() => {select(orderItems[1])
          .then(() => {select(orderItems[2])
            .then(()=> {select(viewCart)
                .then(()=> {select(goToCheckout)
                    .then(()=>{select(continueWithCheckout)
                        .then(()=>{populateContactDetails()
                            .then(()=>{select(manualPayment)
                                .then(()=>{select(continueAfterPaymentOption)})})
                                   })
                               })
                            }
                    )
                        }
                    )}
            )
          }
      );
  
  const modal =  document.querySelector(".ReactModalPortal")
  const config = { attributes: false, childList: true, subtree: true };
  
  //Observer that looks for changes in the DOM in the modal and calls addToBasket() when modal is present
  const observer = new MutationObserver(mutations => {
      mutations.forEach(record => {
          if(record.removedNodes.length < 1){
              if(record.addedNodes[0].attributes[0].nodeValue === "_3CELT false undefined restaurants-olo-client-modal-overlay"){
                  addToBasket()
              }
          }
      })
  });
  
  
  observer.observe(modal, config);
  
  completion();