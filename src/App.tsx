import { Store } from '@reduxjs/toolkit';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Header from './components/header/Header';
import ContactUsPage from './pages/contac-us/ContactUsPage';
import LoginPage from './pages/log-in/LoginPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import ProductPage from './pages/product/ProductPage';
import ProductsPage from './pages/products/ProductsPage';
import { RootState } from './redux/Store';

const AdminPage = React.lazy(() => import('./pages/admin/AdminPage'));

interface IProps {
  store: Store<RootState>;
}

const App: React.FC<IProps> = props => {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <Provider store={props.store}>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route index element={<Navigate to="products" />} />
            <Route path="contactus" element={<ContactUsPage />}></Route>
            <Route path="products" element={<ProductsPage />}></Route>
            <Route path="products/:id" element={<ProductPage />} />
            <Route
              path="admin/*"
              element={
                loggedIn ? (
                  <Suspense
                    fallback={<div className="page-container">Loading...</div>}
                  >
                    <AdminPage />
                  </Suspense>
                ) : (
                  <Navigate to="login" replace />
                )
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
