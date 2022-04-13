import axios from 'axios';
const API = process.env.REACT_APP_BACKEND_API

export const addStoreDatabase = async (userId, token, store) => {
    
    try {

        console.log(store);

        const response = await axios.post(`${API}/store/${userId}`, store, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        if (response) {
            console.log(response);
            return response
        }
        
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}