import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddHabit from "../pages/AddHabit/AddHabit";
import PrivateRoute from "./PrivateRoute";
import MyHabits from "../pages/MyHabits/MyHabits";
import BrowsePublicHabits from "../pages/BrowsePublicHabits/BrowsePublicHabits";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-habit",
        element: (
          <PrivateRoute>
            <AddHabit />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-habits",
        element: (
          <PrivateRoute>
            <MyHabits />
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-public",
        element: <BrowsePublicHabits />,
      },
    ],
  },
]);

export default router;
