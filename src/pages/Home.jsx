import { Link } from "react-router-dom";
import kitchenCategory from "../imgs/kitchen.jpg";
import giftCategory from "../imgs/gifts.jpg";
import religiousCategory from "../imgs/religious.jpg";
import decoreCategory from "../imgs/decores.jpg";
import ganesh from "../imgs/ganesh.jpg";
import tray from "../imgs/tray.jpg";
import newArrivals from "../imgs/new.jpg";

const Home = () => {
  const categories = [
    {
      name: "Home Decor",
      category: "HomeDecor",
      imgUrl: decoreCategory,
    },
    {
      name: "Kitchen & Dining",
      category: "KitchenDining",
      imgUrl: kitchenCategory,
    },

    {
      name: "Corporate Gifts",
      category: "CorporateGifts",
      imgUrl: giftCategory,
    },
    {
      name: "Religious Items",
      category: "ReligiousItems",
      imgUrl: religiousCategory,
    },
  ];

  const newArrival = [
    {
      name: "Tray",
      image: tray,
      details: "White marble tray crafted from premium Makrana stone.",
    },
    {
      name: "Basket",
      image: newArrivals,
      details:
        "Handcrafted white marble basket with detailed carving work, ideal for gifting.",
    },
  ];

  return (
    <main className="py-4 bg-body-tertiary">
      <section className="container">
       
        <div className="d-flex gap-3 w-100">
          {categories.map((data, i) => (
            <div key={i} className="flex-fill" style={{ minWidth: 0 }}>
              <Link
                to={`/products?category=${data.category}`}
                className="text-decoration-none text-dark"
              >
                <img
                  src={data.imgUrl}
                  alt={data.name}
                  className="img-fluid rounded w-100"
                  style={{
                    height: "100px", 
                    objectFit: "cover", 
                    width: "100%", 
                    borderRadius: "12px",
                  }}
                />
                <p>{data.name}</p>
              </Link>
            </div>
          ))}
        </div>

      
        <div className="my-5">
          <div className="rounded overflow-hidden shadow-sm">
            <Link
              to={`/products?category=ReligiousItems`}
              className="text-decoration-none text-dark"
            >
              <img
                src={ganesh}
                className="img-fluid w-100 object-fit-cover"
                alt="Banner"
                style={{ height: "500px" }}
              />
            </Link>
          </div>
        </div>

       
        <div className="row g-4">
          {newArrival.map((product, i) => (
            <div className="col-md-6" key={i}>
              <Link
                to={`/products?category=HomeDecor`}
                className="text-decoration-none text-dark"
              >
                <div className="d-flex p-4 bg-body-secondary rounded shadow-sm h-100">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      className="rounded object-fit-cover"
                      style={{ height: "150px", width: "80px" }}
                      alt={product.name}
                    />
                  </div>

                  <div className="px-4 d-flex flex-column justify-content-between">
                    <p className="text-muted mb-1">NEW ARRIVALS</p>

                    <div>
                      <h5 className="fw-bold mb-2">{product.name}</h5>
                      <p className="mb-0">{product.details}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
