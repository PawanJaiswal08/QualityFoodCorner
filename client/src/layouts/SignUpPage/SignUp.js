import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "../../auth/index";
import './Signup.css'
import back from './../../images/background1.jpg'

const SignUp = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const {name, lastname, email, password, error, success} = values;

    const handleChange = name => event => {  
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values, error: false });

            const data = await signup({name, lastname, email, password });

            if (data.error) {
                setValues({ ...values, error: data.error, success:false })
            }else{
                setValues({ ...values, name:'', lastname:'', email:'', password:'', error:'', success:true });
                navigate('/signin')
            }

                
        } catch (error) {
            console.log("Error in signup");
        }
    };

    useEffect(() => {
        
        if (error){
            Swal.fire({
                title: 'Admin!',
                icon: 'error',
                text: error,
            })
        }
        
        if (success){
            Swal.fire({
                title: 'Admin!',
                icon: 'success',
                text: 'Account creation succcessful !',
            })
        }
    
    }, [error, success])

    const signUpForm = () => {
        return(
            <div className="Outerlogin " style={{ backgroundImage: "url(" + back + ")" }}>
                <div className="signup-page">
                    <div className="form">
                    <div className="signup">
                        <div className="signup-header">
                        <h3 style={{ fontWeight: "bold" }}>SignUp</h3>
                        </div>
                    </div>
                    <form className="signup-form">
                        <input type="text" onChange={handleChange('name')} value={name} placeholder="Firstname" />
                        <input type="text" onChange={handleChange('lastname')} value={lastname} placeholder="Lastname" />
                        <input type="email" onChange={handleChange('email')}  value={email} placeholder="p@gmail.com" />
                        <input type="password" onChange={handleChange('password')} value={password} placeholder="Password" />
                        <button onClick={onSubmit}>Sign Up</button>
                        <p className="message">
                            Already have an account? <NavLink to="/signin">Login</NavLink>
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

    return (
        <>
            {signUpForm()}
        </>
    )
}

export default SignUp;
