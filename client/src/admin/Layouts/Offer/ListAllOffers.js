import React, { useEffect }  from 'react'
import OfferAdminCard from '../../components/OfferAdminCard/OfferAdminCard'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import Loading from '../../../components/Loading/Loading'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOffers } from "./../../../service/actions/actions";

const API = process.env.REACT_APP_BACKEND_API

const ListAllOffers = () => {

	const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.offers.isLoading)
    const offers = useSelector((state) => state.offers.offers);
    
    const getAllOffers = async () => {

        try {

            const response = await axios.get(`${API}/offers`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
    
            if (response) {
                dispatch(setOffers(response.data.offers));
            }

        } catch (error) {
            return console.log(error);
        }
    }

    useEffect(() => {

		getAllOffers()

	})

    function showOffers(start, end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<OfferAdminCard {...offers[i]} key={i}/>)
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
                                showOffers(0, offers.length)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ListAllOffers;
