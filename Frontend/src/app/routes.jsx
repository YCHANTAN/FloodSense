import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../features/landing/pages/LandingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'map',
        element: <div>Dashboard/Map Placeholder</div>,
      },
      {
        path: 'report',
        element: <div>Submit Report Placeholder</div>,
      },
    ],
  },
]);
