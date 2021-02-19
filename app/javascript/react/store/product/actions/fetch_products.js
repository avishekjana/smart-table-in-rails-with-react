import axios from 'axios';
// Relative imports
import {
  PRODUCTS_FETCH_REQUEST,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_FAILURE
} from '../constants';

function requesting() {
  return {
    type: PRODUCTS_FETCH_REQUEST
  };
}
function requestSuccess(data) {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    payload: { data: data.data, meta: data.meta }
  };
}
function requestError(error) {
  return {
    type: PRODUCTS_FETCH_FAILURE,
    payload: error
  };
}

export default function fetchProducts(args = {}) {
  const { page, sort, sort_dir, name, is_active } = args;

  // Arranging parameters
  const params = {};
  if (page !== 'undefined' || typeof (page) !== 'undefined') {
    params["page"] = page
  }
  if (sort !== 'undefined' || typeof (sort) !== 'undefined') {
    params["sort"] = sort
  }
  if (sort_dir !== 'undefined' || typeof (sort_dir) !== 'undefined') {
    params["sort_dir"] = sort_dir
  }
  if (name !== 'undefined' || typeof (name) !== 'undefined') {
    params["name"] = name
  }
  if (is_active !== 'undefined' || typeof (is_active) !== 'undefined') {
    params["is_active"] = is_active
  }
  return function (dispatch) {
    dispatch(requesting());
    axios.get(`/api/v1/products.json`, { params })
      .then(response => {
        dispatch(requestSuccess(response.data));
      })
      .catch(error => {
        dispatch(requestError('Oops!! We are unable to load data, please try after sometime.'));
      });
  };
}
