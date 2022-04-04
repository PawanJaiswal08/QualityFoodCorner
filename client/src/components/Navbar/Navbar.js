import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { signout, isAuthenticated } from './../../auth/index'
import { useNavigate  } from 'react-router-dom';
// const API = process.env.REACT_APP_BACKEND_API

const Navbar = () => {

    const navigate = useNavigate ();

    const [role , setRole] = useState('')

    useEffect(() => {

        const userDetails = async () => {

            try {

                const { user } = isAuthenticated()

                // console.log(user);

                if(user){
                   return setRole(user.role)
                }
                
                return
                
            } catch (error) {
				return console.log(error);
            }
            
        }

        userDetails()

    }, [])

    const navSlide = () => {
        
        const navbarLinks = document.getElementsByClassName('navbar-links')[0]
        navbarLinks.classList.toggle('active')
    } 

    return (
        <nav className="navbar">
            <NavLink to="/" style={{textDecoration: 'none'}} className="custom-card">
                <div className="brand-title" data-aos="fade-right" data-aos-duration="1200">QFC</div>
            </NavLink>
            <NavLink to={false} className="toggle-button" onClick={navSlide}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </NavLink>
            <div className="navbar-links">
                <ul>
                    <li>
                        <NavLink to="/menu/all"><i className="fab fa-elementor"></i>Menu</NavLink>
                    </li>

                    <li>
                        <NavLink to="/stores"><i className="fab fa-elementor"></i>Stores</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/menu/search"><i className="fas fa-search"></i>Search</NavLink>
                    </li>

                    { isAuthenticated() && (
                        <>
                            <li>
                                <NavLink to="/mycart"><i className="fas fa-shopping-cart"></i>My Cart</NavLink>
                            </li>

                            {
                                role === 1 ?   <li>
                                                    <NavLink to="/admin/dashboard"><i className="fas fa-user-shield"></i>A.Dashboard</NavLink>
                                                </li>
                                           
                                            :
                                                null
                            }
                        </>
                    )}


                    { !isAuthenticated() && (
                        <>
                            <li>
                                <NavLink to="/signup"><i className="fas fa-sign-out-alt"></i>Signup</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signin"><i className="fas fa-sign-out-alt"></i>Signin</NavLink>
                            </li>
                        </>
                    )}
                    
                    { isAuthenticated() && (
                        <>
                            <li>
                                <NavLink to="/profile">
                                <i className="fas fa-user"></i>Profile
                                </NavLink>
                            </li>
                            <li>
                                <span   to="/signout"
                                        onClick={() => {
                                            signout(() => {
                                                navigate("/");
                                            })
                                        }}
                                ><i className="fas fa-sign-out-alt"></i>Signout</span>
                            </li>
                            
                        </>
                    )}

                    
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
