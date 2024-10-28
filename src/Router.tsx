import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetStartedPage } from './pages/get-started-page/GetStarted.page';
import { HomePage } from './pages/home-page/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GetStartedPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
