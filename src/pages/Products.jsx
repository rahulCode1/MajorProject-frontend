import { useEcommerce } from "../context/EcommerceContext";
import { useState, useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import SubCategoryFilter from "../components/SubCategoryFilter";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [changePrice, setChangePrice] = useState(5000);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const {
    productsList,
    productCart,
    searchText,
    wishlist,
    handleAddToCart,
    handleAddToWishList,
    fetchAllProducts,
  } = useEcommerce();

  const [searchParams] = useSearchParams();
  const productCategory = searchParams.get("category");

  const searchedProduct =
    searchText === ""
      ? productsList
      : productsList.filter(
          (product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.category.toLowerCase().includes(searchText.toLowerCase()) ||
            product.keywords.toLowerCase().includes(searchText.toLowerCase()) ||
            product.tags.includes(searchText.toLowerCase())
        );

  const priceFilter = searchedProduct.filter(
    (product) => Number(product.discountPrice) <= Number(changePrice)
  );

  const categoryFilter =
    category.length === 0
      ? priceFilter
      : priceFilter.filter((product) => product.category.includes(category));

  const subCategoryFilter =
    subCategory === "All"
      ? categoryFilter
      : categoryFilter.filter((product) => product.tags.includes(subCategory));

  const handleOnChangeCategory = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setCategory((prevStat) => [...prevStat, value]);
    } else {
      setCategory((prevStat) =>
        prevStat.filter((category) => category !== value)
      );
    }
  };
  const handleOnChangeSubCategory = (e) => {
    const { value } = e.target;

    setSubCategory(value);
  };

  const finalProduct = [...subCategoryFilter];

  if (sortBy === "HighToLow") {
    finalProduct.sort(
      (a, b) => Number(b.discountPrice) - Number(a.discountPrice)
    );
  } else if (sortBy === "LowToHigh") {
    finalProduct.sort(
      (a, b) => Number(a.discountPrice) - Number(b.discountPrice)
    );
  }

  const handleClearFilter = () => {
    setChangePrice(5000);
    setCategory([]);
    setSubCategory("All");
    setSortBy("");
  };

  useEffect(() => {
    fetchAllProducts(productCategory);
  }, [productCategory]);
  return (
    <main className="">
      <div className="row">
      
        <div class="text-end d-lg-none">
          <button
            class="btn p-2 bg-transparent border-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasResponsive"
          >
            <i class="bi bi-funnel fs-4"></i>
          </button>
        </div>

        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasResponsive"
        >
          <div class="offcanvas-header">
         
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div class="offcanvas-body">
            <div className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <strong>Filters</strong>
                <button
                  onClick={handleClearFilter}
                  className="btn btn-sm btn-outline-dark"
                >
                  Clear All
                </button>
              </div>

              <div className="py-3 border-bottom">
                <label htmlFor="range-mobile" className="form-label">
                  <strong>Price: </strong>₹ {changePrice}
                </label>
                <input
                  type="range"
                  step={50}
                  min={0}
                  max={5000}
                  onChange={(e) => setChangePrice(Number(e.target.value))}
                  value={changePrice}
                  className="form-range"
                  id="range-mobile"
                />
                <div className="d-flex justify-content-between">
                  <small className="text-muted">₹0</small>
                  <small className="text-muted">₹5000</small>
                </div>
              </div>

              <div className="border-bottom">
                <CategoryFilter
                  handleOnChangeCategory={handleOnChangeCategory}
                  filterCategory={category}
                />
              </div>

              <div className="border-bottom">
                <SubCategoryFilter
                  onChangeSubCategory={handleOnChangeSubCategory}
                  subCategory={subCategory}
                />
              </div>

              <div className="py-3">
                <label className="form-label mb-3">
                  <strong>Sort by</strong>
                </label>
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    value={"HighToLow"}
                    checked={sortBy === "HighToLow"}
                    id="HighToLow-mobile"
                    className="form-check-input"
                    name="sort-mobile"
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="HighToLow-mobile"
                  >
                    Price: High to Low
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    checked={sortBy === "LowToHigh"}
                    id="LowToHigh-mobile"
                    value={"LowToHigh"}
                    className="form-check-input"
                    name="sort-mobile"
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="LowToHigh-mobile"
                  >
                    Price: Low to High
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        <div className="col-md-3 d-none d-md-block border-end bg-white">
          <section className="p-3 sticky-top" style={{ top: "20px" }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <strong
                className="text-uppercase"
                style={{ letterSpacing: "1px", fontSize: "0.9rem" }}
              >
                Filters
              </strong>
              <button
                onClick={handleClearFilter}
                className="btn btn-sm btn-link text-decoration-none text-dark"
              >
                Clear All
              </button>
            </div>

            <div className="py-3 border-bottom">
              <label htmlFor="range-desktop" className="form-label mb-3">
                <strong>Price: </strong>
                <span className="text-success fw-bold">₹{changePrice}</span>
              </label>
              <input
                type="range"
                step={50}
                min={0}
                max={5000}
                onChange={(e) => setChangePrice(Number(e.target.value))}
                value={changePrice}
                className="form-range"
                id="range-desktop"
              />
              <div className="d-flex justify-content-between mt-2">
                <small className="text-muted">₹0</small>
                <small className="text-muted">₹5000</small>
              </div>
            </div>

            <div className="border-bottom">
              <CategoryFilter
                handleOnChangeCategory={handleOnChangeCategory}
                filterCategory={category}
              />
            </div>

            <div className="border-bottom">
              <SubCategoryFilter
                onChangeSubCategory={handleOnChangeSubCategory}
                subCategory={subCategory}
              />
            </div>

            <div className="py-3">
              <label className="form-label mb-3">
                <strong>Sort by</strong>
              </label>
              <div className="form-check mb-2">
                <input
                  type="radio"
                  value={"HighToLow"}
                  checked={sortBy === "HighToLow"}
                  id="HighToLow-desktop"
                  className="form-check-input"
                  name="sort-desktop"
                  onChange={(e) => setSortBy(e.target.value)}
                />
                <label className="form-check-label" htmlFor="HighToLow-desktop">
                  Price: High to Low
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  checked={sortBy === "LowToHigh"}
                  id="LowToHigh-desktop"
                  value={"LowToHigh"}
                  className="form-check-input"
                  name="sort-desktop"
                  onChange={(e) => setSortBy(e.target.value)}
                />
                <label className="form-check-label" htmlFor="LowToHigh-desktop">
                  Price: Low to High
                </label>
              </div>
            </div>
          </section>
        </div>

      
        <div className="col-md-9 bg-light min-vh-100 p-3 pb-5 mb-5 mb-md-0">
          <section>
            <div className="row">
              {finalProduct && (
                <div className="mb-4">
                  <h5 className="fw-bold mb-2" style={{ fontSize: "1.5rem" }}>
                    All Products
                  </h5>
                  <span className="text-muted">
                    Showing {finalProduct.length} products
                  </span>
                </div>
              )}
              {finalProduct &&
                finalProduct.length !== 0 &&
                finalProduct.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    productCart={productCart}
                    wishlist={wishlist}
                    handleAddToWishList={handleAddToWishList}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Products;
