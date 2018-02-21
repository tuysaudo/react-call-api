import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';
import { connect } from 'react-redux';

class ProductActionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id : '',
            txtName :'',
            txtDesc : '',
            txtPrice :'',
            ckbStatus : ''
        };
    }
    componentDidMount() {
        var {match} = this.props;
        if(match){
            var id = match.params.id;
            this.props.onEditProduct(id);
        }
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps && nextProps.itemEditing){
        var { itemEditing } = nextProps;
        this.setState({
            id : itemEditing.id,
            txtName : itemEditing.name,
            txtDesc :  itemEditing.desc,
            txtPrice : itemEditing.price,
            ckbStatus :  itemEditing.status
        });
      }
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        });
    }
    onSave = (e) =>{
        e.preventDefault();
        var {id, txtName, txtDesc, txtPrice, ckbStatus} = this.state;
        var { history } = this.props;
        var product = {
          id : id,
          name : txtName,
          desc : txtDesc,
          price : txtPrice,
          status :  ckbStatus
        }
        if(id) {
            this.props.onUpdateProduct(product);
        }else {
            this.props.actAddProduct(product);
        }
        history.goBack();
        
    }
    render() {
        var { txtName, txtDesc, txtPrice, ckbStatus} = this.state;
        return (
            <div className="container">
                <div className="col-xs-4">
	               <form onSubmit={this.onSave}>
                       <div className="form-group">
                           <label> Name </label>
                           <input type="text" className="form-control" name="txtName"  value={txtName} onChange={this.onChange}/>
                       </div>
                        <div className="form-group">
                           <label> Description </label>
                           <input type="text" className="form-control"  name="txtDesc" value={txtDesc} onChange={this.onChange}/>
                       </div>

                       <div className="form-group">
                           <label> Price </label>
                           <input type="number" className="form-control" name="txtPrice"  value={txtPrice} onChange={this.onChange}/>
                       </div>
                        <div className="form-group">
                           <div className="checkbox">
                               <label>
                                   <input type="checkbox" name="ckbStatus"  value={ckbStatus} onChange={this.onChange} checked={ckbStatus}/> Còn hàng
                               </label>
                           </div>
                       </div>
                       <button type="submit" className="btn btn-primary mr-10"> Save </button>
                       <Link to="/product-list" className="btn btn-danger"> Go back </Link>
                   </form>
                </div>
            </div>
        );
        
    }
}
const mapStateToProps = (state) => {
    return {
        itemEditing : state.itemEditing
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        actAddProduct : (product) => {
            dispatch(actAddProductRequest(product))
        },
        onEditProduct : (id) => {
          dispatch(actGetProductRequest(id));
        },
        onUpdateProduct : (product) => {
          dispatch(actUpdateProductRequest(product));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
