import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearchText, productCart, wishlist, searchText } = useEcommerce();
  const navigate = useNavigate();
  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  const updateQuaryParam = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
    navigate(`/products?${params}`);
  };

  const clearSearch = () => {
    setSearchText("");
    updateQuaryParam("search", "");
  };

  return (
    <>
      <nav className=" bg-body-tertiary py-3 shadow-sm">
        <div className="container d-flex align-items-center justify-content-between">
          {/* LEFT: LOGO */}
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            LUXLINA
          </NavLink>

          <div className="mx-3 flex-grow-1" style={{ maxWidth: "450px" }}>
            <div className="input-group rounded-pill border overflow-hidden bg-white shadow-sm">
              <input
                type="text"
                className="form-control border-0 shadow-none ps-4"
                placeholder="Search products..."
                style={{
                  backgroundColor: "transparent",
                  fontSize: "0.95rem",
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && searchText.length > 0) {
                    updateQuaryParam("search", searchText);
                  }
                }}
              />

              {/* Clear button - only show when there's text */}
              {searchText.length > 0 && (
                <button
                  onClick={clearSearch}
                  className="btn border-0 p-0"
                  style={{
                    backgroundColor: "transparent",
                  }}
                  title="Clear search"
                >
                  <FiX className="text-muted" size={20} />
                </button>
              )}

              {/* Search button */}
              <button
                onClick={() => updateQuaryParam("search", searchText)}
                className="btn border-0 pe-3"
                disabled={searchText.length === 0}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <FiSearch
                  className={
                    searchText.length === 0 ? "text-muted" : "text-primary"
                  }
                  size={20}
                />
              </button>
            </div>
          </div>

          {/* RIGHT: ICON NAV LINKS */}
          <ul className="navbar-nav d-flex flex-row gap-3 align-items-center">
            <li className="nav-item position-relative">
              <NavLink to="/wishlist" className="nav-link position-relative">
                <FiHeart size={22} />
                {wishlist.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.65rem", padding: "0.25em 0.5em" }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link position-relative">
                <FiShoppingCart size={22} />
                {totalItemsInCart > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                    style={{ fontSize: "0.65rem", padding: "0.25em 0.5em" }}
                  >
                    {totalItemsInCart}
                  </span>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/user" className="nav-link">
                <FiUser size={22} />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
