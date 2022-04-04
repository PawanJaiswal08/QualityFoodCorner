import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { isAuthenticated } from "../../../auth/index"
import { getCategoryByName, updateCategory } from "../../Helper/Category/index";
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';

const UpdateCategoryDb = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        error: "",
        success: false
    });

    const {name, error, success} = values;

    const [updatedCategory, setupdatedCategory] = useState({
        updatedName: "",
        updatedError: "",
        updatedSuccess: false
    });

    const {updatedName, updatedError, updatedSuccess} = updatedCategory;

    const { user, token } = isAuthenticated();

    // category data is stored that admin wants to change
    const [data, setData] = useState(null);

    const handleChange = name => event => {  
        setValues({ ...values, error: false, [name]: event.target.value.toLowerCase() });
    };

    const handleChangeUpdatedValues = name => event => {  
        setupdatedCategory({ ...updatedCategory, updatedError: false, [name]: event.target.value.toLowerCase() });
    };

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values, error: false });

            const category = await getCategoryByName(name);

            setData(category);

            if (category.error) {
                setValues({ ...values, error: category.error, success:false })
            }else{
                setValues({ ...values, error:'', success:true });
            }
                
        } catch (error) {
            console.log("Error in Searching category...");
        }
    };

    const SearchCategoryDatabaseForm = () => {

        var rowStyles = {
            width:"100%", 
            height:"100vh", 
            display:"flex",
            justifyContent:"center",
            margin:"auto",
            marginTop:"50px",
            padding:"10px",
        }
        
        return (
            <div className="row" style={rowStyles}>
                <div className="">
                    <h1 style={{color:"white"}}>Search Category</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('name')} value={name} placeholder="Name of Category"/>
                        </div>
                        <br />
                        <button type="submit" onClick={onSubmit}>Search</button>
                    </form>
                </div>
            </div>
        )
    }

    const updateCategoryOnSubmit = async (event) => {

        try {

            event.preventDefault();

            setupdatedCategory({ ...updatedCategory, updatedError: false });
            
            // console.log(user._id);
            // console.log(token);
            // console.log(data._id);
            // console.log(updatedName);

            const res = await updateCategory(user._id, token, data._id, { ...updatedCategory });

            if (res.error) {
                setupdatedCategory({ ...updatedCategory, updatedError: res.error, updatedSuccess:false })
            }else{
                setupdatedCategory({ ...updatedCategory, updatedName:'', updatedError:'', updatedSuccess:true });
                navigate('/admin/dashboard');
            }
            
        } catch (error) {
            console.log("Error in Updating category...");
        }

    }

    const UpdateCategoryDatabaseForm = () => {

        var rowStyles = {
            width:"100%", 
            height:"100vh", 
            display:"flex",
            justifyContent:"center",
            margin:"auto",
            marginTop:"50px",
            padding:"10px",
        }

        return (
            <div className="row" style={rowStyles}>
                <div>
                    <h1 style={{color:"white"}}>Update Category</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="form-control" type="text" onChange={handleChangeUpdatedValues('updatedName')} value={updatedName} placeholder="Update Name of Category"/>
                        </div>
                        <br />
                        <button type="submit" onClick={updateCategoryOnSubmit}>Update</button>
                    </form>
                </div>
            </div>
        )
    }

    // Error Messages
    useEffect(() => {

        // Error in Searching Category
        if (error){
            Swal.fire({
                title: 'Admin !',
                icon: 'error',
                text: error,
            })
        }

        if (updatedError){
            Swal.fire({
                title: 'Admin !',
                icon: 'error',
                text: updatedError,
            })
        }
    }, [error, updatedError])

    // Success Messages
    useEffect(()=>{
        // Success in Searching Category
        if (success){
            Swal.fire({
                title: 'Admin !',
                icon: 'success',
                text: 'Category Found Admin can update now !',
            })
        }

        // Success in Updating Category Name
        if (updatedSuccess){
            Swal.fire({
                title: 'Admin !',
                icon: 'success',
                text: 'Category Name Updated Successfully !',
            })
        }
    },[success, updatedSuccess ])


    return (
        <>
            <div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>

                <div style={{display:"flex"}}>

                {
                    SearchCategoryDatabaseForm()
                }

                {
                    !success ? 
                                <>
                                </>
                              :  
                                (
                                    <>
                                        <div>
                                            {UpdateCategoryDatabaseForm ()}
                                        </div>
                                    </>
                                )
                }
                </div>
            </div>
        </>
    )
}

export default UpdateCategoryDb;
