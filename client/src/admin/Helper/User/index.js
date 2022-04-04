import axios from "axios";

const API = process.env.REACT_APP_BACKEND_API;

export const addUser = async (userId, token, user) => {
    try {
        let body = JSON.stringify(user);
        const response = await axios.post(`${API}/admin/user/${userId}`, body, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response) {
            return response;
        }
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const deleteUser = async (adminId,token,user) => {

    try {
        const response = await axios.delete(`${API}/admin/user/${adminId}/${user}`,{
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        if(response){
            console.log(response);
            return response;
        }
        
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}