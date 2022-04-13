import React from 'react';
import './Footer.css';
import {NavLink} from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="row">
                <div className="footer-col">
                    <h4>About Us</h4>
                    <ul>
                        <li>
                            <NavLink to="/#">Thanks for being here <br/>and being the part of <br/>this
                            prestigious family <br/>hope you all like this<br/> keep
                            supporting!!</NavLink>
                        </li>
                        <li><NavLink to="/developers">More about us</NavLink></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Help</h4>
                    <ul>
                        <li><NavLink to="/#">F.A.Q.</NavLink></li>
                        <li><a href="https://www.youtube.com/watch?v=Dg_2s2XnOfg" target="_blank" rel="noreferrer">Watch Our Video</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Developers</h4>
                    <ul>
                        <li><NavLink to="/developers">Meet Developers</NavLink></li>
                        <li><NavLink to="/#">Suggestions</NavLink></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>follow us</h4>
                    <div className="social-links">
                        <a href="https://www.facebook.com/pawanjaiswal0843/" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f" target="_blank"></i></a>
                        <a href="https://twitter.com/PawanJaiswal08" target="_blank" rel="noreferrer"><i className="fab fa-twitter" target="_blank" rel="noreferrer"></i></a>
                        <a href="https://www.instagram.com/pawan_jaiswal_08/" target="_blank" rel="noreferrer"><i className="fab fa-instagram" target="_blank"></i></a>
                        <a href="https://www.linkedin.com/in/pawankumar-jaiswal-3a220b193/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in" target="_blank"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
