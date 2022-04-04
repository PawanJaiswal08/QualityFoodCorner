import React, { useEffect } from 'react'
import CategoryCard from './../../components/CategoryAdminCard/CategoryAdminCard'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import Loading from './../../../components/Loading/Loading'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "./../../../service/actions/actions";
const API = process.env.REACT_APP_BACKEND_API

const ListAllCategories = () => {

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.categories.isLoading)
    const categories = useSelector((state) => state.categories.categories);

    const getAllCategories = async () => {

        try {

            const response = await axios.get(`${API}/categories`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
    
            if (response.data) {
                dispatch(setCategories(response.data.categories));
            }

        } catch (error) {
            return console.log(error);
        }
    }

    useEffect(() => {

		getAllCategories()

	})

    function showCategories(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<CategoryCard {...categories[i]} key={i}/>)
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
                                showCategories(0, categories.length)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ListAllCategories
