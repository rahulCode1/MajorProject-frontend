import { Link, useParams } from "react-router-dom";

import { useEcommerce } from "../context/EcommerceContext";

import COD from "../imgs/COD.png";
import free from "../imgs/free.png";
import payment from "../imgs/payment.png";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductItem = ({ productData }) => {
  const [quantity, setQuantity] = useState(1);
  const { productCart, wishlist, handleAddToWishList, handleAddToCart } =
    useEcommerce();
  const productId = useParams().id;

  const productInfo = productData.data.product;
  const similarProducts = productData.data.similarProducts;

  const checkProductIsWishlist = (id) => {
    return wishlist.some((product) => product.id === id);
  };

  const checkProductIsInCart = (id) => {
    return productCart.some((cart) => cart.id === id);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);
  return (
    <>
      <main className="bg-light min-vh-100">
        <section className="container py-5">
          <div className="row g-4 g-lg-5">
            <div className="col-lg-6">
              <div className="position-sticky" style={{ top: "100px" }}>
                <div className="card border-0 shadow-sm overflow-hidden">
                  <div className="card-body p-3 p-md-4 bg-white">
                    <img
                      src={productInfo.image}
                      className="img-fluid rounded"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                      alt={productInfo.name}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-white rounded shadow-sm p-4 p-md-5">
                <h1 className="display-5 fw-bold text-dark mb-3">
                  {productInfo.name}
                </h1>

                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="d-flex align-items-center">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`bi bi-star${
                          index < Math.floor(productInfo.rating) ? "-fill" : ""
                        } text-warning`}
                        style={{ fontSize: "1.2rem" }}
                      ></i>
                    ))}
                  </div>
                  <span className="fw-semibold text-dark">
                    {productInfo.rating}
                  </span>
                  <span className="text-muted">
                    ({productInfo.reviews || 0} reviews)
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                  <h2 className="text-success fw-bold mb-0 display-6">
                    ₹{productInfo.discountPrice}
                  </h2>
                  <span className="text-muted fs-5 text-decoration-line-through">
                    ₹{productInfo.price}
                  </span>
                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                    {Math.round(
                      ((productInfo.price - productInfo.discountPrice) /
                        productInfo.price) *
                        100
                    )}
                    % OFF
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-secondary fs-6 mb-3 lh-base">
                    {productInfo.shortDescription}
                  </p>
                  <div className="alert alert-light border d-flex align-items-center mb-0">
                    <i className="bi bi-box-seam me-2"></i>
                    <span>
                      <strong>Material:</strong> {productInfo.materialType}
                    </span>
                  </div>
                </div>

                <div className="card border mb-4">
                  <div className="card-body">
                    <label className="form-label fw-bold mb-3">
                      Select Quantity
                    </label>

                    <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center">
                      <div
                        className="input-group"
                        style={{ maxWidth: "140px" }}
                      >
                        <button
                          disabled={quantity === 1}
                          onClick={() =>
                            setQuantity((prevStat) => prevStat - 1)
                          }
                          className="btn btn-outline-secondary"
                          type="button"
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <input
                          type="text"
                          className="form-control text-center fw-bold"
                          value={quantity}
                          readOnly
                        />
                        <button
                          onClick={() =>
                            setQuantity((prevStat) => prevStat + 1)
                          }
                          className="btn btn-outline-secondary"
                          type="button"
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>

                      <div className="d-flex gap-2 flex-grow-1 flex-column flex-sm-row">
                        {checkProductIsInCart(productInfo.id) ? (
                          <Link
                            to="/cart"
                            className="btn btn-dark flex-grow-1 py-3 fw-semibold"
                          >
                            <i className="bi bi-cart-check me-2"></i>Go to Cart
                          </Link>
                        ) : (
                          <button
                            onClick={() =>
                              handleAddToCart(productInfo, quantity)
                            }
                            className="btn btn-dark flex-grow-1 py-3 fw-semibold"
                          >
                            <i className="bi bi-cart-plus me-2"></i>Add to Cart
                          </button>
                        )}

                        {checkProductIsWishlist(productInfo.id) ? (
                          <Link
                            to="/wishlist"
                            className="btn btn-outline-danger py-3 fw-semibold"
                            style={{ minWidth: "50px" }}
                          >
                            <i className="bi bi-heart-fill"></i>
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleAddToWishList(productInfo)}
                            className="btn btn-outline-secondary py-3 fw-semibold"
                            style={{ minWidth: "50px" }}
                          >
                            <i className="bi bi-heart"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-4">
                    <div className="card border-0 bg-light text-center h-100 py-3">
                      <div className="card-body p-2">
                        <img
                          src={COD}
                          className="img-fluid mb-2"
                          style={{ width: "48px", height: "48px" }}
                          alt="COD"
                        />
                        <p className="small text-muted mb-0 fw-semibold">
                          Cash on
                          <br />
                          Delivery
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="card border-0 bg-light text-center h-100 py-3">
                      <div className="card-body p-2">
                        <img
                          src={free}
                          className="img-fluid mb-2"
                          style={{ width: "48px", height: "48px" }}
                          alt="Free Delivery"
                        />
                        <p className="small text-muted mb-0 fw-semibold">
                          Free
                          <br />
                          Delivery
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="card border-0 bg-light text-center h-100 py-3">
                      <div className="card-body p-2">
                        <img
                          src={payment}
                          className="img-fluid mb-2"
                          style={{ width: "48px", height: "48px" }}
                          alt="Secure Payment"
                        />
                        <p className="small text-muted mb-0 fw-semibold">
                          Secure
                          <br />
                          Payment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 bg-light">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 me-2">
                        <i className="bi bi-tag me-1"></i>
                        {productInfo.category}
                      </span>
                    </div>
                    <div className="mb-3">
                      <strong className="d-block mb-2 text-dark">Tags:</strong>
                      <div className="d-flex flex-wrap gap-2">
                        {productInfo.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong className="d-block mb-2 text-dark">
                        Description:
                      </strong>
                      <p className="text-secondary mb-0 lh-base">
                        {productInfo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
              <h2 className="h3 fw-bold mb-0">Similar Products</h2>
              <span className="text-muted small">
                {similarProducts?.length || 0} items
              </span>
            </div>

            {/* MOBILE: Horizontal scroll */}
            <div className="d-lg-none">
              <div
                className="row flex-nowrap overflow-auto pb-3 gx-3"
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
              >
                {similarProducts && similarProducts.length !== 0 ? (
                  similarProducts.map((product) => (
                    <div key={product.id} className="col-9 col-sm-6">
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-light text-center py-5">
                      <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                      <h5 className="text-muted">No similar products found</h5>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DESKTOP: Normal grid */}
            <div className="row g-4 d-none d-lg-flex">
              {similarProducts && similarProducts.length !== 0 ? (
                similarProducts.map((product) => (
                  <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-light text-center py-5 border">
                    <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                    <h5 className="text-muted mb-0">
                      No similar products found
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductItem;
