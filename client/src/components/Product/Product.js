import React, { useState, useEffect } from "react";
import "./Product.css";
import burger from './../../images/burger.jpg'
import { isAuthenticated } from "../../auth";
import { useNavigate } from "react-router-dom";
import { arrayBufferToBase64 } from './../../assets/BufferToBase64'
const API = process.env.REACT_APP_BACKEND_API

const Product = (props) => {

	const navigate = useNavigate()

	// sold, stock,
	const {_id, name, description, price,  photo, photoUrl } = props

	// console.log(_id);

	var img, binarystring;
	
	if(photo){
		binarystring = arrayBufferToBase64(photo.data.data)
		img = `data:image/jpeg;base64, ${binarystring}`;
	}
	

	const [ productAddedInCart,  setProductAddedInCart] = useState(false)

	const addCartItemsToDatabase = async () => {

		try {

			const { user, token } = isAuthenticated();

			let data = JSON.stringify({ productId: _id });

			if (user) {
				const response = await fetch(`${API}/user/add/cartItem/${user._id}`, {
					method: "PUT",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					},
					body: data
				})
	
				navigate('/mycart')
		
				if (response) {
					return response.json()
				}
			}

			if (!user) {
				navigate('/signin')
			}
			
		} catch (error) {
			return console.log(error);
		}
	}

	useEffect(()=>{

		const checkCartItems = async () => {

			try {
	
				const { user, token } = isAuthenticated();

				if (user) {

					const response = await fetch(`${API}/user/${user._id}`, {
						method: "GET",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`
						},
					})
		
					if (response) {
						var userdata = await response.json()
					}

					if (userdata.cartItems.includes(_id)) {
						setProductAddedInCart(true)
					}
					
				}
	
				
	
			} catch (error) {
				return console.log(error);
			}
		}	

		checkCartItems()
	},[_id])

	// _id added as a dependency

	return (

		<div className="prod">
			<article className="recipe">
				<div className="pizza-box">
					{

						!photoUrl 	? 	(photo ? <img src={img} alt="" /> : <img src={burger} alt="" />)
									:	(<img src={photoUrl} alt="" />)
						
					}
					
				</div>
				<div className="recipe-content">
					<h1 className="recipe-title">
						<span>{name}</span>
					</h1>

					<p className="recipe-metadata">
						<span className="recipe-rating">
							★★★★
							<span style={{ display: "inline", padding: "0" }}>☆</span>
							<span className="recipe-votes">(12 votes)</span>
						</span>
					</p>

					<p className="recipe-desc">{description}</p>
					<div className="try">
						<button className="recipe-save addcart" type="button">₹{price}</button>
						{	
							!productAddedInCart  	? 	(<button className="recipe-save addcart" type="button" onClick={() => addCartItemsToDatabase()}>
															<span style={{color:"inherit"}}>Add to Cart </span><i className="fas fa-cart-plus"></i>
														</button>)
													:   
														(<button className="recipe-save-added addedcart" type="button" onClick={() => navigate('/mycart')}>
															<span>Added </span><i className="fas fa-check" style={{color:"white"}}></i>
														</button>)
						}
					</div>
				</div>
			</article>
		</div>
	);
};

export default Product;
