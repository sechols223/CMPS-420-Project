import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetStartedPage } from './pages/GetStarted.page';
import { HomePage } from './pages/Home.page';
import GalleryPage from './pages/GalleryPage/Gallery-Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GetStartedPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/gallery',
    element: <GalleryPage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
