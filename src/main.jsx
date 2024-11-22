import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Product from './pages/Product';
import Category from './pages/Category';
import Main from './pages/Main';
import Contact from './pages/Contact';
import Acount from './pages/Acount/index.jsx';
import './index.css'
import Shop from './pages/Shop/index.jsx';
import CheckOut from './pages/CheckOut/index.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/contact",
        element: <Contact />,
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
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>
);
