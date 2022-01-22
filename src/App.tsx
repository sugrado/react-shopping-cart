import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CategoryList from "./CategoryList";
import { Cart } from "./models/cart";
import { Category } from "./models/category";
import { Product } from "./models/product";
import Navi from "./Navi";
import ProductList from "./ProductList";
import ProductService from "./services/ProductService";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";

function App() {
  const [currentCategory, setCurrentCategory] = useState<Category>(
    new Category()
  );
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState<Cart[]>([]);

  let productInfo = {
    title: "Product List",
    currentCategory: currentCategory,
  };
  let categoryInfo = {
    title: "Category List",
    currentCategory: currentCategory,
  };

  useEffect(() => {
    let productService: ProductService = new ProductService();
    productService.getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const idGenerator = () => {
    return new Date().toString() + Math.floor(Math.random() * 100);
  };

  const changeCategory = (category: Category) => {
    setCurrentCategory(category);
    let productService: ProductService = new ProductService();
    productService.getProductsByCategory(category.id).then((res) => {
      setProducts(res.data);
    });
  };

  const addToCart = (product: Product) => {
    var addedItem = cart.find((c) => c.product.id === product.id);
    if (addedItem) addedItem.quantity += 1;
    else
      setCart((oldCart) => [
        ...oldCart,
        {
          id: idGenerator(),
          product: product,
          quantity: 1,
        },
      ]);
    toast.success(`${product.productName} added to cart!`);
  };

  const removeFromCart = (product: Product) => {
    var item = cart.find((c) => c.product.id === product.id);
    if (item.quantity > 1) {
      setCart([
        ...cart.filter((c) => c.product.id !== product.id),
        { id: item.id, quantity: (item.quantity -= 1), product: product },
      ]);
    } else setCart(cart.filter((c) => c.product.id !== product.id));
    toast.success(`${product.productName} removed from cart!`);
  };

  return (
    <div>
      <Navi cart={cart} removeFromCart={removeFromCart} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-2">
            <CategoryList info={categoryInfo} changeCategory={changeCategory} />
          </div>
          <div className="col-md-10">
            <Routes>
              <Route
                path="/"
                element={
                  <ProductList
                    products={products}
                    addToCart={addToCart}
                    info={productInfo}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <CartList cart={cart} removeFromCart={removeFromCart} />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
