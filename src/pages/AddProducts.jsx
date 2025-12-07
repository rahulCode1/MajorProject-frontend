import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";
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
  const { handleAddProducts } = useEcommerce();
  const navigate = useNavigate();


  console.log(formData)

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
      tags.length !== 0
    ) {
      handleAddProducts(product);
    }

    setIsLoading(true);
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

      if (!res.ok) {
        throw new Error("Failed to add new product.");
      }

      const data = await res.json();
      toast.success("Product added successfully.", { id: tostId });
      setTimeout(() => {
        setFormData(initialFormData);
        setIsLoading(false);
        navigate("/products");
      }, 1000);
    } catch (error) {
      toast.error("An error occurred while add new product.", { id: tostId });
    }
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

      <Form onSubmit={handleFormSubmit} className="">
        <div className="">
          <label htmlFor="name" className="form-label">
            Product name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Product name"
            className="form-control"
            required
            onChange={handleOnChange}
            value={formData.name}
          />
        </div>
        <div className="">
          <label htmlFor="shortDescription" className="form-label">
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            placeholder="Enter Product name"
            className="form-control"
            required
            onChange={handleOnChange}
          />
        </div>

        <div className="">
          <label htmlFor="description" className="form-label">
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

        <div className="row">
          <div className="col">
            <div className="">
              <label htmlFor="price" className="form-label">
                Price
              </label>
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
          <div className="col">
            <div className="">
              <label htmlFor="discountPrice" className="form-label">
                Discount/Sale Price
              </label>
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

        <div className="row">
          <div className="col">
            <div className="">
              <label htmlFor="costPrice" className="form-label">
                Cost Price
              </label>
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
          <div className="col">
            <div className="">
              <label htmlFor="length" className="form-label">
                Length
              </label>
              <input
                type="number"
                id="length"
                name="length"
                value={formData.length}
                placeholder="Enter product Length in cm"
                className="form-control"
                required
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="">
              <label htmlFor="width" className="form-label">
                Width
              </label>
              <input
                type="number"
                id="width"
                name="width"
                value={formData.width}
                placeholder="Enter product width in cm"
                className="form-control"
                required
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="">
              <label htmlFor="height" className="form-label">
                Height
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                placeholder="Enter product height in cm"
                required
                className="form-control"
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="weight" className="form-label">
              Weight
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              required
              onChange={handleOnChange}
              placeholder="Enter product weight in kg"
              className="form-control"
            />
          </div>
          <div className="col">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <select id="rating" required onChange={handleOnChange} className="form-select">
              <option value={5} selected>
                5
              </option>
              <option value={5} selected>
                4
              </option>
              <option value={5} selected>
                3
              </option>
              <option value={5} selected>
                2
              </option>
              <option value={5} selected>
                1
              </option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="">
              <label htmlFor="materialType" className="form-label">
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
          </div>
          <div className="col">
            <div className="">
              <label htmlFor="category" className="form-label">
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
        </div>

        <div className="">
          <label htmlFor="care" className="form-label">
            Care Instructions
          </label>
          <textarea
            id="care"
            name="care"
            className="form-control"
            rows={8}
            required
            placeholder="Enter product care with comma separated"
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label className="form-label">Tags </label>

          {tagsArray.map((tag) => (
            <div className="form-check">
              <label htmlFor={tag.value} className="form-check-label">
                {tag.label}
              </label>
              <input
                type="checkbox"
                id={tag.value}
                name={tag.value}
                value={tag.value}
                onChange={handleAddTags}
                checked={tags.includes(tag.value)}
                className="form-check-input"
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter Image Link"
            required
            onChange={handleOnChange}
            className="form-control"
            value={formData.image}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="metaTitle" className="form-label">
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
        </div>

        <div className="mb-3">
          <label htmlFor="metaDescription" className="form-label">
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
        </div>

        <div className="mb-3">
          <label htmlFor="keywords" className="form-label">
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
        </div>
        <br />
        <br />
        <button disabled={isLoading} type="submit" className="btn btn-primary">
          {isLoading ? "Adding..." : " Add Product"}
        </button>
      </Form>
    </main>
  );
};

export default AddProducts;
