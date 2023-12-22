var cleave = new Cleave('#phoneInput', {
    phone: true,
    phoneRegionCode: 'RU'
});

// Получаем все карточки продуктов
let zayavButs = document.querySelectorAll('.zayav');

zayavButs.forEach(but => {
    but.addEventListener('click', () => {
        // Получаем значение атрибута data-vacan-id
        let vacanId = but.getAttribute('data-vacan-id');

        document.getElementById(vacanId).checked = true;

        // Находим соответствующий контейнер vacan_form_div
        let vacanContainer = vacan_form_div;

        // Показываем контейнер выбранного продукта
        vacanContainer.style.display = 'flex';

        vacanContainer.addEventListener('click', (event) => {
            if (event.target === vacanContainer || event.target.className == "vacan_form_exit") {
                vacanContainer.style.display = 'none';
            }
        });        
    });
});