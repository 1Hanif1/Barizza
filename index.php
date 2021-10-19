<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./sass/style.css" />
    <title>Barizza - Delicious Pizzas for you</title>
  </head>
  <body>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      echo "<p>Works</p>";
}
    ?>
    <?php include("./php/nav.php"); ?> 
    
    <header class="header">
      <img class="header__img" src="./img/header.png" alt="header" />
    </header> 

    <main class="pizza">
      <!-- <aside class="pizza__categories"></aside> -->

      <section class="pizza__container" data-category="1">
        <h2 class="pizza__title">
          10" Pizzas | Non veg
          <span class="pizza__title__description"
            >Go BIG with 10-inch Pizzas! Overload of juicy meat chunks, topped
            with melting cheese, & baked to perfection.</span
          >

          <div class="pizza__items">
            <section class="pizza__item">
              <div class="pizza__image__container">
                <img
                  class="pizza__image"
                  src="./img/Pizzas/big10/chikenSmokeyJoe.jfif"
                  alt="/"
                />
              </div>
              <div class="pizza__description">
                <h3 class="pizza__name">
                  Chicken Smokey Joe [BIG 10'']
                  <span>Smokey BBQ Chicken | Onion | Serves 2-3.</span>
                </h3>
                <div class="pizza__price">
                  <span class="price">$390</span>
                  <form action="./index.php" class="addToCart" method="post">
                    <input type="submit" value="ADD" class="addToCartBtn" />
                  </form>
                </div>
              </div>
            </section>
          </div>
        </h2>
      </section>
    </main>
  </body>
</html>
