import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSpanish: false
}

const languageSlice = createSlice({
    name : "language",
    initialState,
    reducers: {
        toggleLanguage: (state) => {
            state.isSpanish = !state.isSpanish;
        }, 
        setLanguage: (state, action) => {
            state.isSpanish = action.payload
        }
    }
})

export const {toggleLanguage, setLanguage} = languageSlice.actions

export default languageSlice.reducer