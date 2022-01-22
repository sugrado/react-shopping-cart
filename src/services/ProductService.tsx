import axios from "axios";
export default class ProductService {
  getProducts() {
    return axios.get("http://localhost:3000/products");
  }
  getProductsByCategory(categoryId: number) {
    return axios.get(`http://localhost:3000/products?categoryId=${categoryId}`);
  }
}
