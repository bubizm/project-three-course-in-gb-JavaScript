'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
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
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});


let order = {};
let allPrice = 0;
let allCount = 0;


const featuredItemEls = document.querySelectorAll('.featuredItem');
featuredItemEls.forEach (el => {
    el.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    let id = +el.dataset.id;
    let name = el.dataset.name;
    let price = +el.dataset.price;
    
    function totalPrice(count, price) {
        return count * price;
    }

    const tableRowBottom = document.querySelector('.table-row__bottom');
    const sumPrice = tableRowBottom.querySelector('.sum');
    const circle = cartIconEl.querySelector('.circle');

    function addToCart (id, name, price) {
        if (!(id in order)) {
            order[id] = {id: id, name: name, price: price, count: 0, 
                total: 0};
                order[id].count++;
                order[id].total = totalPrice(order[id].count, order[id].price);
                const htmlEl = `
         <tr class="table-row__middle">
             <th>${order[id].name}</th>
             <th>$${order[id].price}</th>
             <th>${order[id].count}</th>
             <th>$${order[id].total}</th>
         </tr>
         `;
        tableRowBottom.insertAdjacentHTML('beforebegin', htmlEl);
        sumPrice.textContent = '$' + summaryPrice();
        circle.textContent = summaryCount();
        } else {
            order[id].count++;
            order[id].total = totalPrice(order[id].count, order[id].price);
            const htmlEl = `
         <tr class="table-row__middle">
             <th>${order[id].name}</th>
             <th>$${order[id].price}</th>
             <th>${order[id].count}</th>
             <th>$${order[id].total}</th>
         </tr>
         `;
            const tableRowMiddle = document.
            querySelectorAll('.table-row__middle');
            tableRowMiddle.forEach(el => {
                if (el.children[0].textContent === name) {
                    el.innerHTML = htmlEl;
                }     
    })
            sumPrice.textContent = '$' + summaryPrice();
            circle.textContent = summaryCount();
        }
        function summaryPrice() {
            allPrice = 0;
            for (let key in order) {
                allPrice += order[key].total;
            }
            return allPrice;
        }

        function summaryCount() {
            allCount = 0;
            for (let key in order) {
                allCount += order[key].count;
            }
            return allCount;
        }
    }

    addToCart(id, name, price);

//     if (nameProduct !== order.nameProduct) {
//         total = count * priceProduct;
//         order = {nameProduct, count, priceProduct, total};
//         orderAll.push(order);
//         // <th>${order[idProduct].total}</th>
//         const htmlEl = `
//         <tr class="table-row__middle">
//             <th>${order.nameProduct}</th>
//             <th>${order.count}</th>
//             <th>${order.priceProduct}</th>
//             <th>${order.total}</th>
//         </tr>
//         `;
//         tableRowBottom.insertAdjacentHTML('beforebegin', htmlEl);
//      } else {
//         order.count += 1;
//         order.total = order.count * order.priceProduct;
//         orderAll.push(order);
//         const htmlEl = `
//         <tr class="table-row__middle">
//             <th>${order.nameProduct}</th>
//             <th>${order.count}</th>
//             <th>${order.priceProduct}</th>
//             <th>${order.total}</th>
//         </tr>
//         `;
//         const tableRowMiddle = document.querySelectorAll('.table-row__middle');
//         tableRowMiddle.forEach(el => {
//             if (el.children[0].textContent === nameProduct) {
//                 el.innerHTML = htmlEl;
//             }     
// })
//     }
})
})

const cartIconEl = document.querySelector('.cartIconWrap');
cartIconEl.addEventListener('click', event => {
    if (event.currentTarget.className !== 'cartIconWrap') {
        return;
    }
    event.target.parentElement.
    lastElementChild.classList.toggle('hidden');
})