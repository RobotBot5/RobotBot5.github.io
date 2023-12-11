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

function updateCart() {
    let cartItemsHtml = products.map(product => `
      

    <li class="cart-item" data-id="${product.id}">
      <img src="${product.id}.jpg">
      <h4>${product.name}</h4>
      <p class="p_one_price">${product.price} руб.</p>
      <div class="div_quantity">
          <button type="button" class="cart_item_minus" data-id="${product.id}"></button>
          <p class="p_quantity">${product.quantity} шт.</p>
          <button type="button" class="cart_item_plus" data-id="${product.id}"></button>
      </div>
      
      <p class="p_total_price">${product.price * product.quantity} руб.</p>
      <button type="button" class="cart_del_but" data-id="${product.id}"></button>
    </li>
    `).join('');
    document.getElementById('cart-items').innerHTML = cartItemsHtml;

    let prices = products.map(product => product.price * product.quantity);
    let total_cost = prices.reduce(function(previousValue, currentValue) {return previousValue + currentValue}, 0);
    document.getElementById('total_cost').textContent = total_cost;
}