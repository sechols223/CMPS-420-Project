import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginForm } from './login/login-form';
import { AlbumPage } from './pages/AlbumPage/AlbumPage';
import GalleryPage from './pages/GalleryPage/Gallery-Page';
import { GetStartedPage } from './pages/get-started-page/GetStarted.page';
import { HomePage } from './pages/home-page/Home.page';
import { OpenAlbumPage } from './pages/OpenAlbumPage/open-album';
import { RegistrationForm } from './registration/RegistrationForm';

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
    element: <GalleryPage />,
  },
  {
    path: '/loginform',
    element: <LoginForm />,
  },
  {
    path: '/signupform',
    element: <RegistrationForm />,
  },
  {
    path: '/albums',
    element: <AlbumPage />,
  },
  {
    path: `/OpenAlbum/:albumId`,
    element: <OpenAlbumPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
