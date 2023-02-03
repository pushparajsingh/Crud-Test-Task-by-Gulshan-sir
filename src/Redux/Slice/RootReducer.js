import { combineReducers } from "@reduxjs/toolkit";
import RoleSlice from './RoleSlice'
import UserSlice from './UserSlice'

const RootReducer = combineReducers({
    user: UserSlice,
    role: RoleSlice
})
export default RootReducer;