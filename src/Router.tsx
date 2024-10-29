import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginForm } from './login/login-form';
import { GetStartedPage } from './pages/get-started-page/GetStarted.page';
import { HomePage } from './pages/home-page/Home.page';
import GalleryPage from './pages/GalleryPage/Gallery-Page';
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
    element: <GalleryPage />
  }
    path: '/loginform',
    element: <LoginForm />,
  },
  {
    path: '/signupform',
    element: <RegistrationForm />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
