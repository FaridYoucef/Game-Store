  import React from "react";
  import Navbar from "./components/Navbar";
  import HomePage from "./pages/HomePage";
  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
  import CategoryPage from "./pages/CategoryPage";
  import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import Register from "./components/auth/Register";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories/:slug" element={<CategoryPage />} />
          <Route path="/productDetails/" element={<ProductDetails />} /> 
          <Route path="/register/" element={<Register />} /> 

        </Routes>
      </div>
    </Router>
  );
}

  export default App;
