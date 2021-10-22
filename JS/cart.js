let pizzaJSON;
window.addEventListener('load', () => {
  getPizzaJSON();
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
  console.log(pizzas, cartItem);
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
              )}</span>RS
              <div class="item__quantity">
                <img
                  src="./img/util/cart-left-arrow.png"
                  alt=""
                  class="left--arrow"
                />
                <span class="quantity">1</span>
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

        cartContainer.insertAdjacentHTML('afterbegin', html);
      }
    });
  });
};
