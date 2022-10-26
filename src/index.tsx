import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import QueryGen from "./routes/QueryGen";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/query-gen",
    element: <QueryGen />,
  },
]);

const queryClient = new QueryClient()


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
