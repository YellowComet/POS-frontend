import { createSlice } from "@reduxjs/toolkit"

const initialState = [];


const returnSlice = createSlice({
    name: "return",
    initialState: {
        myBoolean: false,
        id: 0,
        totalPagado: 0.0
    },
    reducers: {
        setTrue: state => {
            state.myBoolean = true;
        },
        setFalse: state => {
            state.myBoolean = false;
        },
        toggle: state => {
            state.myBoolean = !state.myBoolean;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        resetId: state => {
            state.id = 0;
        },
        setTotalPagado: (state, action) => {
            state.totalPagado = action.payload;
        },
        resetTotalPagado: state => {
            state.totalPagado = 0.0;
        },
    }
})


export const { setTrue, setFalse, toggle, setId, resetId, setTotalPagado, resetTotalPagado } = returnSlice.actions;
export default returnSlice.reducer;