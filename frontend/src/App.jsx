import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import axios from 'axios';
import UserProfileForm from "./pages/UserProfileForm";
import Basket from "./pages/Basket";
import Payment from "./pages/Payment";
import OrderDetails from "./pages/OrderDetails";

// Configure Axios to include the correct CSRF token handling
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories/:slug" element={<CategoryPage />} />
          {/* <Route path="/productDetails/" element={<ProductDetails />} /> */}
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/user/register/" element={<Register />} />
          <Route path="/user/login/" element={<Login />} />
          <Route path="/user/profile/" element={<HomePage />} />
          <Route path="/user/profile/update/" element={<UserProfileForm />} />
          <Route path="/bassket" element={<Basket />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/payment/:orderId" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
