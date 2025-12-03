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
    let url = `http://localhost/api/products`;

    if (category) {
      url = `http://localhost/api/products?category=${category}`;
    }

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Error occurred while fetching products.");
      }

      const data = await res.json();
      const products = data.data?.products;

      console.log(data)

      const transFormDat = products.map((product) => ({
        ...product,
        id: product._id,
      }));

      setProductList(transFormDat || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

 

  const fetchUserAddress = async () => {
    try {
      const res = await fetch(`http://localhost:80/api/address`);

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

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await fetch(`http://localhost:80/api/order`);

        if (!res.ok) {
          throw new Error("Error occurred while fetching order.");
        }

        const data = await res.json();
        const orders = data.data?.orders;
        setUserOrders(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  const handleAddToCart = (product) => {
    const tostId = toast.loading("Adding to cart...");

    setProductCart((prevCart) => {
      const exist = prevCart.find((cart) => cart.id === product.id);

      if (exist) {
        return prevCart.map((cart) => {
          return cart.id === product.id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart;
        });
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    toast.success("Product added to cart.", { id: tostId });
  };

  const handleIncreaseQuantity = (productId) => {
    setProductCart((prevCart) => {
      return prevCart.map((cart) => {
        return cart.id === productId
          ? { ...cart, quantity: cart.quantity + 1 }
          : cart;
      });
    });
  };

  const handleDecreaseQuantity = (productId) => {
    setProductCart((prevCart) => {
      const exist = prevCart.find((cart) => cart.id === productId);
      if (exist.quantity !== 1) {
        return prevCart.map((cart) => {
          return cart.id === productId
            ? { ...cart, quantity: cart.quantity - 1 }
            : cart;
        });
      } else {
        return [...prevCart.filter((cart) => cart.id !== productId)];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    const tostId = toast.loading("Remove from cart...");
    setProductCart((prevCart) =>
      prevCart.filter((cart) => cart.id !== productId)
    );

    toast.success("Successfully removed from cart.", { id: tostId });
  };

  const handleAddToWishList = (product) => {
    const tostId = toast.loading("Adding to wishlist...");
    setWishList((prevStat) => {
      const exist = prevStat.find(
        (wishProduct) => wishProduct.id === product.id
      );
      if (exist) {
        toast.success("Product removed from wishlist.", { id: tostId });
        return prevStat.filter((wishProduct) => wishProduct.id !== product.id);
      } else {
        toast.success("Successfully added to wishlist.", { id: tostId });

        return [...prevStat, { ...product }];
      }
    });
  };

  const handleWishListToCart = (product) => {
    const tostId = toast.loading("Adding to cart...");
    setProductCart((prevStat) => {
      const exist = prevStat.find((cartPrd) => cartPrd.id === product.id);

      if (exist) {
        toast.success("Product already exist on cart.", { id: tostId });
        return prevStat.map((cart) => {
          return cart.id === product.id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart;
        });
      } else {
        toast.success("Product moved to Cart.", { id: tostId });
        return [...prevStat, { ...product, quantity: 1 }];
      }
    });

    // setWishList((prevStat) =>
    //   prevStat.filter((wishPrd) => wishPrd.id !== product.id)
    // );
  };

  const handleCartToWishList = (product) => {
    const tostId = toast.loading("Adding to wishlist...");
    setWishList((prevStat) => {
      const exist = prevStat.find((wishPrd) => wishPrd.id === product.id);

      if (exist) {
        return prevStat;
      } else {
        return [...prevStat, { ...product }];
      }
    });

    setProductCart((prevCart) =>
      prevCart.filter((cart) => cart.id !== product.id)
    );
    toast.success("Product moved to Wishlist.", { id: tostId });
  };

  const handleAddAddress = async (address) => {
    setAddress((prevStat) => [...prevStat, { ...address, isDefault: false }]);
    await fetchUserAddress();
  };

  const handleRemoveAddress = async (addressId) => {
    setAddress((prevStat) =>
      prevStat.filter((address) => address.id !== addressId)
    );
    await fetchUserAddress();
  };

  const handleUpdateAddress = async (updatedAddress) => {
    setAddress((prevStat) => {
      return prevStat.map((prevAdd) => {
        return prevAdd.id === updatedAddress.id
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
        `http://localhost/api/address/update/${address.id}/default`,
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
        isDefault: userAdd.id === address.id,
      }));
    });

    await fetchUserAddress();
  };

  const handlePlaceOrder = (order) => {
    setUserOrders((prevStat) => [...prevStat, order]);
  };


  

  useEffect(() => {
    fetchUserAddress();
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
