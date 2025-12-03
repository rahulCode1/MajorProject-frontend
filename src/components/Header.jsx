import { useState } from "react";
import { Link } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
const Header = () => {
  const { setSearchText, productCart, wishlist } = useEcommerce();

  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
      <div className="container-fluid container">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/products"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/add">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link active" aria-current="page">
                Cart ({totalItemsInCart})
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/wishlist"
                className="nav-link active"
                aria-current="page"
              >
                Wishlist ({wishlist.length})
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/addAddress"
                className="nav-link active"
                aria-current="page"
              >
                Add Address
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/userAddress"
                className="nav-link active"
                aria-current="page"
              >
                User Address
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/checkout"
                className="nav-link active"
                aria-current="page"
              >
                Checkout
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/orders"
                className="nav-link active"
                aria-current="page"
              >
                All Orders
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
