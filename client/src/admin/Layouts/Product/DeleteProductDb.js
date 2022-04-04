import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from '../../../auth';
import { deleteProduct } from '../../Helper/Product/index';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';

const DeleteProductDb = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        id: "",
        error: "",
        success: false
    });

    const { id, error, success } = values;

    // console.log(id);

    const { user, token } = isAuthenticated();

    const handleChange = name => event => {  
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values, error: false });

            const response = await deleteProduct( user._id, token, id);

            if (response.data.error) {
                setValues({ ...values, error: response.data.error, success:false })
            }else{
                setValues({ ...values, name:'', error:'', success:true });
                navigate('/admin/dashboard');
            }

                
        } catch (error) {
            console.log("Error in deleting product...");
        }
    };

    const DeleteProductDatabaseForm = () => {

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
                    <h1 style={{color:"white"}}>Delete Product</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" placeholder="Id of Product" type="text" onChange={handleChange('id')} value={id} />
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
                text: 'Product deleted successfully...',
            })
        }
    }, [error, success])

    return (
        <>
            <div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>
                {DeleteProductDatabaseForm()}
            </div>
        </>        
    )
}

export default DeleteProductDb;
