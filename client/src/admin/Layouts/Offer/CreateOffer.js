import React, {  useState, useEffect } from 'react'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../../auth';
import { addOfferDatabase } from '../../Helper/Offer';
import { useNavigate } from 'react-router-dom';

const CreateOffer = () => {

    let offerImage;

    const navigate = useNavigate()

    const [values, setValues] = useState({
        name: "",
        feature1: "",
        feature2: "",
        feature3: "",
        isActive: false
    });

    const { name, feature1, feature2, feature3, isActive } = values;

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const { user, token } = isAuthenticated();

    const handleChange = name => event => {  
        setValues({ ...values, [name]: event.target.value });
    };

    const handleNewImage = name => event => {
        // console.log(event.target.files[0]);
        setValues({ ...values, [name]: event.target.files[0] });
    }

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values });

            const response = await addOfferDatabase(user._id, token, { ...values })

            if (response.status === 201) {
                setSuccess(true)
                setValues({ ...values, name:'', feature1:'', feature2:'', feature3:'', isActive:false })
                navigate('/')
            }

            if (response.data.error) {
                setError(response.data.error)
            }

            else{
                setSuccess(false);
            }

                
        } catch (error) {
            console.log("Error in creating offer...");
        }
    };

    useEffect(() => {
        
        if (error){
            Swal.fire({
                title: 'Offer !',
                icon: 'error',
                text: error,
            })
        }
        
        if (success){
            Swal.fire({
                title: 'Offer !',
                icon: 'success',
                text: 'New Offer Created successfully...',
            })
        }
        
        return () => {
            setValues({ name:'', feature1:'', feature2:'', feature3:'', isActive:false })
        };
    
    }, [error, success])

    const CreateOfferForm = () => {

        var rowStyles = {
            width:"70%", 
            height:"100vh", 
            display:"flex",
            justifyContent:"center",
            margin:"auto",
            marginTop:"10px",
            padding:"100px",
        }

        var selectOptionStyles = {
            margin: "40px",
            background: "rgba(0, 0, 0, 0.3)",
            color: "black",
            textShadow: "0 1px 0 rgba(0, 0, 0, 0.4)"
        }
        
        return (
            <div className="row" style={rowStyles}>
                <div>
                    <h1 style={{color:"white"}}>Create New Offer</h1>
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('name')} value={name} placeholder='Name of Offer'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('feature1')} value={feature1} placeholder='Feature 1'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('feature2')} value={feature2} placeholder='Feature 2'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('feature3')} value={feature3} placeholder='Feature 3'/>
                        </div>
                        <div className="form-group">
                            <input type="file" className="form-control-file feedback-input" onChange={handleNewImage('offerImage')} value={offerImage} placeholder='Offer Image' />
                        </div>
                        
                        <div className="form-group">
                            <select  className="feedback-input" id="cars" name="isActive" onChange={handleChange('isActive')} value={isActive} placeholder='isActive'>
                                <option value={false} style={selectOptionStyles}>False</option>
                                <option value={true} style={selectOptionStyles}>True</option>
                            </select>
                        </div>
                        <br/>
                        <button type="submit" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            <div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>
                {CreateOfferForm()}
            </div>
        </>
    )
}

export default CreateOffer;
