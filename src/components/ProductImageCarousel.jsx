import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import "swiper/css/thumbs";

const ProductImageCarousel = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="d-flex flex-column h-100">
      {/* Main slider */}
      <div className="flex-grow-1 mb-3">
        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation
          spaceBetween={10}
          className="h-100"
          style={{ height: "100%" }}
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="d-flex align-items-center justify-content-center"
            >
              <img
                src={img.url}
                alt=""
                className="w-100 rounded"
                style={{
                  height: "100%",
                  maxHeight: "calc(100% - 10px)",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails */}
      <div style={{ height: "90px" }}>
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          slidesPerView={4}
          spaceBetween={10}
          watchSlidesProgress
          className="h-100"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img.url}
                alt=""
                className="w-100 rounded border"
                style={{
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductImageCarousel;
