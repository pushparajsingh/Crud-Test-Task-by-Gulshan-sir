import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roleList: [],
    message: null,
    roleDetails: null
}

export const roleSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addRole: (state, action) => {
            state.roleList.push(action.payload)
            state.message = 'Role has been created successfully.'
        },
        deleteRole: (state, action) => {
            state.roleList.splice(action.payload, 1);
            state.message = 'Role has been deleted successfully.'
        },
        updateRole: (state, action)=>{
            state.roleList?.forEach((role)=>{
                if(role.id===action.payload.id){
                    role.name = action.payload.name
                    state.message = 'Role has been updated successfully.'
                }
            })
        },
        getRole: (state, action) => {
            state.roleDetails = state.roleList.find((el)=>el.id===action.payload)
        },
        resetRole: (state, action) => {
            state.message = null
        }
    },
})

export const { addRole, deleteRole, updateRole, getRole, resetRole } = roleSlice.actions

export default roleSlice.reducer
