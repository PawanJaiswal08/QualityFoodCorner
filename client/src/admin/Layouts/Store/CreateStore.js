import React, {  useState, useEffect } from 'react'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../../auth';
import { addStoreDatabase } from '../../Helper/Store/index';
import { useNavigate } from 'react-router-dom';

const CreateStore = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        storeId: "",
        address: "",
    });

    const { storeId, address } = values;

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const { user, token } = isAuthenticated();

    const handleChange = name => event => {  
        setValues({ ...values, [name]: event.target.value });
    };

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values });

            const response = await addStoreDatabase(user._id, token, { ...values })

            if (response.status === 201) {
                setSuccess(true)
                setValues({ ...values, storeId:'', address:'' })
                navigate('/')
            }

            if (response.data.error) {
                setError(response.data.error)
                setValues({ ...values, storeId:'', address:'' })
            }

            else{
                setSuccess(false);
            }

                
        } catch (error) {
            console.log("Error in creating store...");
        }
    };

    useEffect(() => {
        
        if (error){
            Swal.fire({
                title: 'Store !',
                icon: 'error',
                text: error,
            })
        }
        
        if (success){
            Swal.fire({
                title: 'Offer !',
                icon: 'success',
                text: 'New Store Added successfully...',
            })
        }
        
        return () => {
            setValues({ storeId:'', address:'' })
        };
    
    }, [error, success])

    const CreateStoreForm = () => {

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
                    <h1 style={{color:"white"}}>Add New Store</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('storeId')} value={storeId} placeholder='Store ID' />
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('address')} value={address} placeholder='Address'/>
                        </div>
                        <br/>
                        <button type='submit' onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            <div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>
                {CreateStoreForm()}
            </div>
        </>
    )
}

export default CreateStore;
