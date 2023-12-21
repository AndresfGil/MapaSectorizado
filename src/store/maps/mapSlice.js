import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        active: false,
    },
    reducers: {
        setActiveMap: ( state ) => {
            state.active = true
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    setActiveMap 
} =  mapSlice.actions;