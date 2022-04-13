import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../../auth';
import { deleteCategory } from '../../Helper/Category/index';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';

const DeleteCategoryDb = () => {

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

            if (id.length !== 24) {
                Swal.fire({
                    title: 'Admin!',
                    icon: 'error',
                    text: 'Invalid Id',
                })
            }

            else {
                const response = await deleteCategory( user._id, token, { id });

                if (response.data.error) {
                    setValues({ ...values, error: response.data.error, success:false })
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
                    <h1 style={{color:"white"}}>Delete Category</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" placeholder="Id of Category" type="text" onChange={handleChange('id')} value={id} />
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
                text: 'Category deleted successfully...',
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

export default DeleteCategoryDb;
