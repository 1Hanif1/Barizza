let pizzaContainer = document.querySelector('.pizza');

window.addEventListener('load', () => {
  getPizzaJSON('pizzas.json');
});

//////////////////////////////ADD TO CART//////////////////////////////

pizzaContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('addToCartBtn')) return;
  let pizza = e.target.closest('.pizza__description');
  let pizzaName = pizza.querySelector('.pizza__name').textContent;
  let pizzaPrice = Number.parseInt(pizza.querySelector('.price').textContent);
  sendData(pizzaName, pizzaPrice);
});

const getHttpRequest = function (method, file) {
  let request = new XMLHttpRequest();
  request.open(`${method}`, `${file}`);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  return request;
};
const sendData = function (name, price) {
  let popup = document.querySelector('.popup');
  let request = getHttpRequest('POST', './php/db.php');
  request.onreadystatechange = function () {
    if (this.readyState === 4 || this.status === 200) {
      popup.classList.remove('hidden');
      console.log(this.responseText);
      setTimeout(() => {
        popup.classList.add('hidden');
      }, 1000);
    }
  };
  request.send(`action=store&name=${name}&price=${price}`);
};

const getPizzaJSON = function (file) {
  let request = getHttpRequest('POST', './php/getLocalData.php');
  request.send(`action=json&file=${file}`);
  request.addEventListener('load', function () {
    renderPizza(this.responseText);
  });
};

//////////////////////////////RENDER PIZZAS//////////////////////////////
const renderPizza = function (pizzaJSON) {
  if (!pizzaJSON) return;
  let pizzas = JSON.parse(pizzaJSON);
  let pizzaArr = Object.keys(pizzas);
  pizzaArr.forEach((pizza) => {
    let container = document.querySelector(`.${pizzas[pizza].container}`);
    let pizzaContainer = container.querySelector('.pizza__items');

    let html = `
      <section class="pizza__item">
        <div class="pizza__image__container">
          <img
            class="pizza__image"
            src="${pizzas[pizza].image}"
            alt="/"
           />
        </div>
        <div class="pizza__description">
              <h3 class="pizza__name">${pizzas[pizza].name}</h3>
              <div class="pizza__price">
                <span class="price">${pizzas[pizza].price} Rs</span>
                <input type="submit" value="ADD" class="addToCartBtn" />
              </div>
        </div>
      </section>
    `;

    pizzaContainer.insertAdjacentHTML('beforeend', html);
  });
};
