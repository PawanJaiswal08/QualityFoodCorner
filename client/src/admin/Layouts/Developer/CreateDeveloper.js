import React, {  useState, useEffect } from 'react'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../../auth';
import { addDeveloperDatabase } from '../../Helper/Developer/index';
import { useNavigate } from 'react-router-dom';

const CreateDeveloper = () => {

    let developerImage;

    const navigate = useNavigate()

    const [values, setValues] = useState({
        name: "",
        email: "",
        facebook: "",
        instagram: "",
        linkedin: "",
    });

    const { name, email, facebook, instagram, linkedin } = values;

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const { user, token } = isAuthenticated();

    const handleChange = name => event => {  
        setValues({ ...values, [name]: event.target.value });
    };

    const handleNewImage = name => event => {
        console.log(event.target.files[0]);
        setValues({ ...values, [name]: event.target.files[0] });
    }

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values });

            const response = await addDeveloperDatabase(user._id, token, { ...values })

            if (response.status === 201) {
                setSuccess(true)
                setValues({ ...values, name:'', email:'', facebook:'', instagram:'', linkedin:'' })
                navigate('/')
            }

            if (response.data.error) {
                setError(response.data.error)
            }

            else{
                setSuccess(false);
            }

                
        } catch (error) {
            console.log("Error in adding developer...");
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
                text: 'New Team Member Added successfully...',
            })
        }

        return () => {
            setValues({ name:'', email:'', facebook:'', instagram:'', linkedin:'' })
        };
    }, [error, success])

    const CreateDeveloperForm = () => {

        var rowStyles = {
            width:"70%", 
            height:"100vh", 
            display:"flex",
            justifyContent:"center",
            margin:"auto",
            marginTop:"0px",
            marginBottom:"50px",
            padding:"100px",
        }

        return (
            <div className="row" style={rowStyles}>
                <div>
                    <h1 style={{color:"white", textAlign:"center"}}>Add New Member</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('name')} value={name} placeholder='Name of Developer' />
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('email')} value={email} placeholder='Email'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('facebook')} value={facebook} placeholder='Facebook Handle'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('instagram')} value={instagram} placeholder='Instagram Handle'/>
                        </div>
                        <div className="form-group">
                            <input className="feedback-input" type="text" onChange={handleChange('linkedin')} value={linkedin} placeholder='Linkedin Handle'/>
                        </div>
                        <div className="form-group">
                            <input type="file" className="form-control-file feedback-input" onChange={handleNewImage('developerImage')} value={developerImage} placeholder='Developer Image' />
                        </div>
                        <br/>
                        <button type="submit" onClick={onSubmit} >Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            <div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>
                {CreateDeveloperForm()}
            </div>
        </>
    )
}

export default CreateDeveloper
