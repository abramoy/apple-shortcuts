// List of items to order
    const orderItems = ["restaurants.menu.item-view-2b6233bb-4e25-4745-8d12-5f1d0cce75b9",
    "restaurants.menu.item-view-f7e99ff6-5052-4114-b10c-f1a62b7184a0",
    "restaurants.menu.item-view-62f1a108-6a68-41e6-8f23-dabd9f75eb02"
    ]

    const viewCart = "restaurants.open-cart-button";
    const goToCheckout = "restaurants.cart-go-to-checkout-button";
    
//Order function that delays resolve by 2 seconds to delay the call order() again in the then()
  function select(item) {
      return new Promise(resolve => {
        document.querySelector('[data-hook="'+item+'"]').click();
        setTimeout(()=>resolve(), 2000);});
  }
  
  function addToBasket(item) {
      document.querySelector('[data-hook="restaurants.dish-modal.add-to-cart"]').click();
  }
  
  select(orderItems[0])
      .then(() => {select(orderItems[1])
          .then(() => {select(orderItems[2])
            .then(()=> {select(viewCart)
                .then(()=> {select(goToCheckout)})}
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