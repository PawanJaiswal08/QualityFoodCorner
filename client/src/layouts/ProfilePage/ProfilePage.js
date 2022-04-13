import React, { useState, useEffect } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import Loading from "./../../components/Loading/Loading"
import { isAuthenticated } from "../../auth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";
import "./ProfilePage.css";
const API = process.env.REACT_APP_BACKEND_API;

const ProfilePage = () => {

	const navigate = useNavigate()
	const { user, token } = isAuthenticated();

	var fullName = `${user.name} ${user.lastname}`;
	var email = `${user.email}`;

	const [AddressValues, setAddressValues] = useState({
		mobile: "",
		houseNumber: "",
		street: "",
		city: "",
	});

	const [Orders, setOrders] = useState([]);
	const [profileImgUrl, setProfileImgUrl] = useState("");

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	const [loading, setLoading] = useState(true)

	const handleChange = name => event => {  
		setAddressValues({ ...AddressValues, [name]: event.target.value });
	};


	const getUserValues = async () => {
		try {

			const { user, token } = isAuthenticated();

			const response = await axios.get(`${API}/user/${user._id}`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			});

			if (response) {
				var receivedUser = response.data;

				setOrders(receivedUser.orders);
				setProfileImgUrl(receivedUser.profileImgUrl);

				setAddressValues({
					mobile: `${receivedUser.address.mobile}`,
					houseNumber: `${receivedUser.address.houseNumber}`,
					street: `${receivedUser.address.street}`,
					city: `${receivedUser.address.city}`,
				});
				setLoading(false)
			}
		} catch (error) {
			console.log(error);
		}
	};
	
	useEffect(() => {
		getUserValues();
	}, []);

	const updateAddress = async (event) => {
			
		try {

			event.preventDefault();

			setAddressValues({ ...AddressValues });

			if (user._id === "undefined") {
				return null;
			}

			if (AddressValues.mobile === '' || AddressValues.city ==='' || AddressValues.street === '' || AddressValues.houseNumber === '') {
                Swal.fire({
                    title: 'User!',
                    icon: 'error',
                    text: 'All fields are required',
                })
            }

			else {

				var body = {
					address: {
						mobile:AddressValues.mobile,
						city: AddressValues.city,
						street: AddressValues.street,
						houseNumber: AddressValues.houseNumber
					}
				}

				const response = await axios.put(`${API}/user/${user._id}`, body, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					}
				})

				if (response.data.error) {
				setError(true)
				setErrorMsg(response.data.error)
			}

			else {
				setSuccess(true)						
				navigate('/')
			} 
			
			}

		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {

		if (error === true){
			Swal.fire({
				title: 'Address !',
				icon: 'error',
				text: errorMsg,
			})
		}
		
		if (success === true){
			Swal.fire({
				title: 'User Details !',
				icon: 'success',
				text: "User Details Updated Successfully",
			})
		}

	}, [success, error, errorMsg])

	return (
		<>
			{
				loading ? (<div className='loader'><Loading/></div>) :
				(
					<>
						<Navbar />
						<div className="profileOuter">
							<div className="py-5 mx-0">
							<div className="row">
								<div className="col-md-3">
								<div className="d-flex flex-column align-items-center text-center ">
									<img
									className="profileImage rounded-circle mt-5 mb-4"
									width="150px"
									height="150px"
									src={profileImgUrl}
									alt=""
									/>
									<div>
									</div>
									<h5 className="profilename">{fullName}</h5>	
									<div className="profilemail">{email}</div>
								</div>
								</div>
								<div className="flex col-md-9">
								<div className="px-3" style={{ padding: "0" }}>
									<div className="py-1">
									<h3 className="pb-4" style={{ textAlign: "center" }}>
										User Details
									</h3>

									<div className="boxxx p-4" style={{ textAlign: "center" }}>
										<div
										className="d-flex justify-content-start"
										style={{ justifyContent: "space-around" }}
										>
										<h6 className="tittle"> Mobile Number :&nbsp;</h6>
										<div> &nbsp; {AddressValues.mobile} </div>
										</div>
										<br />
										<div
										className="d-flex justify-content-start"
										style={{ alignItems: "flex-start" }}
										>
										<h6 className="tittle">Current Address :&nbsp;</h6>
										<div>
											{" "}
											&nbsp; {AddressValues.houseNumber} ,{" "}
											{AddressValues.street} , {AddressValues.city}
										</div>
										</div>
									</div>

									<br />

									<div
										className="col-md-12 pt-5 boxxx p-5 accordion"
										id="accordionExample"
									> 
										<div className="accordion-item">
										<h1 className="accordion-header" id="headingOne">
											<button
											className="accordion-button "
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseOne"
											aria-expanded="false"
											aria-controls="collapseOne"
											>
											Click To Update ( ADDRESS ) :
											</button>
										</h1>
										<div
											id="collapseOne"
											className="accordion-collapse collapse"
											aria-labelledby="headingOne"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
											<form>
												<label htmlFor="mobilenumber" className="labels">
												Phone No.
												</label>
												<input
												type="number"
												className="form-control"
												name="mobilenumber"
												id="mobilenumber"
												value={AddressValues.mobile}
												onChange={handleChange("mobile")}
												/>
												<label htmlFor="houseNumber" className="labels">
												House Number{" "}
												</label>
												<input
												type="text"
												className="form-control"
												name="houseNumber"
												id="houseNumber"
												value={AddressValues.houseNumber}
												onChange={handleChange("houseNumber")}
												/>
												<label htmlFor="street" className="labels">
												Street{" "}
												</label>
												<input
												type="text"
												className="form-control"
												name="street"
												id="street"
												value={AddressValues.street}
												onChange={handleChange("street")}
												/>
												<label htmlFor="city" className="labels">
												City{" "}
												</label>
												<input
												type="text"
												className="form-control"
												name="city"
												id="city"
												value={AddressValues.city}
												onChange={handleChange("city")}
												/>
												<button className="btn btn-primary profile-button my-3 p-3    " type="submit" onClick={updateAddress}>Update Address</button>
											</form>
											</div>
										</div>
										</div>
									</div>

									<br />
									</div>
								</div>
								<div className="px-3">
									<div className="py-5">
									<div
										className="align-center mb-3"
										style={{ textAlign: "center" }}
									>
										<h3 className="">YOUR ORDERS</h3>
									</div>
									<div
										className="col-md-12 py-5"
										style={{ textAlign: "center" }}
									>
										<div className="boxxx py-3">
										{Orders &&
											Orders.map((Order, index) => {
											return (
												<div
												className="row "
												style={{ justifyContent: "space-around" }}
												key={index}
												>
												<div className="col-md-6 py-3">
													<div>
													<h6 className="tittle">Status :  </h6>
													<div>{Order.status}</div>
													</div> 
												</div>
												<div className="col-md-6 py-3">
													<h6 className="tittle">Item Ordered : </h6>
													{Order.items &&
													Order.items.map((item, index) => {
														return (
														<div key={index}>
															<div>{item}, </div>
														</div>
														);
													})}
												</div>
												</div>
											);
											})}
										</div>
									</div>
									</div>
								</div>
								</div>
							</div>
							</div>
						</div>
						<Footer />
					</>
				) 
			}
			
		</>
	);
};

export default ProfilePage;