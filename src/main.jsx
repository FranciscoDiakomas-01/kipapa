import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Product from './pages/Product';
import Category from './pages/Category';
import Main from './pages/Main';
import Acount from './pages/Acount/index.jsx';
import './index.css'
import Shop from './pages/Shop/index.jsx';
import CheckOut from './pages/CheckOut/index.jsx';
import NotFound from './pages/NotFound/index.jsx';
import Login from './pages/login/index.jsx';
import "aos/dist/aos.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/category",
        element: <Category />,
      },

      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/acount",
        element: <Acount />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>
);
