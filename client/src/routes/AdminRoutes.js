import React from 'react'
import { Route } from 'react-router-dom';
import AdminRouteProtect from './AdminRouteProtect';
import AdminDashboard from './../admin/Layouts/AdminDashboard/AdminDashboard';
import AddCategoryDb from '../admin/Layouts/Category/AddCategoryDb';
import UpdateCategoryDb from '../admin/Layouts/Category/UpdateCategoryDb';
import AddProductDb from '../admin/Layouts/Product/AddProductDb'; 
import CreateOffer from '../admin/Layouts/Offer/CreateOffer';
import UpdateOffer from '../admin/Layouts/Offer/UpdateOffer';
import DeleteOffer from '../admin/Layouts/Offer/DeleteOffer';
import CreateDeveloper from '../admin/Layouts/Developer/CreateDeveloper';
import DeleteDeveloper from '../admin/Layouts/Developer/DeleteDeveloper';
import CreateStore from '../admin/Layouts/Store/CreateStore';
import ListAllCategories from '../admin/Layouts/Category/ListAllCategories';
import ListAllProducts from '../admin/Layouts/Product/ListAllProducts';
import ListAllStore from '../admin/Layouts/Store/ListAllStore';
import ListAllOffers from '../admin/Layouts/Offer/ListAllOffers';
import ListAllDeveloper from '../admin/Layouts/Developer/ListAllDeveloper';
import CsvLayout from './../admin/Layouts/Product/UpdateProductsCsv';
import CsvProducts from './../admin/Layouts/Product/ListProductsCSV';
import CreateUser from './../admin/Layouts/User/CreateUser';
import DeleteCategoryDb from '../admin/Layouts/Category/DeleteCategoryDb';
import ListAllUser from '../admin/Layouts/User/ListAllUser';
import DeleteUser from '../admin/Layouts/User/DeleteUser'
import UpdateProductDb from '../admin/Layouts/Product/UpdateProductDb'; 
import DeleteProductDb from '../admin/Layouts/Product/DeleteProductDb'; 

const AdminRoutes = [

    // Admin DashBoard
    <Route exact path='/admin/dashboard' element={ <AdminRouteProtect><AdminDashboard /></AdminRouteProtect> } key="admin-dashboard" />,

    // Admin - Offer (Get All)
    <Route exact path='/admin/all/offer' element={ <AdminRouteProtect><ListAllOffers /></AdminRouteProtect> } key="admin-all-offer" />,

    // Admin - Add Offer
    <Route exact path='/admin/create/offer' element={ <AdminRouteProtect><CreateOffer /></AdminRouteProtect> } key="admin-create-offer" />,

    // Admin - Update Offer
    <Route exact path='/admin/update/offer' element={ <AdminRouteProtect><UpdateOffer /></AdminRouteProtect> } key="admin-update-offer" />,
    
    // Admin - Delete Offer
    <Route exact path='/admin/delete/offer' element={ <AdminRouteProtect><DeleteOffer /></AdminRouteProtect> } key="admin-delete-offer" />,
    
    // Admin - Developer (Get All)
    <Route exact path='/admin/all/developer' element={ <AdminRouteProtect><ListAllDeveloper /></AdminRouteProtect> } key="admin-create-developer" />,

    // Admin - Add Developer
    <Route exact path='/admin/create/developer' element={ <AdminRouteProtect><CreateDeveloper /></AdminRouteProtect> } key="admin-create-developer" />,

    //Admin - User (delete Developer)
    <Route exact path='/admin/delete/developer' element={ <AdminRouteProtect><DeleteDeveloper /></AdminRouteProtect> } key="admin-delete-developer" />,
    
    // Admin - Store (Get All)
    <Route exact path='/admin/all/stores' element={ <AdminRouteProtect><ListAllStore /></AdminRouteProtect> } key="admin-all-store" />,

    // Admin - Add Store
    <Route exact path='/admin/create/store' element={ <AdminRouteProtect><CreateStore /></AdminRouteProtect> } key="admin-create-store" />,

    // Admin - Category (Get All)
    <Route exact path='/admin/all/categories' element={ <AdminRouteProtect><ListAllCategories /></AdminRouteProtect> } key="admin-all-category" />,

    // Admin - Category (Create)
    <Route exact path='/admin/create/category' element={ <AdminRouteProtect><AddCategoryDb /></AdminRouteProtect> } key="admin-create-category" />,
    
    // Admin - Category (Update)
    <Route exact path='/admin/update/category' element={ <AdminRouteProtect><UpdateCategoryDb /></AdminRouteProtect> } key="admin-update-category" />,

    // Admin - Category (Delete)
    <Route exact path='/admin/delete/category' element={ <AdminRouteProtect><DeleteCategoryDb /></AdminRouteProtect> } key="admin-delete-category" />,

    // Admin - Product (Get All)
    <Route exact path='/admin/all/products/:limit' element={ <AdminRouteProtect> <ListAllProducts /></AdminRouteProtect> } key="admin-all-product" />,

    // Admin - Product (Create)
    <Route exact path='/admin/create/product' element={ <AdminRouteProtect> <AddProductDb /></AdminRouteProtect> } key="admin-create-product" />,

    // Admin - Product (Update)
    <Route exact path='/admin/update/product' element={ <AdminRouteProtect> <UpdateProductDb /></AdminRouteProtect> } key="admin-update-product" />,

    // Admin - Product (Delete)
    <Route exact path='/admin/delete/product' element={ <AdminRouteProtect> <DeleteProductDb /></AdminRouteProtect> } key="admin-delete-product" />,

    // Admin - Product (Update through CSV)
    <Route exact path='/admin/update/product/csv' element={ <AdminRouteProtect> <CsvLayout /></AdminRouteProtect> } key="csvFile" />,

    // Admin - Product (Get All through CSV)
    <Route exact path='/admin/all/product/csv' element={ <AdminRouteProtect> <CsvProducts /></AdminRouteProtect> } key="All-Products-CSV"/>,

    //Admin - User (Create User)
    <Route exact path='/admin/create/user' element={ <AdminRouteProtect> <CreateUser /></AdminRouteProtect> } key="admin-create-user" />,
    <Route exact path='/admin/delete/user' element={ <AdminRouteProtect> <DeleteUser /></AdminRouteProtect> } key="admin-delete-user" />,
    
    <Route exact path='/admin/all/users' element={ <AdminRouteProtect> <ListAllUser /></AdminRouteProtect> } key="admin-all-user" />,
];

export default AdminRoutes;