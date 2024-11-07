import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GetStartedPage } from "./pages/get-started-page/GetStarted.page";

const router2 = createBrowserRouter([
    {
      path: '/',
      element: <GetStartedPage/>
    },
  ]);
  
export function Router2() {


return <RouterProvider router={router2} />;
}