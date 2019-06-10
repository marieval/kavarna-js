const API_NAME = 'maru';
const API_BASE = `https://czechitas.twoways.cz/api/${API_NAME}`;

export default class DataStore {
  constructor() {
    this.categories = [];
    this.products = [];
    this.order = {};
  }

  async loadData() {
    await Promise.all( [this.getCategories(), this.getProducts()] );
  } 

  async getCategories() {
    try {
      const response = await fetch(`${API_BASE}/categories`);
      const data = await response.json();
      this.categories = data;
    } catch {
      console.error("Failed to load categories from server");
    }
  }

  async getProducts() {
    try {
      const response = await fetch(`${API_BASE}/products`);
      const data = await response.json();
      this.products = data;
    } catch {
      console.error("Failed to load products from server");
    }
  }

  getProductById(id) {
    return this.products.find(product => product.id == id);
  }

  async sendOrder() {
    const orderToSend = {
      status: 0,
      table: 1,
      products: []
    }
    
    for (let id in this.order) {
      orderToSend.products.push({
        product_id: id,
        amount: this.order[id]
      })
    }
    
    await fetch(`https://czechitas.twoways.cz/api/${API_NAME}/orders`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(orderToSend)
    })
  }

}
