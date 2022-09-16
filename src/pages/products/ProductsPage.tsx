import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProducts, selectProducts } from '../../redux/ProductsReducer';
import ProductsList from '../../components/product-list/ProductsList';
import PageContainer from '../../components/page-container/PageContainer';

const ProductsPage: React.FC = () => {
  const { products, productsLoading } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <PageContainer>
      <p>Welcome to React Shop where you can get all your tools for ReactJS!</p>
      <ProductsList
        search={search}
        products={products}
        isLoading={productsLoading}
      />
    </PageContainer>
  );
};

export default ProductsPage;
