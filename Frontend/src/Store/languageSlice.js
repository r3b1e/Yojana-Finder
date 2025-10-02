import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        item: "English"
    },
    reducers: {
        setEnglish: (state, payload)=>{
            state.item = "English"
        },
        setHindi: (state, payload) => {
            state.item = "हिन्दी - Hindi"
        }
    }
})

export const {setEnglish, setHindi} = languageSlice.actions;
export default languageSlice.reducer;