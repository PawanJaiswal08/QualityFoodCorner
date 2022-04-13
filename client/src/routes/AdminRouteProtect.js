import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/index'

function AdminRouteProtect({ children }) {

	const _isAuthenticated = isAuthenticated()
	// console.log("Role of user -->", _isAuthenticated.user.role);

	if (_isAuthenticated) {
		return (_isAuthenticated.user.role === 1 ) ? children : <Navigate to="/" />
	}
	
	else{
		return <Navigate to='/signin' />
	}
}

export default AdminRouteProtect;