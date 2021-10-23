let pizzaJSON;
let cartContainer;
window.addEventListener('load', () => {
  getPizzaJSON();
  getTotal();
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

  cartContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('left--arrow')) {
      const itemQuantity = e.target.closest('.item__quantity');
      let quantity = itemQuantity.querySelector('.quantity');
      if (parseInt(quantity.textContent) >= 1) {
        quantity.textContent = parseInt(quantity.textContent) - 1;
      }
    }

    if (e.target.classList.contains('right--arrow')) {
      const itemQuantity = e.target.closest('.item__quantity');
      let quantity = itemQuantity.querySelector('.quantity');
      quantity.textContent = parseInt(quantity.textContent) + 1;
    }
  });
};

const getTotal = function () {
  console.log('bruh');
  let request = getHttpRequest('POST', './php/db.php');
  request.send('action=getTotal');
  request.addEventListener('load', function () {
    const total = document.querySelector('.total--amount');
    total.textContent = JSON.parse(this.responseText)[0]['SUM(`price`)'];
  });
};
