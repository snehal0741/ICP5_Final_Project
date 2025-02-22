import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkLogin } from "../../utils/auth";
import "./Buy.css";
import axios from "axios";
// import ImgInc from "./inc.png";
// import ImgDec from "./dec.png";

export default function Buy() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [user, setUser] = useState({});

  const loadProduct = async () => {
    if (!id) {
      window.location.href = "/";
    }

    const response = await axios.get(`/mensproducts/${id}`);

    setProduct(response.data.data);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    checkLogin();
    loadProduct();
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  },[]);

  const placeOrder = async () => {
    const response = await axios.post("/order", {
      product: id,
      quantity: quantity,
      shippingAddress: shippingAddress,
      user: user._id,
    });

    alert(response.data.message);
    window.location.href = "/my-orders";
  };

  return (
    <div>
      <div className="buy-container">
        <img src={product.image} alt={product.name} className="buy-product-image" />
        <div style={{
          paddingTop:'1rem'
        }}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h3>₹ {product.price}</h3>

          <div className="quantity-container">
            <button
              //   src={ImgDec}
              onClick={decreaseQuantity}
              className="quantity-btn"
            >
              ▼
            </button>

            <span className="quantity-text">{quantity}</span>

            <button onClick={increaseQuantity} className="quantity-btn">
              ▲
            </button>
          </div>

          <input
            type="text"
            placeholder="Shipping Address"
            className="shipping-address"
            value={shippingAddress}
            onChange={(e) => {
              setShippingAddress(e.target.value);
            }}
          />

          <button type="button" className="order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
