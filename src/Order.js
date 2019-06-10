export default class Order {

  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  addItemToOrder(id) {
    // vytvořit objekt s názvem + počtem:
    // this.dataStore.order[id] = this.dataStore.order[id] + 1 || 1;    // STEJNÉ JAKO:
    this.dataStore.order[id] = (this.dataStore.order[id] ? this.dataStore.order[id] + 1 : 1);
    this.updateOrder();
  }

  removeItemFromOrder(id) {
    this.dataStore.order[id]--;
    if (this.dataStore.order[id] === 0) {
      delete this.dataStore.order[id];
    }
    this.updateOrder();
  }

  updateOrder() {
    let html = "";
    
    for (let id in this.dataStore.order) {
      let product = this.dataStore.getProductById(id);

      html += `
        <div class="order__item" data-id=${id}>
          <div class="order__item-name">${this.dataStore.order[id]}× ${product.name}</div>
          <button class="count-button count-button--plus">+</button>
          <button class="count-button count-button--minus">-</button>
        </div>
      `
    }

    if (html === "") {
      document.querySelector("#order").innerHTML = `
      <p class="order__empty">
        Vaše objednávka je zatím prázdná :(
        </p>
      `
      document.querySelector(".button--order").classList.add("hidden");
    
    } else {
      document.querySelector("#order").innerHTML = html;

      let plusButtons = document.querySelectorAll(".count-button--plus");
      for (let plusButton of plusButtons) {
        plusButton.addEventListener("click", (e) => {
          let id = e.target.closest("[data-id]").dataset["id"];
          this.addItemToOrder(id);
        })
      }
    
      let minusButtons = document.querySelectorAll(".count-button--minus");
      for (let minusButton of minusButtons) {
        minusButton.addEventListener("click", (e) => {
          let id = e.target.closest("[data-id]").dataset["id"];
          this.removeItemFromOrder(id);
        })
      }

      document.querySelector(".button--order").classList.remove("hidden");
    }
  }

  send() {
    this.dataStore.sendOrder()
      .then(() => {
        alert("Vaše objednávka byla odeslána");
        delete this.dataStore.order;
        this.updateOrder();
      })
      .catch(() => {
        alert("Objednávku se nepodařilo odeslat!");
      })
  }
  
}

