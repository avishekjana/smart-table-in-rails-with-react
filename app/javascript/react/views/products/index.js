import React from 'react';

import ProductsContainer from './ProductsContainer';
import FilterForm from './FilterFormContainer';

const Products = props => {
  return (
    <div>
      <h4>Listing Products</h4>
      <FilterForm />
      <ProductsContainer />
    </div>
  );
}
export default Products;