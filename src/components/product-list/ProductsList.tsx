import React from 'react';
import { Link } from 'react-router-dom';

import withLoader from '../../helpers/withLoader';
import { IProduct } from '../../types';

interface IProps {
  products?: IProduct[];
  search: string;
}

const ProductsList: React.FC<IProps> = props => {
  const search = props.search;
  return (
    <ul className="product-list">
      {props.products?.map(product => {
        if (
          !search ||
          (search &&
            product.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        ) {
          return (
            <li key={product.id} className="product-list-item">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
  );
};

export default withLoader(ProductsList);
