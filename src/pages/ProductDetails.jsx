import { Link, useLoaderData } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import COD from "../imgs/COD.png";
import free from "../imgs/free.png";
import payment from "../imgs/payment.png";
import { useState } from "react";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { productCart, wishlist, handleAddToWishList, handleAddToCart } =
    useEcommerce();

  const productData = useLoaderData();
  const productInfo = productData.data.product;

  const checkProductIsWishlist = (id) => {
    return wishlist.some((product) => product._id === id);
  };

  const checkProductIsInCart = (id) => {
    return productCart.some((cart) => cart._id === id);
  };

  return (
    <main className="py-3">
      <section className="container py-5">
        <div className="row gy-5">
          
          <div className="col-md-6 d-flex justify-content-center">
            <div
              className="border rounded shadow-sm overflow-hidden"
              style={{ padding: "10px", maxHeight: "650px" }}
            >
              <img
                src={productInfo.image}
                className="img-fluid"
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </div>
          </div>

        
          <div className="col-md-6">
           
            <h1 className="fw-bold text-dark mb-3" style={{ fontSize: "2rem" }}>
              {productInfo.name}
            </h1>

           
            <div className="mb-3">
              <span
                className="fw-bold text-success"
                style={{ fontSize: "1.8rem" }}
              >
                ₹{productInfo.discountPrice}
              </span>
              <span
                className="text-muted ms-3"
                style={{ textDecoration: "line-through", fontSize: "1.2rem" }}
              >
                ₹{productInfo.price}
              </span>
            </div>

            <hr />

          
            <p className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
              {productInfo.shortDescription}
            </p>

            <p className="mb-3">
              <strong className="text-dark">Material Type:</strong>
              {productInfo.materialType}
            </p>

            <hr />

           
            <div className="mb-4">
              <label className="fw-bold mb-2 d-block">Quantity</label>

              <div className="d-flex align-items-center">
             
                <div
                  className="d-flex align-items-center border rounded-pill px-3 py-2"
                  style={{ width: "150px", justifyContent: "space-between" }}
                >
                  <button
                    disabled={quantity === 1}
                    onClick={() => setQuantity((prevStat) => prevStat - 1)}
                    className="btn btn-outline-dark btn-sm rounded-circle"
                  >
                    −
                  </button>

                  <span className="fw-bold">{quantity}</span>

                  <button
                    onClick={() => setQuantity((prevStat) => prevStat + 1)}
                    className="btn btn-outline-dark btn-sm rounded-circle"
                  >
                    +
                  </button>
                </div>

               

                {checkProductIsInCart(productInfo._id) ? (
                  <Link to={"/cart"} className="btn btn-dark px-4 py-2 ms-3">
                    Go to Cart
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAddToCart(productInfo, quantity)}
                    className="btn btn-dark px-4 py-2 ms-3"
                  >
                    Add to Cart
                  </button>
                )}

               

                {checkProductIsWishlist(productInfo._id) ? (
                  <Link
                    to="/wishlist"
                    className="btn btn-outline-dark px-4 py-2 ms-3"
                  >
                    Go to Wishlist
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAddToWishList(productInfo)}
                    className="btn btn-outline-dark px-4 py-2 ms-3"
                  >
                    Add to Wishlist
                  </button>
                )}
              </div>
            </div>

            <hr />

         
            <div className="d-flex text-center mb-4">
              <div className="me-4">
                <img
                  src={COD}
                  className="img-fluid mb-2"
                  style={{ width: "50px" }}
                />
                <p className="text-muted small">Cash on Delivery</p>
              </div>

              <div className="me-4">
                <img
                  src={free}
                  className="img-fluid mb-2"
                  style={{ width: "50px" }}
                />
                <p className="text-muted small">Free Delivery</p>
              </div>

              <div>
                <img
                  src={payment}
                  className="img-fluid mb-2"
                  style={{ width: "50px" }}
                />
                <p className="text-muted small">Secure Payment</p>
              </div>
            </div>

            <hr />

      
            <div className="mt-3">
              <p>
                <strong>Category:</strong> {productInfo.category}
              </p>
              <p>
                <strong>Tags:</strong> {productInfo.tags.join(", ")}
              </p>
              <p className="mt-3">
                <strong>Description:</strong>
                <br />
                <span className="text-muted">{productInfo.description}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;

export const loader = async ({ request, params }) => {
  const productId = params.id;

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}product/${productId}`
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: "Error occurred while fetching product details." },
        { status: 500 }
      )
    );
  } else {
    return response;
  }
};
