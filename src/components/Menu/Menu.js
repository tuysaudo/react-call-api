import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
	{
		name : 'Trang chủ',
		to : '/',
		exact : true
	},
	{
		name : 'Quản lý sản phẩm',
		to : '/product-list',
		exact : false
	}
]

const MenuLink = ({ label, to, activeOnlyWhenExact}) => {
	return (
		<Route 
			path={to} 
			exact={activeOnlyWhenExact} 
			children={ ({ match }) => {
				var active = match ? 'selected' : '';
				return (
				<li className={ `menu-item ${active}`}>
					<Link to={to} className="my-link"> {label} </Link>
				</li>
				)
			}}
		/>
	)
}

class Menu extends Component {
	
	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container">
				<ul className="nav navbar-nav">
					{ this.showMenus(menus) }
				</ul>
				</div>
			</nav>
		);
	}

	showMenus = (menus) => {
		var result = null;
		if(menus.length > 0){
			result = menus.map((menu, index) => {
				return (
					<MenuLink 
						key={index} 
						label={menu.name} 
						to={menu.to} 
						activeOnlyWhenExact={menu.exact}
					/>
				)
			});
		}
		return result;
	}
}

export default Menu;
