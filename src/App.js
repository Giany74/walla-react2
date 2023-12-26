import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import AdsPage from './pages/ads/AdsPage';
import NewAdPage from './pages/ads/NewAdPage/NewAdPage';
import AdPage from './pages/ads/AdPage';
import RequireAuth from './pages/auth/components/RequireAuth';
import SignUpPage from './pages/auth/SignUpPage';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ads" element={<Layout />}>
        <Route index element={<AdsPage />} />
        <Route path=":adId" element={<AdPage />} />
        <Route
          path="new"
          element={
            <RequireAuth>
              <NewAdPage />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/" element={<Navigate to="/ads" />} />
      <Route path="/404" element={<div>404 | Not found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
