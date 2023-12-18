var cleave = new Cleave('#phone', {
    phone: true,
    phoneRegionCode: 'RU'
});

// Получаем все карточки продуктов
let productCards = document.querySelectorAll('.one-product');

productCards.forEach(card => {
    card.addEventListener('click', () => {
        // Получаем значение атрибута data-product-id
        let productId = card.getAttribute('data-product-id');

        // Находим соответствующий контейнер picked_product_div
        let pickedProductContainer = document.querySelector(`.picked_product_div[data-product-id="${productId}"]`);

        // Показываем контейнер выбранного продукта
        pickedProductContainer.style.display = 'flex';

        pickedProductContainer.addEventListener('click', (event) => {
            if (event.target === pickedProductContainer || event.target.className == "picked_product_exit") {
                pickedProductContainer.style.display = 'none';
            }
        });        
    });
});

products = [];

function Product(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = 1;
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        let productId = this.dataset.id;
        console.log(productId);
        let product = products.find(product => product.id === productId);
        if (product) {
            if (product.quantity < 5) {
                product.quantity += 1;
                updateCart();
            }
            else {
                alert("Товаров больше нет на складе!")
            }
        }
        else {
            switch(productId) {
                case "milk_choco1":
                    product = new Product("milk_choco1", "Нежная классика", 101);
                    break;
                case "milk_choco2":
                    product = new Product("milk_choco2", "Фундуковый рай", 102);
                    break;
                case "milk_choco3":
                    product = new Product("milk_choco3", "Карамельное cовершенство", 103);
                    break;
                case "milk_choco4":
                    product = new Product("milk_choco4", "Ореховый Экстаз", 104);
                    break;
                case "white_choco1":
                    product = new Product("white_choco1", "Нежное облако", 201);
                    break;
                case "white_choco2":
                    product = new Product("white_choco2", "Ореховая искусственность", 202);
                    break;
                case "white_choco3":
                    product = new Product("white_choco3", "Легкость Пористого", 203);
                    break;
                case "dark_choco1":
                    product = new Product("dark_choco1", "Глубокий Аромат", 301);
                    break;
                case "dark_choco2":
                    product = new Product("dark_choco2", "Интенсивный Ореховый Взрыв", 302);
                    break;
                case "dark_choco3":
                    product = new Product("dark_choco3", "Экстравагантная Карамель", 303);
                    break;
            }
    
            products.push(product);
            updateCart();
        }
    });
});

document.getElementById('cart-items').addEventListener('click', function(event) {
    let button_del = event.target.closest('.cart_del_but');
    let button_plus = event.target.closest('.cart_item_plus');
    let button_minus = event.target.closest('.cart_item_minus');
    if (button_del) {
        let productId = button_del.dataset.id;
        let index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
        }
        updateCart();
    }
    else if (button_plus) {
        let productId = button_plus.dataset.id;
        let product = products.find(product => product.id === productId);
        console.log(productId);
        if (product) {
            if (product.quantity < 5) {
                product.quantity += 1;
                updateCart();
            }
            else {
                alert("Товаров больше нет на складе!")
            }
        }
    }
    else if (button_minus) {
        let productId = button_minus.dataset.id;
        let product = products.find(product => product.id === productId);
        if (product) {
            if (product.quantity > 1) {
                product.quantity -= 1;
                updateCart();
            }
            else {
                let index = products.findIndex(product => product.id === productId);
                if (index !== -1) {
                    products.splice(index, 1);
                }
                updateCart();
            }
        }
    }
});

let empty_cart = true;

function updateCart() {
    let cartItemsHtml = products.map(product => `
    <li class="cart-item" data-id="${product.id}">
      <div class="cart_img_div cart-img-id-${product.id}">
        <img src="media/${product.id}.jpg">
      </div>
      <h4>${product.name}</h4>
      <div class="razdel"></div>
      <p class="p_one_price">${product.price} руб.</p>
      <div class="razdel"></div>
      <div class="div_quantity">
          <button type="button" class="cart_item_minus" data-id="${product.id}"></button>
          <p class="p_quantity">${product.quantity} шт.</p>
          <button type="button" class="cart_item_plus" data-id="${product.id}"></button>
      </div>
      <div class="razdel"></div>
      <p class="p_total_price">${product.price * product.quantity} руб.</p>
      <div class="razdel"></div>
      <button type="button" class="cart_del_but" data-id="${product.id}"></button>
    </li>
    `).join('');

    let prices = products.map(product => product.price * product.quantity);
    let total_cost = prices.reduce(function(previousValue, currentValue) {return previousValue + currentValue}, 0);
    if (total_cost == 0) {
        document.getElementById('total_cost').textContent = "Корзина пуста!";
        empty_cart = true;
    }
    else {
        cartItemsHtml = `
        <li id="naming-item">
            <div id="naming_div1"></div>
            <p id="naming_title">Название</p>
            <div class="razdel"></div>
            <p id="naming_cost_by_one">За 1шт.</p>
            <div class="razdel"></div>
            <div id="naming_quantity">Количество</div>
            <div class="razdel"></div>
            <p id="naming_total_cost">Всего</p>
            <div class="razdel"></div>
            <p id="naming_delete">Удалить</p>
        </li>
        `+cartItemsHtml;

        document.getElementById('total_cost').textContent = "Общая стоимость: " + total_cost + " руб.";
        empty_cart = false;
    }
    document.getElementById('cart-items').innerHTML = cartItemsHtml;
}

cart_but_sub.onclick = function() {
    if (empty_cart) {
        alert("Добавьте товары в корзину!");
        return false;
    }
}