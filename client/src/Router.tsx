import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { NavBar } from './components/NavBar/Nav-Bar';
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
    element: <NavBar />,
    children: [
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
        element: <AlbumPage />,
      },
      {
        path: '/OpenAlbum/:albumId',
        element: <OpenAlbumPage />,
      },
      {
        path: '*',
        element: <div>Page not found</div>, // Simple catch-all route and fallback for debugging
      },
    ],
  },
  {
    path: '/get-started',
    element: <GetStartedPage />,
  },
]);

/* const router2 = createBrowserRouter([
  {
    path: '/',
    element: <GetStartedPage />,
  },
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
    element: <AlbumPage />,
  },
]); */

export function Router() {
  return <RouterProvider router={router} />;
}

/* export function Router2() {
  return <RouterProvider router={router2} />;
} */
