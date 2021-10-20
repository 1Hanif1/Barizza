let pizzaContainer = document.querySelector('.pizza');

pizzaContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('addToCartBtn')) return;
  let pizza = e.target.closest('.pizza__description');
  let pizzaName = pizza.querySelector('.pizza__name').textContent;
  let pizzaPrice = Number.parseInt(pizza.querySelector('.price').textContent);

  sendData(pizzaName, pizzaPrice);
});

const sendData = function (name, price) {
  let popup = document.querySelector('.popup');

  let request = new XMLHttpRequest();

  request.open('POST', './php/db.php');

  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

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
