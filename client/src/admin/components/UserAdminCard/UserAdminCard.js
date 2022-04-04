import React from "react";
import "./UserAdminCard.css";

const UserAdminCard = (props) => {
	const { _id, profileImgUrl, name, lastname, email, address } = props;
	// console.log(address);
	return (
		<div className="row1-container">
			<div className="boxProduct">
				{
					profileImgUrl ? <img src={profileImgUrl} alt='' width="220px" height="220px"/> :
					<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
				}
				<h6>{name} {lastname} </h6>
				<br />
				<h6>{_id}</h6>
				<br />
				<h6>Email: {email}</h6>
				<br />
				<h6> Address:</h6>
				{address ? (
					<>
						<h6>Mobile: {address.mobile}</h6>
						<h6>City: {address.city}</h6>
						<h6>Street: {address.street}</h6>
						<h6>House No.: {address.houseNumber}</h6>
					</>) : null
				}
				<br />
				<div style={{display:"flex"}}>
                    <h6>Status: </h6> 
                    <h6 style={{color:"green", paddingLeft:"10px", fontWeight:"600"}}>true</h6>
                </div>
			</div>
		</div>
	);
};

export default UserAdminCard;
