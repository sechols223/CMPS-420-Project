import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginForm } from './login/login-form';
import GalleryPage from './pages/GalleryPage/Gallery-Page';
import { GetStartedPage } from './pages/get-started-page/GetStarted.page';
import { HomePage } from './pages/home-page/Home.page';
import { RegistrationForm } from './registration/RegistrationForm';
import { AlbumPage } from './pages/AlbumPage/AlbumPage';

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
    element: <AlbumPage/>
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
