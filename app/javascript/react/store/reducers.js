import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productReducer from './product/reducers/product';

const rootReducer = combineReducers({
  form: formReducer,
  product: productReducer
});

export default rootReducer;
