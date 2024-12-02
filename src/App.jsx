import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";
function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setData(db);
  }, []);

  const addToCart = (item) => {
    const itemExists = cart.findIndex((el) => item.id === el.id);
    const updatedCart = [...cart];
    itemExists === -1
      ? (console.log("agregando..."),
        (item.quantity = 1),
        setCart([...cart, item]))
      : (console.log("ya existe..."),
        updatedCart[itemExists].quantity++,
        setCart(updatedCart));
  };

  //Remove elements from cart
  const removeFromCart = (id) => {
    setCart((pervCart) => pervCart.filter((guitar) => guitar.id !== id));
  };

  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
