import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetStartedPage } from './pages/get-started-page/GetStarted.page';
import { HomePage } from './pages/home-page/Home.page';
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
