import React, { useEffect } from 'react'
import DeveloperAdminCard from '../../components/DeveloperAdminCard/DeveloperAdminCard'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import Loading from '../../../components/Loading/Loading'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDevelopers } from "./../../../service/actions/actions";
const API = process.env.REACT_APP_BACKEND_API

const ListAllDeveloper = () => {

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.developers.isLoading)
    const developers = useSelector((state) => state.developers.developers);

    const getAllDeveloper = async () => {

        try {

            const response = await axios.get(`${API}/developers`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
    
            if (response.data) {
                dispatch(setDevelopers(response.data.developers));
            }

        } catch (error) {
            return console.log(error);
        }
    }

    useEffect(() => {

		getAllDeveloper()

	})

    function showDevelopers(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<DeveloperAdminCard {...developers[i]} key={i}/>)
        }
        
        return elements;
    }

    return (
        <>
            <div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>
                <div className="bada">
                    <section>
                        <div className="container">
                            {
                                isLoading ? <Loading/> : 
                                showDevelopers(0, developers.length)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ListAllDeveloper;
