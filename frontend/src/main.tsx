import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/index.tsx";
import { About } from "./pages/about/index.tsx";
import "@radix-ui/themes/styles.css";
import { NextUIProvider } from "@nextui-org/react";
import { Theme } from "@radix-ui/themes";
import { Adopt } from "./pages/adopt/index.tsx";
import { Login } from "./pages/login/index.tsx";
import { MyPets } from "./pages/admin/myPets/index.tsx";
import { Profile } from "./pages/profile/index.tsx";
import { Favorites } from "./pages/favorites/index.tsx";
import { NotificationsContextProvider } from "./contexts/notificationContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/adotar",
        element: <Adopt />,
      },
      {
        path: "/sobre",
        element: <About />,
      },
      {
        path: "/meus-pets",
        element: <MyPets />,
      },
      {
        path: "/perfil",
        element: <Profile />,
      },
      {
        path: "/favoritos",
        element: <Favorites />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationsContextProvider>
      <Theme>
        <NextUIProvider>
          <RouterProvider router={router} />
        </NextUIProvider>
      </Theme>
    </NotificationsContextProvider>
  </React.StrictMode>
);
