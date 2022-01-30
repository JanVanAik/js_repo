'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});


const cartAmountCounter = document.querySelector('.cartIconWrap span');
const cartEl = document.querySelector('.cart');
let cartTotalSum = 0
document.querySelector('.cartTotal')
    .textContent = `Общая сумма товаров в корзине $${cartTotalSum}`

function increaseSum(element) {
    return Number(element.querySelector('.featuredPrice')
        .textContent.replace('$', ''))
}

function addCartRow(element, amount = 1) {
    const elPrice = element.querySelector('.featuredPrice').textContent
        .replace('$', '');
    const textEl = `
    <div class="cartRow" data-id='${element.dataset.id}'>
        <div>${element.querySelector('.featuredName').textContent}</div>
        <div class='price'>${elPrice}</div>
        <div class='amount'>${amount}</div>
        <div class = 'sum'>$${elPrice * amount}</div>
    </div>
`;
    document.querySelector('.cartName').insertAdjacentHTML('afterend', textEl);
}

function editCartRow(featuredItemEl) {
    const oldPrice = Number(featuredItemEl.querySelector('.price')
        .textContent.replace('$', ''));
    const newAmount = Number(featuredItemEl.querySelector('.amount').textContent) + 1;
    const newSum = newAmount * oldPrice;
    document.querySelector('.amount').textContent = newAmount;
    document.querySelector('.sum').textContent = `$${newSum}`;
}

function addToCart(cartEl, featuredItemEl) {
    const elementInCart = cartEl.querySelector(`[data-id="${featuredItemEl.dataset.id}"]`)
    if (elementInCart === null) {
        addCartRow(featuredItemEl);
        return;
    }
    editCartRow(elementInCart);
}


document.querySelector('.cartIconWrap').addEventListener('click', () => {
    cartEl.classList.toggle('hidden');
});


document.querySelector('.featuredContainer').addEventListener('click', event => {
    if (!event.target.dataset.type === 'btn') {
        return;
    };

    const elemId = event.target.dataset.id;
    const amount = Number(cartAmountCounter.textContent) + 1;
    cartAmountCounter.textContent = amount
    const featuredItem = document
        .querySelector(`.featuredContainer [data-id= "${elemId}"]`);
    cartTotalSum += increaseSum(featuredItem);
    document.querySelector('.cartTotal')
        .textContent = `Общая сумма товаров в корзине $${cartTotalSum}`
    addToCart(cartEl, featuredItem);

});


