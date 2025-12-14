import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";
import ErrorModal from "../components/ErrorModal";

const AddProducts = () => {
  const initialFormData = {
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    discountPrice: "",
    rating: "",
    costPrice: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    materialType: "",
    care: "",
    category: "",
    tags: [],
    image: "",

    metaTitle: "",
    metaDescription: "",
    keywords: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleAddProducts } = useEcommerce();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({ ...prevStat, [e.target.id]: e.target.value }));
  };

  const handleAddTags = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setTags((prevTag) => [...prevTag, value]);
    } else {
      setTags((prevTag) => prevTag.filter((tag) => tag !== value));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const tostId = toast.loading("Adding products...");
    const product = {
      name: formData.name,
      shortDescription: formData.shortDescription,
      description: formData.description,
      price: formData.price,
      discountPrice: formData.discountPrice,
      costPrice: formData.costPrice,
      length: formData.length,
      width: formData.width,
      height: formData.height,
      weight: formData.weight,
      materialType: formData.materialType,
      care: formData.care.split(", "),
      category: formData.category,
      tags,
      image: formData.image,
      rating: formData.rating,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      keywords: formData.keywords,
    };

    if (
      formData.name &&
      formData.shortDescription &&
      formData.description &&
      formData.care &&
      formData.category &&
      formData.price &&
      formData.discountPrice &&
      formData.costPrice &&
      formData.length &&
      formData.width &&
      formData.height &&
      formData.weight &&
      formData.materialType &&
      formData.image &&
      formData.metaTitle &&
      formData.description &&
      formData.keywords &&
      formData.rating &&
      tags.length !== 0
    ) {
      handleAddProducts(product);
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}product/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add new product.");
      }

      toast.success("Product added successfully.", { id: tostId });

      setFormData(initialFormData);

      navigate("/products");
    } catch (error) {
      setError(error.message || "An error occurred while add new product.");
      toast.error("An error occurred while add new product.", { id: tostId });
    }
    setIsLoading(false);
  };

  const tagsArray = [
    { value: "GodStatues", label: "God/Goddess Statues" },
    { value: "AnimalFigurines", label: "Animal Figurines" },
    { value: "BuddhaStatues", label: "Buddha Statues" },
    { value: "ModernSculptures", label: "Modern Sculptures" },
    { value: "MortarPestle", label: "Mortar & Pestle" },
    { value: "CuttingBoards", label: "Cutting Boards" },
    { value: "FruitBowls", label: "Fruit Bowls" },
    { value: "PenHolders", label: "Pen Holders" },
    { value: "Paperweights", label: "Paperweights" },
    { value: "Trophies", label: "Trophies" },
    { value: "TempleMandir", label: "Temple/Mandir" },
    { value: "PoojaThalis", label: "Pooja Thalis" },
    { value: "IncenseHolders", label: "Incense Holders" },
    { value: "PrayerItems", label: "Prayer Items" },
  ];

  return (
    <main className="container py-3">
      <h1>Add Product </h1>

      {isLoading && (
        <div className="overlay">
          <Loading />
        </div>
      )}

      {error && <ErrorModal message={error} onClose={() => setError("")} />}

      <Form
        onSubmit={handleFormSubmit}
        className="p-4 bg-white shadow-sm rounded"
      >
        <div className="mb-4">
          <label htmlFor="name" className="form-label fw-semibold">
            Product name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Product name"
            className="form-control form-control-lg"
            required
            onChange={handleOnChange}
            value={formData.name}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="shortDescription" className="form-label fw-semibold">
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            placeholder="Enter short description"
            className="form-control"
            required
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label fw-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            className="form-control"
            rows={8}
            required
            onChange={handleOnChange}
            placeholder="Enter product description"
          />
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label htmlFor="price" className="form-label fw-semibold">
              Price
            </label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                placeholder="Enter Product price"
                className="form-control"
                required
                min={0}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="discountPrice" className="form-label fw-semibold">
              Discount/Sale Price
            </label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={formData.discountPrice}
                placeholder="Enter discount price"
                className="form-control"
                required
                min={0}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label htmlFor="costPrice" className="form-label fw-semibold">
              Cost Price
            </label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                id="costPrice"
                name="costPrice"
                value={formData.costPrice}
                placeholder="Enter cost price"
                className="form-control"
                required
                min={0}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="length" className="form-label fw-semibold">
              Length
            </label>
            <div className="input-group">
              <input
                type="number"
                id="length"
                name="length"
                value={formData.length}
                placeholder="Enter product Length"
                className="form-control"
                required
                onChange={handleOnChange}
              />
              <span className="input-group-text">cm</span>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label htmlFor="width" className="form-label fw-semibold">
              Width
            </label>
            <div className="input-group">
              <input
                type="number"
                id="width"
                name="width"
                value={formData.width}
                placeholder="Enter product width"
                className="form-control"
                required
                onChange={handleOnChange}
              />
              <span className="input-group-text">cm</span>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="height" className="form-label fw-semibold">
              Height
            </label>
            <div className="input-group">
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                placeholder="Enter product height"
                required
                className="form-control"
                onChange={handleOnChange}
              />
              <span className="input-group-text">cm</span>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label htmlFor="weight" className="form-label fw-semibold">
              Weight
            </label>
            <div className="input-group">
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                required
                onChange={handleOnChange}
                placeholder="Enter product weight"
                className="form-control"
              />
              <span className="input-group-text">kg</span>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="rating" className="form-label fw-semibold">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              required
              onChange={handleOnChange}
              className="form-select"
            >
              <option value="" disabled selected>
                Select Product Rating
              </option>
              <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
              <option value={3}>⭐⭐⭐ (3 Stars)</option>
              <option value={2}>⭐⭐ (2 Stars)</option>
              <option value={1}>⭐ (1 Star)</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label htmlFor="materialType" className="form-label fw-semibold">
              Material Type
            </label>
            <select
              id="materialType"
              name="materialType"
              required
              onChange={handleOnChange}
              className="form-select"
            >
              <option selected disabled value={formData.materialType}>
                Select Material Type
              </option>
              <option value="WhiteMarble">White Marble</option>
              <option value="BlackMarble">Black Marble</option>
              <option value="GreenMarble">Green Marble</option>
              <option value="PinkMarble">Pink Marble</option>
              <option value="Granite">Granite</option>
              <option value="Sandstone">Sandstone</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="category" className="form-label fw-semibold">
              Select Category
            </label>
            <select
              id="category"
              name="category"
              required
              onChange={handleOnChange}
              className="form-select"
            >
              <option selected disabled value="">
                Select Category
              </option>
              <option value="StatuesIdols">Statues & Idols</option>
              <option value="HomeDecor">Home Decor</option>
              <option value="KitchenDining">Kitchen & Dining</option>
              <option value="GardenOutdoor">Garden & Outdoor</option>
              <option value="CorporateGifts">Corporate Gifts</option>
              <option value="ReligiousItems">Religious Items</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="care" className="form-label fw-semibold">
            Care Instructions
          </label>
          <textarea
            id="care"
            name="care"
            className="form-control"
            rows={8}
            required
            placeholder="Enter product care instructions (comma separated)"
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold d-block mb-3">Tags</label>
          <div className="border rounded p-3 bg-light">
            <div className="row g-2">
              {tagsArray.map((tag) => (
                <div className="col-md-4 col-sm-6" key={tag.value}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id={tag.value}
                      name={tag.value}
                      value={tag.value}
                      onChange={handleAddTags}
                      checked={tags.includes(tag.value)}
                      className="form-check-input"
                    />
                    <label htmlFor={tag.value} className="form-check-label">
                      {tag.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="form-label fw-semibold">
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter Image Link (URL)"
            required
            onChange={handleOnChange}
            className="form-control"
            value={formData.image}
          />
          <div className="form-text">
            Paste a direct link to the product image
          </div>
        </div>

        <hr className="my-5" />

        <h5 className="mb-3 text-primary">SEO Information</h5>

        <div className="mb-4">
          <label htmlFor="metaTitle" className="form-label fw-semibold">
            Meta Title
          </label>
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            className="form-control"
            placeholder="Enter SEO title (max 60 characters)"
            maxLength="60"
            required
            onChange={handleOnChange}
            value={formData.metaTitle}
          />
          <div className="form-text">
            {formData.metaTitle?.length || 0}/60 characters
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="metaDescription" className="form-label fw-semibold">
            Meta Description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            className="form-control"
            rows="3"
            placeholder="Enter SEO description (max 160 characters)"
            maxLength="160"
            required
            onChange={handleOnChange}
            value={formData.metaDescription}
          ></textarea>
          <div className="form-text">
            {formData.metaDescription?.length || 0}/160 characters
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="keywords" className="form-label fw-semibold">
            Keywords
          </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            className="form-control"
            required
            onChange={handleOnChange}
            value={formData.keywords}
            placeholder="Enter tags separated by commas (e.g., marble, handicraft, home decor)"
          />
          <div className="form-text">
            Separate multiple keywords with commas
          </div>
        </div>

        <div className="d-grid gap-2">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary btn-lg"
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Adding...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </Form>
    </main>
  );
};

export default AddProducts;
