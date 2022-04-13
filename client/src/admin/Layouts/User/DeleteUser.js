import React,{useState,useEffect} from "react";
import { isAuthenticated } from "../../../auth";
import { deleteUser } from "../../Helper/User";
import Swal from "sweetalert2";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";

const DeleteUser = () =>{

    const [values, setValues] = useState({
        id: "",
        error:"",
        success:"",
    })

    const {id,error,success} = values;

    const {user, token }= isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]: event.target.value});
    }

    const onSubmit = async(event) =>{

        try {
            event.preventDefault();
            setValues({...values, error:false});

            const response = await deleteUser(user._id, token, id)

            if (response.data.error) {
                setValues({ ...values, error: response.data.error, success:false })
            }
            else{
                setValues({ ...values, name:'', error:'', success:true });
            }
            
        } catch (error) {
            console.log("Error in Deleting the User");
        }
    }

    const DeleteUserDataBaseForm = () =>{

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
                    <h1 style={{color:"white"}}>Delete User</h1>
                    <br />
                    <form>
                        <div className="form-group">
                            <input className="feedback-input" placeholder="Id of User" type="text" onChange={handleChange('id')} value={id} />
                        </div>
                        <br />
                        <button type="submit" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    useEffect(()=>{
        if (error){
            Swal.fire({
                title:'Admin !',
                icon: 'error',
                text: error,
            })
        }
        if (success){
            Swal.fire({
                title:'Admin !',
                icon:'success',
                text:'User Successfully deleted ...'
            })
        }
    },[error, success])

    return (
		<>
			<div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>
                {DeleteUserDataBaseForm()}
            </div>
		</>
	);

}

export default DeleteUser;