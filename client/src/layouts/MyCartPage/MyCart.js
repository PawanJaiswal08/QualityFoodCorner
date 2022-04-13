import React, { useState, useEffect } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import EmptyCartPage from "./../../layouts/EmptyCartPage/EmptyCartPage";
import CartItems from "../../components/CartItems/Cartitems";
import CheckoutBox from "./../../components/CartItems/Checkout/Checkout";
import { isAuthenticated } from "./../../auth/index";
import "./MyCart.css";
const API = process.env.REACT_APP_BACKEND_API;

const MyCart = () => {

	const [cartItems, setCartItems] = useState([]);
	const [isLoading, setLoading] = useState(true);
	
	try {
		
		useEffect(() => {

			const getCartItemData = async () => {
				
				try {

					const { user, token } = isAuthenticated();

					if (user._id === "undefined") {
						return null;
					} 
					
					else {

						const response = await fetch(`${API}/user/${user._id}`, {
							method: "GET",
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
						})

						if (response) {
							const tempuser = await response.json();
							setCartItems(tempuser.cartItems);
							setLoading(false);
						}
					}
				} catch (error) {
					console.log(error);
				}
			}

		getCartItemData()
		
		}, [isLoading]);
	
	} catch (err) {
		console.log("Error", err);
	}
	
	return (
		<>
			{
				cartItems.length > 0 	? 	(
												<>
													<Navbar />
													<div className="cartpage">
														<div className="row">
														<div className="col-md-8">
															<CartItems cartItems={cartItems} isLoading={isLoading} />
														</div>
														<div className="col-md-4">
															<CheckoutBox cartItems={cartItems} isLoading={isLoading} />
														</div>
														</div>
													</div>
													<Footer />
												</>
											) 
										: 	(<EmptyCartPage />)
			}
		</>
	);
};

export default MyCart;