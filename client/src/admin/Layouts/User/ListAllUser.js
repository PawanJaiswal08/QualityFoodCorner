import React, { useState,useEffect } from "react";
import UserAdminCard from "../../components/UserAdminCard/UserAdminCard";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import axios from "axios";
import { isAuthenticated } from "./../../../auth/index";

const API = process.env.REACT_APP_BACKEND_API;

const ListAllUser = () =>{

    const [users, setUsers] = useState([]);

    useEffect(()=>{

        const getAllUser = async() =>{
            
            try {
                
                const {user,token} = isAuthenticated();

                const response = await axios.get(`${API}/admin/users/${user._id}`,{
                    headers:{
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                
                if (response){
                    setUsers(response.data.users);
                }
                else{
                    console.log("No Data");
                }
            } catch (error) {
                console.log(error);
            }
        }

        getAllUser();
    },[])



    return(
        
        <div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
            <AdminSideBar/>
            <div className="bada">
                {users && users.map((user, index) =>{
                    return(<UserAdminCard {...user} key={index} />)
                })}
            </div>
        </div>
        
    )
}

export default ListAllUser;