import { Link } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";

export default function ProductCard({ product }) {
  const {
    productCart,
    wishlist,
    handleAddToWishList,
    handleAddToCart,
    handleRemoveToWishList,
  } = useEcommerce();
  const checkProductIsWishlist = (id) => {
    return wishlist.some((product) => product._id === id);
  };

  const checkProductIsInCart = (id) => {
    return productCart.some((cart) => cart._id === id);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 position-relative">
      {/* Wishlist Button */}
      <button
        onClick={() =>
          checkProductIsWishlist(product._id)
            ? handleRemoveToWishList(product)
            : handleAddToWishList(product)
        }
        className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm px-3 py-2"
        style={{ fontSize: "18px", zIndex: 10 }}
      >
        {checkProductIsWishlist(product._id) ? "❤️" : "♡"}
      </button>

      {/* Image */}
      <Link
        to={`/products/${product._id}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{
            height: "260px",
            width: "100%",
            objectFit: "cover",
            transition: "transform .3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Link>

      {/* Body */}
      <div className="card-body d-flex flex-column p-4">
        {/* Product Name */}
        <h5
          className="card-title fw-bold"
          style={{
            fontSize: "1.1rem",
            minHeight: "48px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </h5>

        {/* Price */}
        <p
          className="card-text mb-3"
          style={{ fontSize: "1.1rem", color: "#444" }}
        >
          <strong>₹{product.discountPrice}</strong>
        </p>

        {/* Action Button */}
        <div className="mt-auto">
          {checkProductIsInCart(product._id) ? (
            <Link to="/cart" className="btn btn-dark w-100 py-2">
              Go to Cart
            </Link>
          ) : (
            <button
              onClick={() => handleAddToCart(product, 1)}
              className="btn btn-dark w-100 py-2 rounded-pill shadow-sm"
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
