import React, { useEffect } from 'react'
import ProductAdminCard from './../../components/ProductAdminCard/ProductAdminCard'
import AdminSideBar from './../../components/AdminSideBar/AdminSideBar'
import Loading from './../../../components/Loading/Loading'
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./../../../service/actions/actions";
const API = process.env.REACT_APP_BACKEND_API

const ListAllProducts = () => {

    const param = useParams()
    const { limit } = param

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.products.isLoading)
    const products = useSelector((state) => {
        return state.products.products.slice(0, limit)
    });

    const getAllProducts = async () => {

        try {

            const response = await axios.get(`${API}/products?limit=${limit}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
    
            if (response.data) {
                dispatch(setProducts(response.data.products));
            }

        } catch (error) {
            return console.log(error);
        }
    }

    useEffect(() => {
		getAllProducts()
	}, [limit])  // eslint-disable-line react-hooks/exhaustive-deps

    function showProducts(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<ProductAdminCard {...products[i]} key={i}/>)
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
                                showProducts(0, products.length)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ListAllProducts
