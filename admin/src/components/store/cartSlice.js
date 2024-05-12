import { createSlice } from "@reduxjs/toolkit"

const initialState = [];


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        sum(state, action){
            const cartItem =state.find(item => item.id === action.payload.id);
            const division = cartItem.serial/cartItem.quantity;
            cartItem.quantity = cartItem.quantity + 1;
            cartItem.serial = cartItem.serial + division; 
        },
        sub(state, action){
            const cartItem =state.find(item => item.id === action.payload.id);
            const division = cartItem.serial/cartItem.quantity;
            if (cartItem.quantity === 1){
                return state.filter(item => item !== cartItem);
            }else {
                cartItem.quantity = cartItem.quantity - 1;
                cartItem.serial = cartItem.serial - division; 
            }
        },
        remove(state, action) {
            return state.filter(item => item.id !== action.payload);
        },
        removeAll(state, action){
            return state = [];
        }
    }
})


export const { add, remove, removeAll, sum, sub } = cartSlice.actions;
export const selectTotal = (state) => state.cart.reduce((total , item) => total + item.serial , 0);
export default cartSlice.reducer;