import React from 'react'
import './Error404.css'

const Error404 = () => {
    return (
        <div className='Error404body'>
            <h1 className="Error404">404</h1>
            <div className="cloak__wrapper">
                <div className="cloak__container">
                    <div className="cloak"></div>
                </div>
            </div>
            <div className="info">
                <h2>We can't find that page</h2>
                <a href="/" target="_blank" rel="noreferrer noopener" style={{color:"white"}}>Home</a>
            </div>
        </div>
    )
}

export default Error404;
