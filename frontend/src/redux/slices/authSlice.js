import { createSlice } from "@reduxjs/toolkit"

const defaultAdmin = { id: 1, name: "Admin", role: "admin", isAdmin: true, };

const initialState = {
    user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    :defaultAdmin,
     isSidebarOpen: false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials : (state, action)=> {
            state.user = action.payload;
            state.name = action.payload.name;
            state.isLoggedIn = true;
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        },
        logout: (state, action)=> {
            state.user = null;
            state.name = "";
            state.isLoggedIn = false;
            localStorage.removeItem("userInfo");
        },
        setOpenSidebar : (state, action)=>{
            state.isSidebarOpen = action.payload;
        },
    },
});



export const {
    setCredentials,logout, setOpenSidebar
}= authSlice.actions


export default authSlice.reducer