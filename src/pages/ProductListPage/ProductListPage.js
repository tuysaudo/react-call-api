import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchProductsRequest, actDeleteProductRequest } from './../../actions/index';

class ProductListPage extends Component {
    componentDidMount(){
        this.props.fetchAddProducts();
    }
    onDelete = (id) => {
        this.props.onDeleteProduct(id);
    }
    
    render() {
        var { products } = this.props;
        
        return (
            <div className="page-products">
	            <div className="container">
	                <h1> Quản lý sản phẩm</h1>
	                <Link to="/product/add" className="btn btn-info mt-15"> Thêm sản phẩm </Link>

                    <ProductList>
                        { this.showProducts(products) }
	                </ProductList>
	            </div>
            </div>
        );
        
    }
    showProducts = (products) => {
        var result = null;

        if(products.length > 0){
            result = products.map((product, index) => {
                return  (
                    <ProductItem 
                        key = { index }
                        product = { product}
                        index = { index }
                        onDelete={this.onDelete}
                    />
                );
            });
        }

        return result;
    }
}

const mapStateToProps = (state) => {
    return {
        products : state.products
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAddProducts : () => {
            dispatch(actFetchProductsRequest())
        },

        onDeleteProduct : (id) => {
            dispatch(actDeleteProductRequest(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);

