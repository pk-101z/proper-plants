import { useState } from "react";
import PLANTS from "./data.js";

function MyCards({ plants = PLANTS, onAdd }) {
  return (
    <div>
      <h2>Plants</h2>
      <ul className="plantSide">
        {plants.map((item) => (
          <li className="plantItem" key={item.id}>
            <span>{item.image}</span>
            <span>{item.name}</span>
            <button className="addCart" onClick={() => onAdd(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MyCart({ cart = [], onAdd, onRemove }) {
  return (
    <div className="myCart">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>(empty)</p>
      ) : (
        <ul>
          {cart.map((c) => (
            <li key={c.id}>
              {c.image} {c.name} — {c.quantity}
              <button onClick={() => onAdd(c)} style={{ marginLeft: 8 }}>
                +
              </button>
              <button onClick={() => onRemove(c.id)} style={{ marginLeft: 4 }}>
                -
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found)
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === id);
      if (!found) return prev;
      if (found.quantity > 1)
        return prev.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        );
      return prev.filter((p) => p.id !== id);
    });
  }

  return (
    <>
      <main>
        <MyCards plants={PLANTS} onAdd={addToCart} />
        <MyCart cart={cart} onAdd={addToCart} onRemove={removeFromCart} />
      </main>
    </>
  );
}
