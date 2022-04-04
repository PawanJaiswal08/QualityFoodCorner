const API = process.env.REACT_APP_BACKEND_API

export const signup = async (user) => {

    try {

        const response = await fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        if (response) {
            return response.json()
        }
        
    } catch (error) {
        return console.log(error);
    }
}

export const signin = async (user) => {

    try {

        const response = await fetch(`${API}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        if (response) {
            return response.json()
        }
        
    } catch (error) {
        return console.log(error);
    }
}

export const authenticate = (data,next) =>  {

    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}


export const signout = async (next) => {

    try {

        if (typeof window !== 'undefined') {
            localStorage.removeItem('jwt');
            next();

            const response = await fetch(`${API}/signout`, {
                method:"GET"
            });

            if (response) {
                return response.json();
            }
        }

    } catch (error) {
        return console.log(error);
    }
}

export const isAuthenticated = () => {

    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        // It return user and token
        return JSON.parse(localStorage.getItem('jwt'));
    }else{
        return false;
    }
}
