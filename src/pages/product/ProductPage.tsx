import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageContainer from '../../components/page-container/PageContainer';
import Product from '../../components/product/Product';
import { addToBasket, selectBasket } from '../../redux/basket-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProduct, selectProducts } from '../../redux/ProductsReducer';

const ProductPage: React.FC = () => {
  const { currentProduct, productsLoading } = useAppSelector(selectProducts);
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();

  const added = basket.products.some(p =>
    currentProduct ? p.id === currentProduct.id : false
  );

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const id: number = parseInt(params.id, 10);
      dispatch(getProduct(id));
    }
  }, [dispatch]);

  const handleAddClick = () => {
    currentProduct && dispatch(addToBasket(currentProduct));
  };

  return (
    <PageContainer>
      {currentProduct || productsLoading ? (
        <Product
          product={currentProduct!}
          inBasket={added}
          onAddToBasket={handleAddClick}
          isLoading={productsLoading}
        />
      ) : (
        <p>Product not found!</p>
      )}
    </PageContainer>
  );
};

export default ProductPage;
