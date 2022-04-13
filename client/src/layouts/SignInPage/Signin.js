import React, { useState, useEffect } from "react";
import { Navigate, NavLink } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from "../../auth/index.js"
import './Signin.css' 
import back from "../../../src/images/background1.jpg";
import Swal from 'sweetalert2'


const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        didRedirect: false
    });

    const { email, password, error,  didRedirect } = values;

    // To Fire SweetAlert on Successful User Authentication
    const { user } = isAuthenticated();

    const handleChange = name => event => {  
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values, error: false });

            if (email === '') {
                Swal.fire({
                    title: 'User!',
                    icon: 'error',
                    text: 'Email is required',
                })
            }

            else if (password === '') {
                Swal.fire({
                    title: 'User!',
                    icon: 'error',
                    text: 'Password is required',
                })
            }

            else {

                const data = await signin({ email, password });

                if (data.error) {
                    setValues({ ...values, error: data.error})
                }else{
                    // JWT sets in local storage
                    authenticate(data, () => {
                        setValues({ ...values, email:'', password:'', didRedirect: true });
                    })
                }
            }

        } catch (error) {
            console.log("Signin Failed");
        }
    }

    const performRedirect  = () => {
        if (didRedirect) {
            
            if (user && user.role === 1 ) {
                return (
                    <Navigate to="/" />
                )
            }else{
                return (
                    <Navigate to="/" />
                )
            }
        }

        if (isAuthenticated()) {
            return <Navigate to="/" />
        }
    }

    useEffect(() => {
        if (error){
            Swal.fire({
                title: 'Admin!',
                icon: 'error',
                text: error,
            })
        }
        if (user && user.role === 1){
            Swal.fire({
                title: 'Admin!',
                icon: 'success',
                text: 'Welcome Back Admin Sign in successfull',
            })
        }
        if (user && user.role === 0){
            Swal.fire({
                title: 'User!',
                icon: 'success',
                text: 'Welcome Back Sign in successfull',
            })
        }
    }, [error, didRedirect, user])

    const signInForm = () => {
        return(
            <div className="Outerlogin " style={{ backgroundImage: "url(" + back + ")" }}>
                <div className="login-page">
                    <div className="form">
                    <div className="login">
                        <div className="login-header">
                        <h3 style={{ fontWeight: "bold" }}>LOGIN</h3>
                        <p>Please enter your credentials to login.</p>
                        </div>
                    </div>
                    <form className="login-form">
                        <label htmlFor="email">Username</label>
                        <input type="email" value={email} onChange={handleChange("email")} placeholder="p@gmail.com" id="email" required={true}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={handleChange("password")} placeholder="********" id="password" required={true}/>
                        <button onClick={onSubmit} >Login</button>
                        <p className="message">
                            Not registered? <NavLink to="/signup">Create an account</NavLink>
                        </p>
                        <p className="backhome" style={{color:"black"}}>
                            <NavLink to='/'>Back to home</NavLink>
                        </p>
                    </form>
                    </div>
                </div>
            </div>            
        )
    };

    return(
        <>
            {signInForm()}
            {performRedirect()}
        </>
    )
}

export default Signin;