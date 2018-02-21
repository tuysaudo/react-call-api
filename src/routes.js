import React from 'react';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductActionPage from './pages/ProductActionPage/ProductActionPage';

const routes = [
	{
		path : '/',
		exact : true,
		main : () => <Home />
	},
	{
		path : '/product-list',
		exact : false,
		main : ({match, location}) => <ProductListPage match={match} location={location}/>
	},
	{
		path : '/product/add',
		exact : true,
		main : ({ history }) => <ProductActionPage history={history}/>
	},

	{
		path : '/product/:id/edit',
		exact : true,
		main : ({ match, history }) => <ProductActionPage match={match}  history={history}/>
	},

	{
		path : '',
		exact : false,
		main : () => <NotFound />
	}
];

export default routes;
