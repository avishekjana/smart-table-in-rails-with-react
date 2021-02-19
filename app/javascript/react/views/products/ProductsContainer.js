import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchProducts from '../../store/product/actions/fetch_products';
import SmartTable from './SmartTable';

class ProductsContainer extends Component {
  constructor(props) {
    super(props);
    this.handlePageNumberClick = this.handlePageNumberClick.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    this.state = {
      sort: null,
      sort_dir: null
    }
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  handlePageNumberClick(page) {
    const args = { page: page };
    const { sort, sort_dir } = this.state;
    if(sort && sort_dir) {
      args["sort"] = sort
      args["sort_dir"] = sort_dir
    }
    const formValues = this.props.filterForm;
    if(formValues.values && formValues.values.name) {
      args["name"] = formValues.values.name
    }
    if(formValues.values && formValues.values.is_active) {
      args["is_active"] = formValues.values.is_active
    }
    this.props.fetchProducts(args);
  }

  handleSorting(sort, sort_dir) {
    this.setState({ sort })
    this.setState({ sort_dir })
    const args = {};
    if(sort && sort_dir) {
      args["sort"] = sort
      args["sort_dir"] = sort_dir
    }
    const formValues = this.props.filterForm;
    if(formValues.values && formValues.values.name) {
      args["name"] = formValues.values.name
    }
    if(formValues.values && formValues.values.is_active) {
      args["is_active"] = formValues.values.is_active
    }
    this.props.fetchProducts(args);
  }

  render() {
    const {
      isFetching,
      isError,
      errorMessage,
      products,
      productMeta
    } = this.props;
    const isEmpty = products.length === 0;

    if (isEmpty && isFetching) {
      return <span>Loading...</span>;
    }
    if (isError) {
      return <span>{errorMessage}</span>;
    }
    if (isEmpty) {
      return <div className ="default-div"><h5>No product found with the current applied filters.</h5><h6>Try applying different filters.</h6></div>;
    }
    return (
      <SmartTable
        products={products}
        productMeta={productMeta}
        handlePageNumberClick={this.handlePageNumberClick}
        handleSorting={this.handleSorting}
    />
  );
  }
}
function mapStateToProps(state) {
  return {
    products: state.product.all,
    productMeta: state.product.meta,
    isFetching: state.product.isFetching,
    isError: state.product.isError,
    errorMessage: state.product.errorMessage,
    filterForm: state.form.ProductFilterForm
  };
}
export default connect(mapStateToProps, { fetchProducts })(ProductsContainer);

