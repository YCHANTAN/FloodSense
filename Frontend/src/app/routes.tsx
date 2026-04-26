import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';
import LiveMap from '@/features/map/components/LiveMap';
import SubmitReportPage from '@/features/reports/pages/SubmitReportPage';
import AuthPage from '@/features/auth/pages/AuthPage';
import ProfilePage from '@/features/profile/pages/ProfilePage';
import ProtectedRoute from '@/components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <LiveMap />
      </ProtectedRoute>
    ),
  },
  {
    path: '/report',
    element: (
      <ProtectedRoute>
        <SubmitReportPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
