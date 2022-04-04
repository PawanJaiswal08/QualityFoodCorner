import React from 'react'
import './StoreAdminCard.css'

const StoreAdminCard = (props) => {

    const { _id, location, storeId } = props

    return (
        <>
            <div className="row1-container">
                <div className="boxStore">
                    <div>
                        <h4>StoreId: {storeId}</h4>
                        <div className='id'>id: <b>{_id}</b></div>
                        <h6>Address: <b style={{fontWeight:"500"}}>{location.formattedAddress}</b></h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreAdminCard;
