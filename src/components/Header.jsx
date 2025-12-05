import {  NavLink } from "react-router-dom";
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
        <NavLink className="navbar-brand" to="/">
          Navbar
        </NavLink>

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
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded bg-dark text-white fw-semibold shadow-sm"
                    : "nav-link px-3 py-2 text-dark fw-semibold"
                }
              >
                Products
              </NavLink>
            </li>

         
            <li className="nav-item">
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded bg-dark text-white fw-semibold shadow-sm"
                    : "nav-link px-3 py-2 text-dark fw-semibold"
                }
              >
                Add Product
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded bg-dark text-white fw-semibold shadow-sm"
                    : "nav-link px-3 py-2 text-dark fw-semibold"
                }
              >
                Cart ({totalItemsInCart})
              </NavLink>
            </li>

          
            <li className="nav-item">
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded bg-dark text-white fw-semibold shadow-sm"
                    : "nav-link px-3 py-2 text-dark fw-semibold"
                }
              >
                Wishlist ({wishlist.length})
              </NavLink>
            </li>

         
            <li className="nav-item">
              <NavLink
                to="/addAddress"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded bg-dark text-white fw-semibold shadow-sm"
                    : "nav-link px-3 py-2 text-dark fw-semibold"
                }
              >
                Add Address
              </NavLink>
            </li>

       
            <li className="nav-item">
              <NavLink
                to="/userAddress"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded bg-dark text-white fw-semibold shadow-sm"
                    : "nav-link px-3 py-2 text-dark fw-semibold"
                }
              >
                User Address
              </NavLink>
            </li>

           

          
            <li className="nav-item">
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded bg-dark text-white fw-semibold shadow-sm"
                    : "nav-link px-3 py-2 text-dark fw-semibold"
                }
              >
                Orders
              </NavLink>
            </li>

       
            <li className="nav-item">
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link px-3 py-2 rounded bg-dark text-white fw-semibold shadow-sm"
                    : "nav-link px-3 py-2 text-dark fw-semibold"
                }
              >
                Profile
              </NavLink>
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
