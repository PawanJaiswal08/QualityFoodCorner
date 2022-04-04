import React from 'react'
import './DeveloperAdminCard.css'

const DeveloperAdminCard = (props) => {

    const { _id, name, email, facebook, instagram, linkedin, imgUrl } = props

    return (
        <div className="row1-container">
            <div className="boxDeveloper">
                <div className='devImgBox'>
                    <img src={imgUrl} alt="" width="220px" height="220px" />
                </div>
                <h4>{name}</h4>
                <p>(id:{_id})</p>
                <div className='email'>{email}</div>
                <div className='socials'>
                    <article><a href={facebook}>{facebook}</a></article>
                    <article><a href={instagram}>{instagram}</a></article>
                    <article><a href={linkedin}>{linkedin}</a></article>
                </div>
                <div style={{display:"flex"}}>
                    <h6>Status: </h6> 
                    <h6 style={{color:"green", paddingLeft:"10px", fontWeight:"600"}}>true</h6>
                </div>
            </div>
        </div>
    )
}

export default DeveloperAdminCard;
