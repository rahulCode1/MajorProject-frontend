import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      {isLoading && <div className="global-loader">Loading...</div>}

      <Outlet />

      <Footer />
    </>
  );
};
export default Layout;
