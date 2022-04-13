import React from 'react'
import './OfferAdminCard.css'

const OfferAdminCard = (props) => {

    const { _id, name, feature, isActive, offerImage } = props
    
    return (
        <>
            <div className="row1-container">
                <div className="boxOffer">
                    <div>
                        <img src={offerImage} alt="" />
                        <h4>{name}</h4>
                        <div className='id'>id: <b>{_id}</b></div>
                        <h6>Features: </h6>
                        <h6>1.{feature[0]}</h6>
                        <h6>2.{feature[1]}</h6>
                        <br />
                        {
                            isActive    ?   <div style={{display:"flex"}}>
                                                <h6>Status: </h6> 
                                                <h6 style={{color:"green", paddingLeft:"10px", fontWeight:"600"}}>{isActive.toString()}</h6>
                                            </div>
                                        :   <div style={{display:"flex"}}>
                                                <h6>Status: </h6> 
                                                <h6 style={{color:"red", paddingLeft:"10px", fontWeight:"600"}}>{isActive.toString()}</h6>
                                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OfferAdminCard;
