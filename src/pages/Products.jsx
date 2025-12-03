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
        <div className="col-md-3">
          <section className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <strong>Filters </strong>
              <button onClick={handleClearFilter} className="btn">
                Clear
              </button>
            </div>
            <div className="py-3">
              <label htmlFor="range" className="form-label">
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
              />
              <div className="d-flex justify-content-between">
                <small>₹0</small>
                <small>₹5000</small>
              </div>
            </div>

            <CategoryFilter
              handleOnChangeCategory={handleOnChangeCategory}
              filterCategory={category}
            />
            <SubCategoryFilter
              onChangeSubCategory={handleOnChangeSubCategory}
              subCategory={subCategory}
            />

            <div className="py-3">
              <label className="form-check-label">
                <strong>Sort by </strong>
              </label>
              <div className="form-check">
                <input
                  type="radio"
                  value={"HighToLow"}
                  checked={sortBy === "HighToLow"}
                  id="HighToLow"
                  className="form-check-input"
                  name="sort"
                  onChange={(e) => setSortBy(e.target.value)}
                />
                <label className="form-check-label" htmlFor="HighToLow">
                  Price: High to Low
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  checked={sortBy === "LowToHigh"}
                  id="LowToHigh"
                  value={"LowToHigh"}
                  className="form-check-input"
                  name="sort"
                  onChange={(e) => setSortBy(e.target.value)}
                />
                <label className="form-check-label" htmlFor="LowToHigh">
                  Price: Low to High
                </label>
              </div>
            </div>
          </section>
        </div>
        <div className="col-md-9 bg-light  min-vh-100 p-3">
          <section>
            <div className="row ">
              {finalProduct && (
                <div>
                  <h5>Show All Products </h5>
                  <span>(Show {finalProduct.length} products )</span>
                </div>
              )}
              {finalProduct &&
                finalProduct.length !== 0 &&
                finalProduct.map((product) => (
                  <ProductCard
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
