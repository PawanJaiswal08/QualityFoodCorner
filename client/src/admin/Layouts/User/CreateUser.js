import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./../../../auth/index"
import { addUser } from "./../../Helper/User/index";
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';

const CreateUser = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        error:"",
        success: false
    });
    // photo,
    const {name, lastname, email, password,error, success} = values;

    const { user, token } = isAuthenticated(); 

    const handleChange = name => event => {  
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values, error: false });

            const response = await addUser( user._id, token, ({name,lastname,email,password}));

            if (response.data.error) {
                setValues({ ...values, error: response.data.error, success:false })
            }else{
                setValues({ ...values, name:'', lastname:'', email:'',password:'', success:true });
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.log(error.message);
            console.log("Error in adding user to database ...");
        }
    };

    useEffect(() => {
        if (error){
            Swal.fire({
                title: 'Admin !',
                icon: 'error',
                text: error,
            })
        }
        if (success){
            Swal.fire({
                title: 'Admin !',
                icon: 'success',
                text: 'New User created successfully...',
            })
        }
    }, [error, success])

    const AddUserForm = () => {

        var rowStyles = {
            width:"70%", 
            height:"100%", 
            display:"flex",
            justifyContent:"center",
            margin:"auto",
            marginTop:"10px",
            padding:"100px",
        }

        return (
            <div className="row" style={rowStyles}>
                <div>
                    <h1 style={{color:"white"}}>Create User</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('name')} value={name} placeholder='Name of User' />
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('lastname')} value={lastname} placeholder='lastname'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('email')} value={email} placeholder='email' />
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="password" onChange={handleChange('password')} value={password} placeholder='Password'/>
                        </div>
                        <button type="submit" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            <div style={{ display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>
                {AddUserForm()}
            </div>
        </>
    )
}

export default CreateUser;