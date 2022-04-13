import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../../auth';
import { addCategory } from '../../Helper/Category/index';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';

const AddCategoryDb = () => {

    const [values, setValues] = useState({
        name: "",
        error: "",
        success: false
    });

    const {name, error, success} = values;

    const { user, token } = isAuthenticated();

    const handleChange = name => event => {  
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values, error: false });

            if (name === '') {
                Swal.fire({
                    title: 'Admin!',
                    icon: 'error',
                    text: 'Name of Category is required',
                })
            }

            else {
                const data = await addCategory( user._id, token, { name });

                if (data.error) {
                    setValues({ ...values, error: data.error, success:false })
                }else{
                    setValues({ ...values, name:'', error:'', success:true });
                }
            }
                
        } catch (error) {
            console.log("Error in creating category...");
        }
    };

    const AddCategoryDatabaseForm = () => {

        var rowStyles = {
            width:"70%", 
            height:"100vh", 
            display:"flex",
            justifyContent:"center",
            margin:"auto",
            marginTop:"100px",
            padding:"100px",
        }
        
        return (
            <div className="row" style={rowStyles}>
                <div>
                    <h1 style={{color:"white"}}>Create Category</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" placeholder="Name of Category" type="text" onChange={handleChange('name')} value={name} />
                        </div>
                        <br />
                        <button type="submit" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    // Error and Success Messages
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
                text: 'New Category created successfully...',
            })
        }
    }, [error, success])

    return (
        <>
            <div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>
                {AddCategoryDatabaseForm()}
            </div>
        </>        
    )
}

export default AddCategoryDb;
