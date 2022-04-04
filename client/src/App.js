import React from 'react'
import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes'

const App = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {UserRoutes}
                    {AdminRoutes}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;

