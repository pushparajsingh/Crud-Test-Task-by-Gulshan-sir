import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList: [],
    message: null,
    userDetails: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userList.push(action.payload)
            state.message = 'User has been created successfully.'
        },
        deleteUser: (state, action) => {
            state.userList.splice(action.payload, 1);
            state.message = 'User has been deleted successfully.'
        },
        updateUser: (state, action)=>{
            state.userList?.forEach((user)=>{
                if(user.id===action.payload.id){
                    user.name = action.payload.name;
                    user.email = action.payload.email;
                    user.userName = action.payload.userName;
                    user.mobile = action.payload.mobile;
                    user.role = action.payload.role;
                    user.password = action.payload.password;
                    state.message = 'User has been updated successfully.'
                }
            })
        },
        getUser: (state, action) => {
            state.userDetails = state.userList.find((el)=>el.id===action.payload)
        },
        resetUser: (state, action) => {
            state.message = null
        }
    },
})

export const { addUser, deleteUser, updateUser, getUser, resetUser } = userSlice.actions

export default userSlice.reducer
