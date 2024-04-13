import Home from "./components/Home";
import { useState, useEffect } from "react";
function App() {
  // init the products array with the local storage data || an empty array
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  // save the data in localstorage when ever the products data updates
  useEffect(
    () => localStorage.setItem("products", JSON.stringify(products)),
    [products]
  );
  return (
    <Home
      products={products}
      setProducts={setProducts}
    />
  );
}

export default App;