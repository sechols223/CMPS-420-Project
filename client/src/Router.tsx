import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { LoginForm } from './login/login-form';
import GalleryPage from './pages/GalleryPage/Gallery-Page';
import { GetStartedPage } from './pages/get-started-page/GetStarted.page';
import { HomePage } from './pages/home-page/Home.page';
import { RegistrationForm } from './registration/RegistrationForm';
import { AlbumPage } from './pages/AlbumPage/AlbumPage';
import { NavBar } from './components/NavBar/Nav-Bar';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar/>,
    children: 
    [
      {
        path: '/',
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
      },
    ]
  },
  {
    path: '/get-started',
    element: <GetStartedPage/>
  },


]);

export function Router() {

  return <RouterProvider router={router} />;
}
