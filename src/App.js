import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home';
import Layout from './components/Layout';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import EcommerceProvider from './context/EcommerceContext';
import Products from './pages/Products';
import ProductDetails, { loader as productDetailsLoader } from './pages/ProductDetails';
import AddProducts from './pages/AddProducts';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import AddAddress from './pages/AddAddress';
import UserAddress from './pages/UserAddress';
import UpdateAddress, { loader as addressUpdateLoader } from './pages/UpdateAddress';
import Checkout from './pages/Checkout';
import AllOrders from './pages/AllOrders';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/products", element: <Products /> },
        { path: "/products/:id", element: <ProductDetails />, loader: productDetailsLoader },
        { path: "/add", element: <AddProducts /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/addAddress", element: <AddAddress /> },
        { path: "/userAddress", element: <UserAddress /> },
        { path: "/address/:id", element: <UpdateAddress />, loader: addressUpdateLoader },
        { path: "/checkout", element: <Checkout /> },
        { path: "/orders", element: <AllOrders /> }
      ]
    }
  ])

  return (<EcommerceProvider>

    <RouterProvider router={router} />
  </EcommerceProvider>
  );
}

export default App;
