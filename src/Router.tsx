import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetStartedPage } from './pages/GetStarted.page';
import { HomePage } from './pages/Home.page';

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
