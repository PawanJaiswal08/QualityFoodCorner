import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./../../../auth/index"
import { addProduct } from "./../../Helper/Product/index";
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';


const AddProductDb = () => {

    let photo;

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        photoUrl: "",
        error: "",
        success: false
    });

    const {name, description, price, category, stock, photoUrl, error, success} = values;

    const { user, token } = isAuthenticated();

    const handleChange = name => event => {  
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleNewImage = name => event => {
        console.log(event.target.files[0]);
        setValues({ ...values, error: false, [name]: event.target.files[0] });
    }

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values, error: false });

            const response = await addProduct( user._id, token, { ...values });

            console.log(response);

            if (response.data.error) {
                setValues({ ...values, error: response.data.error, success:false })
            }else{
                setValues({ ...values, name:'', description:'', price:'', category:'', stock:'', photoUrl:'', error:'', success:true });
                navigate('/admin/dashboard');
            }

                
        } catch (error) {
            console.log("Error in adding product to database ...");
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
                text: 'New Product created successfully...',
            })
        }
    }, [error, success])

    const AddProductDatabaseForm = () => {

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
                    <h1 style={{color:"white"}}>Create Product</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('name')} value={name} placeholder='Name of Product' />
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('description')} value={description} placeholder='Description'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('price')} value={price} placeholder='Price' />
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('category')} value={category} placeholder='Category'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('stock')} value={stock} placeholder='Stock'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('photoUrl')} value={photoUrl} placeholder='Image URL'/>
                        </div>
                        <div className="form-group">
                            <input type="file" className="form-control-file feedback-input" id="myfile" onChange={handleNewImage('photo')} value={photo} placeholder='Select Product Image'/>
                        </div>
                        <br />
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
                {AddProductDatabaseForm()}
            </div>
        </>
    )
}

export default AddProductDb;