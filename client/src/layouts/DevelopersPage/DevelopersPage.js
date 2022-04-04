import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import DeveloperCard from './../../components/DeveloperCard/DeveloperCard'
import Loading from '../../components/Loading/Loading'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDevelopers } from "./../../service/actions/actions";
const API = process.env.REACT_APP_BACKEND_API

const Developers = () => {

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.developers.isLoading)
    const developers = useSelector((state) => state.developers.developers);

	useEffect(() => {

		const getAllDevelopers = async () => {

			try {

                const response = await axios.get(`${API}/developers`, {
                    headers: {
                        Accept: "application/json",
                    },
                })
        
                if (response.data) {
                    dispatch(setDevelopers(response.data.developers));
                }

			} catch (error) {
				return console.log(error);
			}
		}

		getAllDevelopers()

	})

    function showDevelopers(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<DeveloperCard {...developers[i]} key={i}/>)
        }
        
        return elements;
    }

    return (
        <>
            <Navbar/>

            <div className="bada">

                {
                    isLoading   ?   <Loading/>
                                :   <section>
                                        <div className="container">
                                            {
                                                showDevelopers(0, developers.length)
                                            }
                                        </div>
                                        {/* <div className="container">
                                            {
                                                showDevelopers(developers.length/2,developers.length)
                                            }
                                        </div> */}
                                    </section>
                }
                
            </div>

            
        </>
        
    )
}

export default Developers;
