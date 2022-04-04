import axios from "axios"
const API = process.env.REACT_APP_BACKEND_API

export const addCategory = async (userId, token, category) => {
    
    try {

        const response = await fetch(`${API}/category/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })

        if (response) {
            return response.json()
        }
        
    } catch (error) {
        return console.log(error);
    }
}

export const updateCategory = async (userId, token, categoryId, updatedCategory) => {
    
    try {
        
        let data = JSON.stringify({name:updatedCategory.updatedName});

        const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: data
            
        })

        if (response) {
            return response.json()
        }
        
    } catch (error) {
        return console.log(error);
    }
}

export const deleteCategory = async (userId, token, category) => {

    try {

        const response = await axios.delete(`${API}/category/${category.id}/${userId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },            
        })

        if (response) {
            return response
        }
        
    } catch (error) {
        return console.log(error);
    }

}

export const getAllCategories = async () => {
    
    try {

        const response = await fetch(`${API}/categories`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        if (response) {
            return response.json()
        }

    } catch (error) {
        return console.log(error);
    }
}

export const getCategoryByName = async (name) => {
    try {

        const response = await fetch(`${API}/category/${name}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        if (response) {
            return response.json()
        }

    } catch (error) {
        return console.log(error);
    }
}
