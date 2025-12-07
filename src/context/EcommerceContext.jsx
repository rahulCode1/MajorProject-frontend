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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

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
      setIsLoading(true);

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
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchUserAddress = async () => {
    try {
      setIsLoadingAddress(true);
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
      setIsLoadingAddress(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      setIsLoadingOrders(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}order/6933ec16fa9368ef6b374eda`
      );

      if (!res.ok) {
        throw new Error("Error occurred while fetching order.");
      }

      const data = await res.json();
      const orders = data.data?.orders;
      setUserOrders(orders || []);
      setIsLoadingOrders(false);
    } catch (error) {
      throw new Error("Failed to fetch orders.");
    }
  };

  const fetchUserCarts = async () => {
    try {
      setIsLoadingCart(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/6933ec16fa9368ef6b374eda`
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
      setIsLoadingCart(false);
    } catch (error) {
      console.error("Failed to fetch cart.", error);
    }
  };

  const fetchUserWishlist = async () => {
    try {
      setIsLoadingWishlist(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}wishlist/6933ec16fa9368ef6b374eda`
      );

      if (!res.ok) {
        throw new Error("Error occurred while fetching wishlist.");
      }

      const data = await res.json();

      const transformData = data.wishlist.items.map((product) => ({
        ...product.productId,
      }));

      setIsLoadingWishlist(false);
      setWishList(transformData || []);
    } catch (error) {
      console.error("Failed to fetch wishlist.", error);
    }
  };

  const handleAddToCart = async (product, quantity) => {
    const tostId = toast.loading("Adding to cart...");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
          userId: "6933ec16fa9368ef6b374eda",
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
        return [...prevCart, { ...product, quantity }];
      }
    });

    toast.success("Product added to cart.", { id: tostId });
  };

  const handleIncreaseQuantity = async (productId) => {
    const toastId = toast.loading("Increase quantity...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/6933ec16fa9368ef6b374eda`,
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
      toast.success("Quantity increased", { id: toastId });
      const data = await response.json();
    } catch (error) {
      toast.error("Failed to increase quantity", { id: toastId });
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
    const toastId = toast.loading("Decrease quantity...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/decrease/6933ec16fa9368ef6b374eda`,
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
      toast.success("Quantity decreased", { id: toastId });
    } catch (error) {
      toast.error("Failed to decrease quantity", { id: toastId });
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
        `${process.env.REACT_APP_BACKEND_URL}cart/remove/6933ec16fa9368ef6b374eda`,
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
            userId: "6933ec16fa9368ef6b374eda",
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

  const handleRemoveToWishList = async (product) => {
    const tostId = toast.loading("Remove to wishlist...");
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
            userId: "6933ec16fa9368ef6b374eda",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product to wishlist.");
      }

      const data = await response.json();
    } catch (error) {
      throw new Error("Error occurred while remove product to wishlist.");
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
        return [...prevStat, { ...product }];
      }
    });
  };

  const handleWishListToCart = async (product) => {
    const tostId = toast.loading("Adding to cart...");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}wishlist/6933ec16fa9368ef6b374eda`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
        }
      );

      if (!response.ok) {
        throw new Error("Product not move to cart.");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      throw new Error("Error occurred while move to cart.");
    }

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

    setWishList((prevStat) =>
      prevStat.filter((wishPrd) => wishPrd._id !== product._id)
    );
  };

  const handleCartToWishList = async (product) => {
    const tostId = toast.loading("Adding to wishlist...");

    

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/moveto_wishlist/6933ec16fa9368ef6b374eda`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
        }
      );

      if (!response.ok) {
        throw new Error("Product not move to wishlist.");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      throw new Error("Error occurred while move to wishlist.");
    }

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
  const handleClearCart = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}cart/clear_cart/6933ec16fa9368ef6b374eda`,
        {
          method: "PATCH",
          headers: {
            "Content-Types": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Cart not clear.");
      }

      const data = await response.json();
    } catch (error) {
      throw new Error("Error occurred while clear cart.");
    }
  };

  const handleCancelOrder = async (id) => {
    const toastId = toast.loading("Order cancel...");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}order/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error occurred while cancel order.");
      }

      const data = await response.json();

      toast.success("Order canceled successfully.", { id: toastId });
    } catch (error) {
      toast.success("Error occurred while cancel order.", { id: toastId });
      throw new Error("Failed to cancel order.");
    }

    setUserOrders((prevStat) => prevStat.filter((order) => order._id !== id));
  };

  const handlePlaceOrder = async (order) => {
    await handleClearCart();
    setUserOrders((prevStat) => [...prevStat, order]);
    setProductCart([]);
    fetchAllOrders();
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
        isLoadingAddress,
        isLoadingOrders,
        isLoadingWishlist,
        isLoadingCart,
        isLoading,
        productsList,
        handleAddProducts,
        searchText,
        fetchUserCarts,
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
        handleRemoveToWishList,
        handleWishListToCart,
        handleCartToWishList,
        handleAddToWishList,
        handleAddAddress,
        handleRemoveAddress,
        handleUpdateAddress,
        handleSelectDefaultAddress,
        handlePlaceOrder,
        handleCancelOrder,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
export default EcommerceProvider;
