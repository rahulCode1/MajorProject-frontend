import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const EcommerceContext = createContext();

export const useEcommerce = () => useContext(EcommerceContext);

const EcommerceProvider = ({ children }) => {
  const [productsList, setProductList] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [address, setAddress] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  const handleAddProducts = async (products) => {
    setProductList((prevStat) => [
      ...prevStat,
      { ...products, id: prevStat.length + 1 },
    ]);
  };

  const fetchAllProducts = async (category) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}products`;

    if (category) {
      url = `${process.env.REACT_APP_BACKEND_URL}products?category=${category}`;
    }

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Error occurred while fetching products.");
      }

      const data = await res.json();
      const products = data.data?.products;

      const transFormDat = products.map((product) => ({
        ...product,
      }));

      setProductList(transFormDat || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}address`);

      if (!res.ok) {
        throw new Error("Error occurred while fetching address.");
      }

      const data = await res.json();
      const address = data.data?.address;
      const transformAddress = address.map((address) => ({
        ...address,
        id: address._id,
      }));

      setAddress(transformAddress || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}order`);

      if (!res.ok) {
        throw new Error("Error occurred while fetching order.");
      }

      const data = await res.json();
      const orders = data.data?.orders;
      setUserOrders(orders || []);
    } catch (error) {
      throw new Error("Failed to fetch orders.");
    }
  };

  const fetchUserCarts = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/691c67a89e37556adb6635f8`
      );

      if (!res.ok) {
        throw new Error("Error occurred while fetching cart.");
      }

      const data = await res.json();
      const cart = data.cart.items;
      const transformCart = cart.map((product) => ({
        ...product.productId,

        quantity: product.quantity,
      }));

      setProductCart(transformCart || []);
    } catch (error) {
      console.error("Failed to fetch cart.", error);
    }
  };

  const fetchUserWishlist = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}wishlist/691c67a89e37556adb6635f8`
      );

      if (!res.ok) {
        throw new Error("Error occurred while fetching wishlist.");
      }

      const data = await res.json();

      const transformData = data.wishlist.items.map((product) => ({
        ...product.productId,
      }));

      setWishList(transformData || []);
    } catch (error) {
      console.error("Failed to fetch wishlist.", error);
    }
  };

  const handleAddToCart = async (product) => {
    const tostId = toast.loading("Adding to cart...");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          userId: "691c67a89e37556adb6635f8",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart.");
      }

      const data = await response.json();
    } catch (error) {
      toast.error("Failed to add product to cart.", { id: tostId });
    }

    setProductCart((prevCart) => {
      const exist = prevCart.find((cart) => cart._id === product._id);

      if (exist) {
        return prevCart.map((cart) => {
          return cart._id === product._id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart;
        });
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    toast.success("Product added to cart.", { id: tostId });
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/691c67a89e37556adb6635f8`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to increase product quantity in  cart.");
      }

      const data = await response.json();
    } catch (error) {
      throw new Error("Error occurred while increase product quantity.");
    }

    setProductCart((prevCart) => {
      return prevCart.map((cart) => {
        return cart._id === productId
          ? { ...cart, quantity: cart.quantity + 1 }
          : cart;
      });
    });
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/decrease/691c67a89e37556adb6635f8`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decrease product quantity in  cart.");
      }

      const data = await response.json();
    } catch (error) {
      throw new Error("Error occurred while decrease product quantity.");
    }

    setProductCart((prevCart) => {
      const exist = prevCart.find((cart) => cart._id === productId);
      if (exist.quantity !== 1) {
        return prevCart.map((cart) => {
          return cart._id === productId
            ? { ...cart, quantity: cart.quantity - 1 }
            : cart;
        });
      } else {
        return [...prevCart.filter((cart) => cart._id !== productId)];
      }
    });
  };

  const handleRemoveFromCart = async (productId) => {
    const tostId = toast.loading("Remove from cart...");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/remove/691c67a89e37556adb6635f8`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product from cart.");
      }

      const data = await response.json();
    } catch (error) {
      throw new Error("Error occurred while remove product form cart.");
    }

    setProductCart((prevCart) =>
      prevCart.filter((cart) => cart._id !== productId)
    );

    toast.success("Successfully removed from cart.", { id: tostId });
  };

  const handleAddToWishList = async (product) => {
    const tostId = toast.loading("Adding to wishlist...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
            userId: "691c67a89e37556adb6635f8",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product to wishlist.");
      }

      const data = await response.json();
    } catch (error) {
      throw new Error("Error occurred while add product to wishlist.");
    }

    setWishList((prevStat) => {
      const exist = prevStat.find(
        (wishProduct) => wishProduct._id === product._id
      );
      if (exist) {
        toast.success("Product removed from wishlist.", { id: tostId });
        return prevStat.filter(
          (wishProduct) => wishProduct._id !== product._id
        );
      } else {
        toast.success("Successfully added to wishlist.", { id: tostId });

        return [...prevStat, { ...product }];
      }
    });
  };

  const handleWishListToCart = (product) => {
    const tostId = toast.loading("Adding to cart...");
    setProductCart((prevStat) => {
      const exist = prevStat.find((cartPrd) => cartPrd._id === product._id);

      if (exist) {
        toast.success("Product already exist on cart.", { id: tostId });
        return prevStat.map((cart) => {
          return cart._id === product._id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart;
        });
      } else {
        toast.success("Product moved to Cart.", { id: tostId });
        return [...prevStat, { ...product, quantity: 1 }];
      }
    });

    // setWishList((prevStat) =>
    //   prevStat.filter((wishPrd) => wishPrd._id !== product._id)
    // );
  };

  const handleCartToWishList = (product) => {
    const tostId = toast.loading("Adding to wishlist...");
    setWishList((prevStat) => {
      const exist = prevStat.find((wishPrd) => wishPrd._id === product._id);

      if (exist) {
        return prevStat;
      } else {
        return [...prevStat, { ...product }];
      }
    });

    setProductCart((prevCart) =>
      prevCart.filter((cart) => cart._id !== product._id)
    );
    toast.success("Product moved to Wishlist.", { id: tostId });
  };

  const handleAddAddress = async (address) => {
    setAddress((prevStat) => [...prevStat, { ...address, isDefault: false }]);
    await fetchUserAddress();
  };

  const handleRemoveAddress = async (addressId) => {
    setAddress((prevStat) =>
      prevStat.filter((address) => address._id !== addressId)
    );
    await fetchUserAddress();
  };

  const handleUpdateAddress = async (updatedAddress) => {
    setAddress((prevStat) => {
      return prevStat.map((prevAdd) => {
        return prevAdd._id === updatedAddress._id
          ? { ...prevAdd, ...updatedAddress }
          : prevAdd;
      });
    });

    await fetchUserAddress();
  };

  const handleSelectDefaultAddress = async (address) => {
    const toastId = toast.loading("Adding default address...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}address/update/${address._id}/default`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update address status.");
      }

      const data = await response.json();

      toast.success("Default address set successfully.", { id: toastId });
    } catch (error) {
      toast.error("Failed to update address isDefault status.", {
        id: toastId,
      });
    }

    setAddress((prevStat) => {
      prevStat.map((userAdd) => ({
        ...userAdd,
        isDefault: userAdd._id === address._id,
      }));
    });

    await fetchUserAddress();
  };

  const handlePlaceOrder = (order) => {
    setUserOrders((prevStat) => [...prevStat, order]);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    fetchUserAddress();
  }, []);

  useEffect(() => {
    fetchUserCarts();
  }, []);

  useEffect(() => {
    fetchUserWishlist();
  }, []);

  return (
    <EcommerceContext.Provider
      value={{
        productsList,
        handleAddProducts,
        searchText,
        setSearchText,
        handleAddToCart,
        productCart,
        wishlist,
        address,
        userOrders,
        fetchAllProducts,
        fetchUserAddress,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveFromCart,
        handleAddToWishList,
        handleAddToWishList,
        handleWishListToCart,
        handleCartToWishList,
        handleAddToWishList,
        handleAddAddress,
        handleRemoveAddress,
        handleUpdateAddress,
        handleSelectDefaultAddress,
        handlePlaceOrder,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
export default EcommerceProvider;
