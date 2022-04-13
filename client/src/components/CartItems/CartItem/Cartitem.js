import React, { useState, useEffect } from "react";
import "./Cartitem.css";
import { isAuthenticated } from "./../../../auth/index";
import { arrayBufferToBase64 } from "../../../assets/BufferToBase64";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_BACKEND_API

const Cartitem = (props) => {

	const navigate = useNavigate()
	
	const {id} = props

	const [itemfromdb, setItemfromdb] = useState({});

	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		
		async function getItemFromDb() {

			try {
				const { user, token } = isAuthenticated();

				const response = await fetch(`${API}/product/${id}`, {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				
				if (response && user) {
					const item = await response.json();
					setItemfromdb(item);
					setLoading(false)
				}

			} catch (error) {
				return console.log(error);
			}
		}
		getItemFromDb();
	}, [id]);

	async function removeItemFromCart() {

		try {

			const { user, token } = isAuthenticated();

			let data = JSON.stringify({ productId: id });

			const response = await fetch(`${API}/user/remove/cartItem/${user._id}`, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: data
			});
			
			if (response && user) {
				setLoading(false)
			}
			
			navigate("/")
			navigate("/mycart")
			// window.location.reload(false);

		} catch (error) {
			return console.log(error);
		}
	}

	const { name, price, photo, photoUrl } = itemfromdb;
	
	var img, binarystring;
	
	if (photo) {
		binarystring = arrayBufferToBase64(photo.data.data);
		img = `data:image/jpeg;base64, ${binarystring}`;
	}

	return (
			
		<>
			{
				isLoading ? <Loading/> 
				
				: 	<div className="prodCartItem">
						<article className="recipe-cart">
							<div className="pizza-box-cart">
								{
									!photoUrl 	? 	(photo ? (<img src={img} alt="" />) : (<></>)) 
												: 	(<img src={photoUrl} alt="" />)
								}
							</div>
							<div className="recipe-content-cart">
								<div className="recipe-title-cart">
									<span>{name}</span>
									<button className="far fa-trash-alt" type="button" onClick={() => removeItemFromCart()}>
									</button>
								</div>
								<div className="try">
									<button className="recipe-save addcart" type="button">₹{price}</button>
									{/* <div className="recipe-control">
									<div style={{ color: "inherit", display: "flex" }}>
										<div id="minus" className="control-btn">
											<i className="fas fa-minus"></i>
										</div>
										<div className="item-qty">1</div>
										<div id="plus" className="control-btn">
											<i className="fas fa-plus"></i>
										</div>
									</div>
									</div> */}
								</div>
							</div>	
						</article>
					</div>
			}	
		</>			
	);
};

export default Cartitem;