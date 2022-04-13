import React, { useState, useEffect } from 'react'
import './AddAddressPage.css'
import addressbg from './../../images/addressbg.jpg'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { isAuthenticated } from '../../auth'
import axios from 'axios'
import Swal from 'sweetalert2'
import { NavLink, useNavigate } from 'react-router-dom'
const API = process.env.REACT_APP_BACKEND_API;

const AddAddressPage = () => {

    const navigate = useNavigate()

    const { user, token } = isAuthenticated();

    var fullName = `${user.name} ${user.lastname}`

    const [ addressValues, setAddressValues] = useState({
        mobile: `${user.address.mobile}`,
        houseNumber: `${user.address.houseNumber}`,
        street: `${user.address.street}`,
        city: `${user.address.city}`
    });

    const { mobile, houseNumber, street,  city } = addressValues;    

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = name => event => {  
        setAddressValues({ ...addressValues, [name]: event.target.value });
    };

    useEffect(() => {

        const getUserUpdatedValues = async () => {

            try {

                const { user, token } = isAuthenticated();

                const response = await axios.get(`${API}/user/${user._id}`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })

                if (response) {

                    var receivedUser = response.data
                    
                    setAddressValues({
                        mobile: `${receivedUser.address.mobile}`,
                        houseNumber: `${receivedUser.address.houseNumber}`,
                        street: `${receivedUser.address.street}`,
                        city: `${receivedUser.address.city}`
                    })
                }
                
            } catch (error) {
                console.log(error);
            }

        }

        getUserUpdatedValues();

    }, [])

    const updateAddress = async (event) => {
		
        try {

            event.preventDefault();

            setAddressValues({ ...addressValues });

            if (user._id === "undefined") {
                return null;
            } 

            else {

                var body = {
                    address:{
                        mobile:addressValues.mobile,
                        city: addressValues.city,
                        street: addressValues.street,
                        houseNumber: addressValues.houseNumber
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
                title: 'Address !',
                icon: 'success',
                text: "Shipping Address Added Successfully",
            })
        }
    
    }, [success, error, errorMsg])

    return (
        <>
            <Navbar/>
            <div className="userinfo" style={{backgroundImage: `url(${addressbg})`}} >
                <div className="userdetails">
                    <h1>Shipping Details</h1>
                </div>
                <form>
                    <input name="name" type="text" className="feedback-input" value={fullName} readOnly />
                    <input name="email" type="text" className="feedback-input" value={user.email} readOnly />
                    <input name="phone-no" type="text" className="feedback-input" value={mobile} onChange={handleChange("mobile")} placeholder="phone-no." />
                    <input name="house-number" type="text" className="feedback-input" value={houseNumber} onChange={handleChange("houseNumber")} placeholder="house-no." />
                    <input name="street" type="text" className="feedback-input" value={street} onChange={handleChange("street")} placeholder="Street" />
                    <input name="city" type="text" className="feedback-input" value={city} onChange={handleChange("city")} placeholder="City" />
                    <button type="submit" onClick={updateAddress}>Add Shipping Details</button>
                </form>
                <div className="userdetails">
                    <NavLink to='/'><h1>Go Home</h1></NavLink>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AddAddressPage;
