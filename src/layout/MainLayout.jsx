import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <div className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default MainLayout;
