'use strict';

export default class Catalog{
    constructor() {
        this.container = document.querySelector('#catalog');
        this.items = [];
        this.basket = [];
        this.url = 'https://raw.githubusercontent.com/AlinaNasibullina/static/master/JSON/catalog.json'
        this._init();
    }
    _init() {
        this._get(this.url)
            .then(arr => {
                this.items = arr.map(p => new Product(p.productName, p.productPrice, p.productImg, p.productId));
            })
           .finally(() => {
                this._render();
                this._handleActions();
           })
    }
    
    _get(url) {
        return fetch(url).then(d => d.json());
    }

    _render() {
        let html = '';

        this.items.forEach(item => {
            html += item.render
        });

        this.container.innerHTML = html;
    }

    _fillCatalog() { //Инкапсуляция (условная для JS)
        this.items = getArrayOfObjects();
    }
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add(this._createNewItem(dataset));
            }
        })
    }
    _createNewItem(dataset) {
        return {
            productId: dataset.id,
            productName: dataset.name,
            productImg: dataset.img,
            productPrice: +dataset.price,
            amount: 1
        }
    }
}

class Product {
    constructor(productName, productPrice, productImg, productId) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImg = productImg;
        this.productId = productId;
    }
    render() {
        return `<div class="col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 col-lg-3 feturedItems ">
                    <div class="feturedItem fetured_items__link">
                        <div class="feturedImgWrap">
                            <div class="feturedBuy">
                                <button
                                    class="hover_cart"
                                    name="add"
                                    data-id="${item.productId}"
                                    data-name="${item.productName}"
                                    data-price="${item.productPrice}"
                                    data-img="${item.productImg}"
                                >
                                    <div><i class="fas fa-shopping-cart"></i> Add to Cart</div>
                                </button>
                            </div>
                            <img class="feturedProduct" src="${item.productImg}" alt="product1">
                        </div>
                        <div>
                            <div class="feturedBuySm d-flex flex-column justify-content-around align-items-center align-items-md-start">
                                <div class="feturedItemName">${item.productName}</div>
                                <div class="feturedItemPrice price">$${item.productPrice}</div>
                                <button 
                                    class="d-md-none"
                                    name="add"
                                    data-id="${item.productId}"
                                    data-name="${item.productName}"
                                    data-price="${item.productPrice}"
                                    data-img="${item.productImg}"
                                >
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
    }
}






// export default {
//     container: null,
//     items: [],
//     basket: null,
//     url: 'https://raw.githubusercontent.com/AlinaNasibullina/static/master/JSON/catalog.json',
//     init(basket) {
//         this.container = document.querySelector('#catalog');
//         this.basket = basket;
//         this._get(this.url)
//             .then(arr => {
//                 this.items = arr;
//             })
//             .finally(() => {
//                 this._render();
//                 this._handleActions();
//             })
//     },
//     _get(url) {
//         return fetch(url).then(d => d.json());
//     },
//     _fillCatalog() { //Инкапсуляция (условная для JS)
//         this.items = getArrayOfObjects();
//     },
//     _render() {
//         let htmlStr = '';
//         this.items.forEach(item => {
//             htmlStr += `<div class="col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 col-lg-3 feturedItems ">
//                             <div class="feturedItem fetured_items__link">
//                                 <div class="feturedImgWrap">
//                                     <div class="feturedBuy">
//                                         <button
//                                             class="hover_cart"
//                                             name="add"
//                                             data-id="${item.productId}"
//                                             data-name="${item.productName}"
//                                             data-price="${item.productPrice}"
//                                             data-img="${item.productImg}"
//                                         >
//                                             <div><i class="fas fa-shopping-cart"></i> Add to Cart</div>
//                                         </button>
//                                     </div>
//                                     <img class="feturedProduct" src="${item.productImg}" alt="product1">
//                                 </div>
//                                 <div>
//                                     <div class="feturedBuySm d-flex flex-column justify-content-around align-items-center align-items-md-start">
//                                         <div class="feturedItemName">${item.productName}</div>
//                                         <div class="feturedItemPrice price">$${item.productPrice}</div>
//                                         <button 
//                                             class="d-md-none"
//                                             name="add"
//                                             data-id="${item.productId}"
//                                             data-name="${item.productName}"
//                                             data-price="${item.productPrice}"
//                                             data-img="${item.productImg}"
//                                         >
//                                             <i class="fas fa-shopping-cart"></i> Add to Cart
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>`
//         });
//         this.container.innerHTML = htmlStr;
//     },
//     _handleActions() {
//         this.container.addEventListener('click', ev => {
//             if (ev.target.name == 'add') {
//                 let dataset = ev.target.dataset;
//                 this.basket.add(this._createNewItem(dataset));
//             }
//         })
//     },
//     _createNewItem(dataset) {
//         return {
//             productId: dataset.id,
//             productName: dataset.name,
//             productImg: dataset.img,
//             productPrice: +dataset.price,
//             amount: 1
//         }
//     }
// }
