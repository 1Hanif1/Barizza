let pizzaJSON;
let cartContainer;
window.addEventListener('load', () => {
  getPizzaJSON();
  const orderBtn = document.querySelector('.order--btn');
  orderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    placeOrder();
  });
});

const getHttpRequest = function (method, file) {
  let request = new XMLHttpRequest();
  request.open(`${method}`, `${file}`);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  return request;
};

const getPizzaJSON = function () {
  let request = getHttpRequest('POST', './php/db.php');
  request.send(`action=json`);
  request.addEventListener('load', function () {
    try {
      let pizzaJSON = JSON.parse(this.responseText);
      getCartJson(pizzaJSON);
    } catch (e) {}
  });
};

const updateQuantity = function (change, name, price = 0) {
  let request = getHttpRequest('POST', './php/db.php');
  request.send(`action=update&update=${change}&name=${name}&price=${price}`);
};

const getCartJson = function (pizzaJSON) {
  let request = getHttpRequest('POST', './php/db.php');
  request.send('action=cartjson');
  request.addEventListener('load', function () {
    try {
      let cartJSON = JSON.parse(this.responseText);
      renderCart(pizzaJSON, cartJSON);
    } catch (e) {}
  });
};

const getTotal = function () {
  const items = document.querySelectorAll('.item');
  let total = 0;
  items.forEach((item) => {
    const price = parseInt(item.querySelector('.item__price').textContent);
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    total += price * quantity;
  });
  const totalPrice = document.querySelector('.total--amount');
  totalPrice.textContent = total;
};

const deleteItem = function (pizza, domElement) {
  let request = getHttpRequest('POST', './php/db.php');
  request.send(`action=delete&name=${pizza}`);
  request.addEventListener('load', () => {
    domElement.remove();
    getTotal();
  });
};

const renderCart = function (pizzas, cartItem) {
  const cartContainer = document.querySelector('.left');
  Object.keys(cartItem).forEach((item) => {
    Object.keys(pizzas).forEach((pizza) => {
      if (pizzas[pizza].name === cartItem[item].name) {
        const html = `
          <div class="item">
          <img
            class="item__img"
            src="${pizzas[pizza].image}"
            alt="/"
          />
          <img src="./img/util/cancel.png" class="item__cancel--btn" alt="/" />
          <div class="item__details">
            <p class="item__name">${pizzas[pizza].name}</p>
            <div class="item__price--container">
              <span class="item__price">${Number.parseInt(
                pizzas[pizza].price
              )}</span> RS / pc
              <div class="item__quantity">
                <img
                  src="./img/util/cart-left-arrow.png"
                  alt=""
                  class="left--arrow"
                />
                <span class="quantity">${cartItem[item].quantity}</span>
                <img
                  src="./img/util/cart-right-arrow.png"
                  alt=""
                  class="right--arrow"
                />
              </div>
            </div>
          </div>
        </div>
          `;

        cartContainer.insertAdjacentHTML('beforeend', html);
      }
    });
  });

  getTotal();

  cartContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('item__cancel--btn')) {
      const pizza = e.target
        .closest('.item')
        .querySelector('.item__name').textContent;
      deleteItem(pizza, e.target.closest('.item'));
    }

    if (e.target.classList.contains('left--arrow')) {
      const itemQuantity = e.target.closest('.item__quantity');
      const pizza = itemQuantity
        .closest('.item__details')
        .querySelector('.item__name').textContent;
      const price = itemQuantity
        .closest('.item__details')
        .querySelector('.item__price').textContent;
      let quantity = itemQuantity.querySelector('.quantity');
      if (parseInt(quantity.textContent) > 1) {
        quantity.textContent = parseInt(quantity.textContent) - 1;
        updateQuantity('decrease', pizza, price);
        getTotal();
      }
    }

    if (e.target.classList.contains('right--arrow')) {
      const itemQuantity = e.target.closest('.item__quantity');
      const pizza = itemQuantity
        .closest('.item__details')
        .querySelector('.item__name').textContent;
      const price = itemQuantity
        .closest('.item__details')
        .querySelector('.item__price').textContent;
      let quantity = itemQuantity.querySelector('.quantity');
      quantity.textContent = parseInt(quantity.textContent) + 1;
      updateQuantity('increase', pizza, price);
      getTotal();
    }
  });
};

const showModal = function (str) {
  const modal = document.querySelector('.modal');
  modal.classList.remove('hidden');
  const modalText = document.querySelector('.modal__text');
  modalText.textContent = str;
  const modalBtn = document.querySelector('.modal__btn');
  modalBtn.addEventListener('click', function () {
    modal.classList.add('hidden');
  });
};

const clearCart = function () {
  let request = getHttpRequest('POST', './php/db.php');
  request.send('action=clearcart');
};

const placeOrder = function () {
  const totalPrice = document.querySelector('.total--amount');
  if (parseInt(totalPrice.textContent) <= 0) {
    showModal('🛒 Cart is empty');
    return;
  } // show cart is empty modal and return
  // get form data
  let name = document.querySelector('.order--name').value;
  let contact = document.querySelector('.order--contact').value;
  let address = document.querySelector('.order--address').value;
  if ([name, contact, address].some((field) => field == '')) {
    showModal('Please fill all details ⚠');
    return;
  } // Show modal 'please fill all details'
  // make ajax request to php
  let pizzas = '';
  const cartItems = document.querySelector('.left').querySelectorAll('.item');
  cartItems.forEach((item) => {
    const name = item.querySelector('.item__name').textContent.trim();
    const quantity = item.querySelector('.item__quantity').textContent.trim();
    pizzas += `${quantity} ${name}, `;
  });
  console.log(pizzas.trim());
  let total = parseInt(document.querySelector('.total--amount').textContent);

  let request = getHttpRequest('POST', './php/db.php');
  request.send(
    `action=order&total=${total}&pizzas=${pizzas}&cname=${name}&contact=${contact}&address=${address}`
  );
  request.addEventListener('load', function () {
    if (this.responseText == 'true') {
      clearCart();
      showModal('Order placed successfully 🥳');
      document.querySelector('.left').innerHTML = '';
      getTotal();
    } else showModal('Failed to place order 😟');
  });
};
