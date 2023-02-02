import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Single } from "./components/pages/Single";
import { Error } from "./components/pages/Error";
export const rounter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/item/:names",
        element: <Single />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
