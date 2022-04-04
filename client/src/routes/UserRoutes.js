import React from 'react'
import { Route } from 'react-router-dom';

import UserRouteProtect from './UserRouteProtect';
import Home from '../layouts/HomePage/Home';
import SignUp from '../layouts/SignUpPage/SignUp';
import Signin from '../layouts/SignInPage/Signin';
import DevelopersPage from '../layouts/DevelopersPage/DevelopersPage';
import Menu from '../layouts/MenuPage/Menu';
import SearchPage from '../layouts/SearchPage/SearchPage';
import MyCart from '../layouts/MyCartPage/MyCart';
import Error404 from '../components/Error404/Error404';
import DisplayProductOnSearch from '../layouts/SearchPage/DisplayProductOnSearch';
import StoresOnMap from './../layouts/StoresOnMap/StoresOnMap';
import AddAddressPage from '../layouts/AddAddressPage/AddAddressPage';
import ProfilePage from './../layouts/ProfilePage/ProfilePage'

const UserRoutes = [

    // Home
    <Route exact path='/' element={<Home />} key="home" />,

    // SignUp
    <Route exact path='/signup' element={<SignUp />} key="signup" />,

    // SignIn
    <Route exact path='/signin' element={<Signin />} key="signin" />,

    // Developers
    <Route exact path='/developers' element={<DevelopersPage />} key="developers" />,

    // Stores
    <Route exact path='/stores' element={<StoresOnMap />} key="StoresOnMap" />,

    // Menu
    <Route exact path="/menu/:category" element={<Menu />} key="menu" />,

    // Search Product
    <Route exact path="/menu/search" element={<SearchPage />} key="search" />,

    // Display Product
    <Route exact path="/product/:productName" element={<DisplayProductOnSearch />} key="search" />,

    // MyCart
    <Route exact path='/mycart' element={ <UserRouteProtect><MyCart /></UserRouteProtect> } key="mycart" />,

    // Add Shipping Address
    <Route exact path='/add/address' element={ <AddAddressPage /> } key="addaddress" />,

    // ProfilePage
    <Route exact path='/profile' element={<ProfilePage />} key="UserProfile" />,

    // Error 404
    <Route exact path='*' element={<Error404 />} key="error404" />,
];

export default UserRoutes;