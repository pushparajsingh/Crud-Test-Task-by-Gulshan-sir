import React from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout";
import UserListing from "../Pages/User/UserListing";
import UserForm from '../Pages/User/UserForm';
import RoleListing from '../Pages/Role/RoleListing';
import RoleForm from '../Pages/Role/RoleForm';

const PublicRoutes=()=>{
    return(
		<Layout>  
			<Routes>  
				<Route path="/" element={<UserListing/>}/>
				<Route path="/users" element={<UserListing/>}/>
				<Route path="/user/form" element={<UserForm/>}/>
				<Route path="/user/form/:id" element={<UserForm/>}/>
				<Route path="/roles" element={<RoleListing/>}/>
				<Route path="/role/form" element={<RoleForm/>}/>
				<Route path="/role/form/:id" element={<RoleForm/>}/>
			</Routes>
		</Layout>  
    )
}

export default PublicRoutes;