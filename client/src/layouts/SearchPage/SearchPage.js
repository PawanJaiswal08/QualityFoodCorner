import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import './SearchPage.css'

const SearchPage = () => {

	const navigate = useNavigate()

    const [search, setSearch] = useState('');

	const handleSearchChange = search => event => {  
        setSearch(event.target.value);
    };

	const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setSearch(event.target.value);

			navigate(`/product/${search}`)
                
        } catch (error) {
            console.log("Not Found");
        }
    }


    return (
        <>
            <Navbar/>
            <div className="menubody" style={{display:"flex"}}>
				<div className="sidebar">
					<nav className="navv">
						<ul>
							<li>
								<div className="sidebar-heading">Q.F.C</div>
							</li>
							<li>
								<NavLink to="/menu/burger" onClick={ () => {
									// setLoading(true)
								}}>Burger</NavLink>
							</li>
							<li>
								<NavLink to="/menu/pizza" onClick={ () => {
									// setLoading(true)
								}}>Pizza</NavLink>
							</li>
							<li>
								<NavLink to="/menu/south indian" onClick={ () => {
									// setLoading(true)
								}}>South Indian</NavLink>
							</li>
							<li>
								<NavLink to="/menu/chinese" onClick={ () => {
									// setLoading(true)
								}}>chinese</NavLink>
							</li>
							<li>
								<NavLink to="/menu/beverages" onClick={ () => {
									// setLoading(true)
								}}>Beverages</NavLink>
							</li>
						</ul>
					</nav>
				</div>
				<div className="row prod-row" style={{backgroundColor:"var(--lightblack)"}}>
					<div className="search">
						<input type="text" className="searchTerm" placeholder="Type to search" value={search} onChange={handleSearchChange('search')}/>
						<button className="searchButton" onClick={onSubmit}>
							<i className="fas fa-search"></i>
						</button>
					</div>
				</div>
				
			</div>
            <Footer/>
        </>
    )
}

export default SearchPage;