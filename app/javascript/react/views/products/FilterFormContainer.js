import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';


// Relative imports
import fetchProducts from '../../store/product/actions/fetch_products';
import FilterForm from './FilterForm';

const FilterFormContainer = props => {

  const { handleSubmit } = props;

  const submitForm = ({ name, is_active }) => {
    props.fetchProducts({ name, is_active });
  }

  return (
    <FilterForm
      submitForm={submitForm}
      handleSubmit={handleSubmit}
    />
  );
}

const FilterFormReduxForm = reduxForm({
  form: 'ProductFilterForm',
  onChange: (values, dispatch, props, previousValues) => {
    props.submit();
  }
})(FilterFormContainer);

const FilterFormConnectReduxForm = connect(
  null,
  { fetchProducts }
)(FilterFormReduxForm);

export default FilterFormConnectReduxForm;
