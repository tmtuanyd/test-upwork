import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ContractorPage = lazy(() => import('pages/contractors/ContractorsPage'));
const ContractorDetails = lazy(() => import('pages/contractors/ContractorDetails'));

const ContactorRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<ContractorPage />} />
      <Route path='/:id' element={<ContractorDetails />} />
    </Routes>
  );
};

export default ContactorRoute;
