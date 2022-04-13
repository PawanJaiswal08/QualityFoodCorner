import React, { useEffect } from 'react'
import StoreAdminCard from '../../components/StoreAdminCard/StoreAdminCard'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import Loading from '../../../components/Loading/Loading'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setStores } from "./../../../service/actions/actions";
const API = process.env.REACT_APP_BACKEND_API

const ListAllStore = () => {

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.stores.isLoading)
    const stores = useSelector((state) => state.stores.stores);

    const getAllStores = async () => {

        try {

            const response = await axios.get(`${API}/stores`, {
                headers: {
                    Accept: "application/json",
					"Content-Type": "application/json",
                },
            })

            if (response.data) {
                dispatch(setStores(response.data.stores));
            }

        } catch (error) {
            return console.log(error);
        }
    }

    useEffect(() => {

		getAllStores()

	})

    function showStores(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<StoreAdminCard {...stores[i]} key={i}/>)
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
                                showStores(0, stores.length)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ListAllStore;
