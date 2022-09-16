import './header.css';

import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { selectBasket } from '../../redux/basket-reducer';
import { useAppSelector } from '../../redux/hooks';
import BasketSummary from '../basket-summary/BasketSummary';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const basket = useAppSelector(selectBasket);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearch(searchParams.get('search') || '');
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <header className="header">
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeydown}
        />
        <BasketSummary count={basket.products.length} />
      </div>
      <img src="/logo.svg" className="header-logo" alt="logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <NavLink
          to="/products"
          className={({ isActive }) => {
            return 'header-link ' + (isActive ? 'header-link-active' : '');
          }}
        >
          Products
        </NavLink>

        <NavLink
          to="/contactus"
          className={({ isActive }) => {
            return 'header-link ' + (isActive ? 'header-link-active' : '');
          }}
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) => {
            return 'header-link ' + (isActive ? 'header-link-active' : '');
          }}
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
