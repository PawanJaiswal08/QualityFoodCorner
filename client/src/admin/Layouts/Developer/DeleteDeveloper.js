import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../../auth';
import { deleteDeveloper } from '../../Helper/Developer/index';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';

const DeleteDeveloper = () => {

    const [values, setValues] = useState({
        id: "",
        error: "",
        success: false
    });

    const { id, error, success } = values;

    // console.log(id);

    const { user, token } = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    };

    const onSubmit = async(event) => {

        try {

            event.preventDefault();

            setValues({...values, error: false });

            const data = await deleteDeveloper(user._id, token, id);

            if (data.error) {
                setValues({...values, error: data.error, success: false })
            } else {
                setValues({...values, name: '', error: '', success: true });
            }


        } catch (error) {
            console.log("Error in deleting team member...");
        }
    };

    const AddCategoryDatabaseForm = () => {

        var rowStyles = {
            width: "70%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            marginTop: "0px",
            padding: "100px",
        }

        return (
            <div className="row" style={rowStyles}>
                <div>
                    <h1 style={{color:"white", textAlign: "center"}}>Delete developer</h1>
                    <br />  
                    <form className='py-5'>
                        <div className="form-group">
                            <input className="feedback-input" placeholder="Id of Developer" type="text" onChange={handleChange('id')} value={id} />
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
        if (error) {
            Swal.fire({
                title: 'Admin !',
                icon: 'error',
                text: error,
            })
        }
        if (success) {
            Swal.fire({
                title: 'Admin !',
                icon: 'success',
                text: 'Deleted developer successfully...',
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

export default DeleteDeveloper;