import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({ cart, authUser, clearCart }) {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const totalCost = cart.reduce((sum, item) => sum + item.price, 0);

  function handleOrder() {
    if (!address || !phone) {
      alert("Please fill in both address and phone number.");
      return;
    }
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => navigate("/"), 2000);
  }

  return (
    <div className="checkout-section" style={{
        maxWidth: '600px', margin: '2rem auto', background: 'rgba(255,255,255, 0.95)', 
        borderRadius: '12px', padding: '2rem', boxShadow: '0 0 16px rgba(0,0,0,0.13)'
      }}>
      <h2 style={{ color: "#226622", fontWeight: "700", fontSize: "2rem", marginBottom: "1rem" }}>
        Checkout
      </h2>
      {orderPlaced ? (
        <div style={{ color: "green", fontWeight: 600, fontSize: "1.3rem", margin: "1rem" }}>
          Order placed successfully! Thank you for shopping.<br />
          You’ll be redirected to the products page.
        </div>
      ) : (
        <>
          <h3 style={{ color: "#2e461f", margin: "1rem 0 0.5rem 0" }}>Order Summary</h3>
          <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
            {cart.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "8px" }}>
                {item.name} - Rs.{item.price} per {item.unit}
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: "bold", margin: "1rem 0" }}>
            Total: Rs.{totalCost}
          </div>
          <div style={{ margin: "1.2rem 0" }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Delivery Address:
              <textarea
                style={{
                  minWidth: "250px",
                  display: "block",
                  width: "100%",
                  marginTop: "0.3rem",
                  marginBottom: "0.8rem"
                }}
                value={address}
                placeholder="Enter delivery address"
                onChange={e => setAddress(e.target.value)}
              />
            </label>
            <label style={{ display: 'block' }}>
              Phone Number:
              <input
                type="tel"
                style={{
                  minWidth: "250px",
                  display: "block",
                  width: "100%",
                  marginTop: "0.3rem"
                }}
                value={phone}
                placeholder="Enter phone number"
                onChange={e => setPhone(e.target.value)}
              />
            </label>
          </div>
          <button
            onClick={handleOrder}
            style={{
              backgroundColor: "#4caf50", color: "#fff", padding: "10px 22px",
              border: "none", borderRadius: "5px", fontSize: "1.1rem", cursor: "pointer"
            }}
          >
            Place Order
          </button>
          <div style={{ marginTop: "1.3rem" }}>
            <Link to="/cart" style={{ color: "#4caf50" }}>Back to Cart</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;

