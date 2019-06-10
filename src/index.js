import DataStore from "./DataStore";
import Products from "./Products";
import Order from "./Order";

(() => {

  const dataStore = new DataStore();
  const order = new Order(dataStore);
  const products = new Products(dataStore, order);

  dataStore.loadData()
    .then(() => {
      products.renderHtml();
      order.updateOrder();
      document.querySelector("#order-btn").addEventListener("click", () => {
        order.send();
      })
    })
    
})();

