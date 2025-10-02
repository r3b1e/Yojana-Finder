import { createSlice } from "@reduxjs/toolkit";

const dashSlice = createSlice({
    name: "dashData",
    initialState: {
        items: null
    },
    reducers: {
        addItems: (state, action) => {
            state.items = action.payload;
        }
    }
})

export const {addItems} = dashSlice.actions;
export default dashSlice.reducer;