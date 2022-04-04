import React from 'react'
import './ProductAdminCard.css'

const ProductAdminCard = (props) => {

    const { _id, name, description, price, stock, sold, photoUrl, category } = props
    
    return (
        <div className="row1-container">
            <div className="boxProduct">
                <div>
                    <img src={photoUrl} alt="" />
                    <h4>₹{price}</h4>
                    <h6>Stock: {stock} | Sold: {sold}</h6>
                    {
                        category ?  <h6>category: <b>{category.name}</b></h6> : null
                    }
                </div>
                <h4>{name}</h4>
                <div className='id'>id: <b>{_id}</b></div>
                <div className='description'>{description}</div>
                <div style={{display:"flex"}}>
                    <h6>Status: </h6> 
                    <h6 style={{color:"green", paddingLeft:"10px", fontWeight:"600"}}>true</h6>
                </div>
            </div>
        </div>
    )
}

export default ProductAdminCard;
