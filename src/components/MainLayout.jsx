import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* PAGE CONTENT */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/*FOOTER */}
      <Footer />
    </div>
  );
};

export default MainLayout;