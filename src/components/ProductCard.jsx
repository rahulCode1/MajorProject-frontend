
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  productCart,
  wishlist,
  handleAddToWishList,
  handleAddToCart,
 
}) {
 
  const checkProductIsWishlist = (id) => {
    return wishlist.some((product) => product.id === id);
  };

  const checkProductIsInCart = (id) => {
    return productCart.some((cart) => cart.id === id);
  };



  return (
    <div className="col-md-4 mb-4">
      <div className="card text-center border-0 shadow-sm rounded-4 overflow-hidden position-relative">
        {/* Wishlist Button */}
        <button
          onClick={() => handleAddToWishList(product)}
          className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm px-3 py-2"
          style={{ fontSize: "18px", zIndex: 10 }}
        >
          {checkProductIsWishlist(product.id) ? "❤️" : "♡"}
        </button>

        {/* Product Image */}
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none text-dark"
        >
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{
              height: "260px",
              objectFit: "cover",
              transition: "transform .3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Link>

        <div className="card-body p-4">
          {/* Name */}
          <h5 className="card-title fw-bold" style={{ fontSize: "1.2rem" }}>
            {product.name}
          </h5>

          {/* Price */}
          <p
            className="card-text mb-3"
            style={{ fontSize: "1.1rem", color: "#444" }}
          >
            <strong>₹{product.discountPrice}</strong>
          </p>

          {/* Add to Cart Button */}

          {checkProductIsInCart(product.id) ? (
            <Link to="/cart" className="btn btn-dark px-4 py-2 ms-3">
              Go to Cart{" "}
            </Link>
          ) : (
            <button
              onClick={() => handleAddToCart(product)}
              className="btn btn-dark px-4 py-2 rounded-pill shadow-sm"
              style={{ letterSpacing: "0.5px" }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
