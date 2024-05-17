import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import returnReducer from "./returnSlice";

const store = configureStore({
    reducer : {
        cart : cartReducer,
        return: returnReducer,  
    }
})


export default store;