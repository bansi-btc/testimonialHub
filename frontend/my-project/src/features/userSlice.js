import { createSlice } from "@reduxjs/toolkit";

let initialState={
    token:localStorage.getItem("token")?localStorage.getItem("token"):null,
    logoutModal:false,
}

export const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            // console.log(action.payload);
            state.token=action.payload;
            // console.log(state.token)
        },
        setLogoutModal:(state, action)=>{
            state.logoutModal=action.payload;
        },
    }
})

export const {setToken, setLogoutModal} = userSlice.actions;
export default userSlice.reducer;