import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/api/authApiSLice"
import {apiSlice} from "./slices/apiSlice"
import userReducer from './slices/userSlice'
import orderReducer from './slices/orderSlice'
import adminReducer from './slices/api/adminApiSlice'; 


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        order: orderReducer,
        auth: authReducer,
        users: userReducer,
        admin: adminReducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})


export default store