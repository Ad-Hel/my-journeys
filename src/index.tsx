import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './routes/Home';
import QueryGen from './routes/QueryGen';

const router = createHashRouter([
  {
    path: "/",
    element:<Home />,
  },
  {
    path: "/query-gen",
    element:<QueryGen />,
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

