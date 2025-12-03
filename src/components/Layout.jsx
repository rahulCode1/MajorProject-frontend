import { Outlet, useNavigation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Header from "./Header";
const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isLoading && (
        <div className="global-loader">
          <RotatingLines strokeColor="#fff" />
        </div>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
