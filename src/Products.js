export default class Products {

  constructor(dataStore, order) {
    this.dataStore = dataStore;
    this.order = order;
  }

  renderHtml() {
    let html = "";

    this.dataStore.categories.forEach(category => {
      html += `<h2 class="products__category">${category.name}</h2>`;
      html += `<div class="products__list">`;

      this.dataStore.products
        .filter(product => product.category_id == category.id)
        .forEach(filteredProduct => { 
          html += this.getProductHtml(filteredProduct) 
        })
      
      html += `</div>`;
    })

    document.querySelector("#products").innerHTML = html;
    
    const buttonsNodeList = document.querySelectorAll(".button--addItem");
    const buttonsArray = [...buttonsNodeList];
    buttonsArray.forEach(button => {
      button.addEventListener("click", (e) => {
        let id = e.target.dataset.product;
        this.order.addItemToOrder(id);
      })
    })
  }

  getProductHtml(product) {
    return `
      <div class="product">
          <div class="product__image">
            <img src="images/${product.picture}" alt="${product.name}">
          </div>
          <div class="product__body">
            <div class="product__content">
              <h3 class="product__name">${product.name}</h3>
              <p class="product__desc">
                ${product.description}
              </p>
            </div>
            <div class="product__order">
              <div class="product__price">
              ${product.price} CZK
              </div>
              <div class="product__order-button">
                <button class="button button--primary button--addItem" data-product=${product.id}>+</button>
              </div>
            </div>
          </div>
        </div>
      `;
  }

}