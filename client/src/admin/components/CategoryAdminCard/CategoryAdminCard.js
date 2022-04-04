import React from 'react'
import './CategoryAdminCard.css'

const CategoryAdminCard = (props) => {

    const { name, _id } = props

    return (
        <div className="row1-container">
            <div className="box">
                <h2>{name}</h2>
                <div className='id'>id: <b>{_id}</b></div>
                <div style={{display:"flex"}}>
                    <h6>Status: </h6> 
                    <h6 style={{color:"green", paddingLeft:"10px", fontWeight:"600"}}>true</h6>
                </div>

            </div>
        </div>
    )
}

export default CategoryAdminCard;
