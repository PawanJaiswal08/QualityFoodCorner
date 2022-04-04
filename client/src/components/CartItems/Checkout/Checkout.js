import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { isAuthenticated } from "./../../../auth/index";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
const API = process.env.REACT_APP_BACKEND_API;

const Checkout = (props) => {

	const navigate = useNavigate()

	const { cartItems, isLoading } = props;

	const [itemsLength, setItemsLength] = useState(0);
	const [itemsTotal, setItemsTotal] = useState(0);
	const [success, setSuccess] = useState('');
	const [discountVal, setDiscountVal] = useState(0);
	const [couponApplied, setCouponApplied] = useState(false);
  	const [dV, setDV] = useState(0);
	
	var productPriceTotal = 0;
	
	const getItemPrice = async (prodid) => {
		
		try {

			var product;

			const response = await fetch(`${API}/product/${prodid}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})

			if (response) {

				product = await response.json()

				productPriceTotal += product.price;
				setItemsTotal(productPriceTotal);
			}

		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {

		setItemsLength(cartItems.length);

		cartItems.map(async (item) => {
			await getItemPrice(item);
		});
	
	}, [isLoading, cartItems]) // eslint-disable-line react-hooks/exhaustive-deps

	
	var offers = {
		FREE5: 5,
		FREE10: 10,
		FREE20: 20,
		FREE30: 30,
		FREE50: 50,
	};
	
	const handleChange = (event) => {
		setDiscountVal(event.target.value);
	};


	const onDiscountSubmit = (event) => {

		event.preventDefault();
		
		if (offers[discountVal]) {
		  	setDV(offers[discountVal]);
			setCouponApplied(true)
		}
		
		else{
		  alert("Not a valid code.")
		}
	};

	const onCheckOut = async () => {

		try {

			const { user, token } = isAuthenticated()

			if (!user.address) {
				navigate('/add/address')
			}

            const response = await fetch(`${API}/user/checkout/cartItems/${user._id}`,{
				method:"PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
			});

            if (response) {
                var data = await response.json()
            }

			if (data.success) {
				setSuccess(true)
				navigate('/')
			}
                
        } catch (error) {
            console.log("Signin Failed");
        }
	}

	var gst = Number((itemsTotal * 18) / 100).toFixed(3);
	var discount = Number((itemsTotal * dV) / 100).toFixed(3);
	var finaltotal = Number( Number(itemsTotal) + Number(gst) - Number(discount)).toFixed(2);
	var checkoutTotal = Number(finaltotal).toFixed(0)

	useEffect(() => {
        if (success === true){
            Swal.fire({
                title: 'Order !',
                icon: 'success',
                text: "Order Successful",
            })
        }
    }, [success])

	return (
		<div className="card checkout-block">
			<div className="item-total">{itemsLength} Items</div>
			<br />
			<div className="bill-details">
				<div className="sub-total">Item Total</div>
				<div className="sub-total">₹{itemsTotal}</div>
			</div>
			<hr />
			<div className="bill-details">
				<div className="sub-total">GST(18%)</div>
				<div className="sub-total">+ ₹{gst}</div>
			</div>
			<hr />
			<div className="bill-details">
				<div className="sub-total">Discount</div>
				<div className="sub-total">- ₹{discount}</div>
			</div>
			<form>
			<input type="text" onChange={handleChange} placeholder="Discount code" />
			{
				!couponApplied ? <button onClick={onDiscountSubmit}>Apply</button> : <div style={{color:"green"}}>Coupon Applied Succsessfully</div>
			}		
			</form>
      		<hr />
			<div className="bill-details">
				<div className="sub-total">Total</div>
				<div className="sub-total">₹{finaltotal}</div>
			</div>
			<button className="checkout-btn" type="button" onClick={onCheckOut}>
				<div className="checkout">Checkout</div>
				<div className="checkout-amount">₹{checkoutTotal}</div>
			</button>
		</div>
  	);
};

export default Checkout;