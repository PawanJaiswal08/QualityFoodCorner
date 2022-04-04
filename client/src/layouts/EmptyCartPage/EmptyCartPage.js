import React from "react";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import { NavLink } from "react-router-dom";
import "./EmptyCartPage.css";
import EmptyCartImage from "./../../images/hamburger.svg";

const EmptyCartPage = () => {
  return (
    <>
      <Navbar />
		<div className="emptycart" style={{ backgroundImage: `url(${EmptyCartImage})` }}>
			
		</div>
		<div className="add-btnn">
			<h3>Your cart is empty :(</h3>
			<span>
				<NavLink to="/menu/all" ></NavLink>
			</span>
		</div>
      <Footer />
    </>
  );
};

export default EmptyCartPage;
