import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import RootLayout from "../components/layout/root";
import Error from "../pages/error";
import Login from "../pages/login";
import Register from "../pages/register";
import Slots from "../pages/slots";
import AllDoctors from "../pages/all-doctors";
import MyEvents from "../pages/my-events";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <MyEvents />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/slots", element: <Slots /> },
      { path: "/all-doctors", element: <AllDoctors />}
    ],
  },
];

export const router = createBrowserRouter(routes);
