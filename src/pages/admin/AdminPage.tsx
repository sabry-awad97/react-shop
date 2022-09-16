import './admin-page.css';

import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import AdminProducts from '../../components/admin-products/AdminProducts';
import AdminUsers from '../../components/admin-users/AdminUsers';
import PageContainer from '../../components/page-container/PageContainer';

const AdminPage: React.FC = () => {
  return (
    <PageContainer>
      <h1>Admin Panel</h1>
      <ul className="admin-sections">
        <li key="users">
          <NavLink
            to="users"
            className={({ isActive }) => {
              return isActive ? 'admin-link-active' : '';
            }}
          >
            Users
          </NavLink>
        </li>
        <li key="products">
          <NavLink
            to="products"
            className={({ isActive }) => {
              return isActive ? 'admin-link-active' : '';
            }}
          >
            Products
          </NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="users/*" element={<AdminUsers />} />
        <Route path="products/*" element={<AdminProducts />} />
      </Routes>
    </PageContainer>
  );
};

export default AdminPage;
