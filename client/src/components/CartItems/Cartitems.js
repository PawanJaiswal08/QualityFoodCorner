import React from "react";
import CartItem from "./CartItem/Cartitem";
import "./Cartitems.css";
import Loading from "./../../components/Loading/Loading";

const Cartitems = (props) => {

	const { cartItems, isLoading } = props;
	
	return (
		<div className="cart-items">
		{
			isLoading 	? 	(<Loading />) 
						: 	cartItems.length !== 0 	? 	(cartItems && cartItems.map(function (id, i) {
																		return <CartItem key={i} id={id} />
																	})) 
													: 	(<div style={{ color: "white" }}>No items in cart</div>)
		}
		</div>
	);
};

export default Cartitems;