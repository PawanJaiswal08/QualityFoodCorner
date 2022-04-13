import axios from 'axios';
const API = process.env.REACT_APP_BACKEND_API

export const addOfferDatabase = async (userId, token, offer) => {
    try {

        let formData = new FormData();

        formData.append('name', offer.name)
        formData.append('feature1', offer.feature1)
        formData.append('feature2', offer.feature2)
        formData.append('feature3', offer.feature3)
        formData.append('offerImage', offer.offerImage)
        formData.append('isActive', offer.isActive)

        const response = await axios.post(`${API}/offer/${userId}`, formData, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        if (response) {
            return response
        }
        
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}

export const updatesOffer = async (userId, token, offer) => {
    try {

        const { id, name, feature1, feature2, feature3, offerImage, isActive } = offer

        var body = {
            name: name,
            feature1: feature1,
            feature2: feature2,
            feature3: feature3,
            offerImage: offerImage,
            isActive: isActive,
        }

        Object.keys(body).forEach(key => {
            if (body[key] === '') {
              delete body[key];
            }
        });

        JSON.stringify(body)

        const response = await axios.put(`${API}/offer/${id}/${userId}`, body, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        if (response) {
            // console.log(response);
            return response
        }
        
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}


export const deleteOffer = async(userId, token, offer) => {

    try {

        const response = await fetch(`${API}/offer/${offer.id}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        if (response) {
            return response.json()
        }
    }
    
    catch (error) {
        return console.log(error);
    }

}