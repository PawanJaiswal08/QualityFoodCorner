import React, { useEffect } from "react";
import './Home.css'
import Navbar from './../../components/Navbar/Navbar'
import Banner from './../../components/Banner/Banner'
import Carousal from './../../components/Carousal/Carousal'
import Footer from  './../../components/Footer/Footer'
import HomepageMenu from './../../components/HomepageMenu/HomepageMenu';
import Loading from './../../components/Loading/Loading';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBanner, setOffers } from "./../../service/actions/actions";

const API = process.env.REACT_APP_BACKEND_API

const Home = () => {

	const dispatch = useDispatch();

	const isBannerLoading = useSelector((state) => state.banner.isLoading)
	const isOffersLoading = useSelector((state) => state.offers.isLoading)

    const getBanner = async () => {

		try {

			const response = await axios.get(`${API}/banner/61efca070a166ac15f35c6f9`, {
				headers: {
					Accept: "application/json",
				},
			})
	
			if (response) {
				dispatch(setBanner(response.data.banner))
			}			
			
		} catch (error) {
			return console.log(error);
		}
	}

    const getAllOffers = async () => {

		try {
	
			const response = await axios.get(`${API}/offers`, {
				headers: {
					Accept: "application/json",
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

		getBanner()
		getAllOffers()

	})

    return (
        <> 
			<Navbar/>
            {
               (isBannerLoading || isOffersLoading)	? 	(<div className='loader'><Loading /></div>) 
                                                    :
                                                        <>
                                                            <Banner/>
                                                            <Carousal />
                                                            <HomepageMenu/>
                                                        </>
            }
			<Footer/>
            
        </>
    )
}

export default Home;
