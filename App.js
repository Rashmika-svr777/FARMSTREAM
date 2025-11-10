import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Checkout from "./Checkout";
import FarmVisitBooking from "./FarmVisitBooking";
import AboutFarmer from "./AboutFarmer";
import './App.css';

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="product-list">
      <h1>FarmStream Store Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>
              Rs.{product.price} per {product.unit}
            </p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail({ addToCart }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} className="product-image-detail" />
      <p>
        Price: Rs.{product.price} per {product.unit}
      </p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <br />
      <Link to="/">Back to Products</Link>
    </div>
  );
}

function Cart({ cart, removeFromCart }) {
  const totalCost = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <div className="cart-actions">
            <Link to="/">Back to Products</Link>
          </div>
        </>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - Rs.{item.price} per {item.unit}{" "}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div style={{ margin: "16px 0", fontWeight: "bold", fontSize: "1.2rem" }}>
            Total Cost: Rs.{totalCost}
          </div>
          <div className="cart-actions">
            <Link to="/checkout">Proceed to Checkout</Link>
            <Link to="/">Back to Products</Link>
          </div>
        </>
      )}
    </div>
  );
}

function ProtectedCart({ cart, removeFromCart, authUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      setTimeout(() => navigate("/login"), 500);
    }
  }, [authUser, navigate]);
  if (!authUser) return <div>Please log in to view your cart.</div>;
  return <Cart cart={cart} removeFromCart={removeFromCart} />;
}

function App() {
  const [cart, setCart] = useState([]);
  const [authUser, setAuthUser] = useState(
    localStorage.getItem("token") ? "User" : ""
  );

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));

  function handleLogout() {
    localStorage.removeItem("token");
    setAuthUser("");
  }

  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Products</Link>{" | "}
        <Link to="/book-visit">Farm Visit</Link>{" | "}
        <Link to="/about-farmer">About Farmer</Link>{" | "}
        {authUser ? (
          <>
            <span>Welcome, {authUser}</span>{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link> |{" "}
            <Link to="/login">Login</Link>
          </>
        )}{" "}
        | <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <ProtectedCart cart={cart} removeFromCart={removeFromCart} authUser={authUser} />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} authUser={authUser} clearCart={() => setCart([])} />}
        />
        <Route path="/book-visit" element={<FarmVisitBooking />} />
        <Route path="/about-farmer" element={<AboutFarmer />} />
      </Routes>
    </Router>
  );
}

export default App;

