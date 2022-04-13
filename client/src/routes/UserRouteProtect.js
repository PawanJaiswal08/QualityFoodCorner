import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/index'

function UserRouteProtect({ children }) {

	const _isAuthenticated = isAuthenticated()

	if (_isAuthenticated) {
		return (_isAuthenticated) ? children : <Navigate to='/' />
	}
    
    else{
		return <Navigate to='/signin' />
	}
}

export default UserRouteProtect;