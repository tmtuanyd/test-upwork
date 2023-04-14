import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SpinLoading from '../components/SpinLoading';

const Contractor = lazy(() => import('./contractor'));
const NotFound = lazy(() => import('pages/NotFound'));
export const AppRouters = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinLoading />}>
        <Routes>
          <Route path='/contractors/*' element={<Contractor />} />
          <Route path='/' element={<Navigate to='/contractors' replace />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
