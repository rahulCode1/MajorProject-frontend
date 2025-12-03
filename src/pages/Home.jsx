import { Link } from "react-router-dom";
import kitchenCategory from "../imgs/kitchen.png";
import giftCategory from "../imgs/gifts.png";
import religiousCategory from "../imgs/religious.png";
import decoreCategory from "../imgs/decore.png";

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

  return (
    <main className="py-4 bg-body-tertiary">
      <section className="container">
        {/* ===== TOP CATEGORY IMAGES ===== */}
        <div className="d-flex gap-3 w-100">
          {categories.map((data, i) => (
            <div key={i} className="flex-fill" style={{ minWidth: 0 }}>
              <Link to={`/products?category=${data.category}`}>
                <img
                  src={data.imgUrl}
                  alt={data.name}
                  className="img-fluid rounded w-100"
                  style={{
                    height: "180px", // fixed height (same for all)
                    objectFit: "cover", // crop to fit
                    width: "100%", // ensure equal width
                    borderRadius: "12px",
                  }}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* ===== WIDE BANNER ===== */}
        <div className="my-5">
          <div className="rounded overflow-hidden shadow-sm">
            <img
              src="https://picsum.photos/1200/500"
              className="img-fluid w-100 object-fit-cover"
              alt="Banner"
              style={{ height: "350px" }}
            />
          </div>
        </div>

        {/* ===== NEW ARRIVALS SECTION ===== */}
        <div className="row g-4">
          {[1, 2].map((_, i) => (
            <div className="col-md-6" key={i}>
              <div className="d-flex p-4 bg-body-secondary rounded shadow-sm h-100">
                <div className="flex-shrink-0">
                  <img
                    src={`https://picsum.photos/100/150?new=${i}`}
                    className="rounded"
                    alt="New Arrival"
                  />
                </div>

                <div className="px-4 d-flex flex-column justify-content-between">
                  <p className="text-muted mb-1">NEW ARRIVALS</p>

                  <div>
                    <h5 className="fw-bold mb-2">Heading</h5>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ab, repellat!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
