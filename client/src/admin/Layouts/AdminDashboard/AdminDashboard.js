import React from 'react'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import admin from './../../../images/admin.svg'

const AdminDashboard = () => {

    var adminImageDivStyles = {
        height:"100vh", 
        width:"100%", 
        backgroundSize:"cover", 
        backgroundColor:"rgb(232,248,255)", 
        zIndex:"-1"
    }

    var adminImageStyles = {
        position: "relative", 
        width: "100%", 
        height: "100%"
    }

    return (
        <>
            <div style={{display:"flex"}}>
                <AdminSideBar/>
                <div style={adminImageDivStyles}>
                    <img src={admin} alt="" style={adminImageStyles}/>
                </div>
                
            </div>
        </>
    )
}

export default AdminDashboard;


