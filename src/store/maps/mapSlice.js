import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        generalMapActive: true,
        medellinMapActive: false,
        profileActive: false,
    },
    reducers: {
        setActiveGeneralMap: ( state ) => {
            state.generalMapActive = true,
            state.medellinMapActive = false,
            state.profileActive = false
        },
        setActiveMedellinMap: ( state ) => {
            state.generalMapActive = false,
            state.medellinMapActive = true,
            state.profileActive = false
        },
        setProfile: ( state ) => {
            state.generalMapActive = false,
            state.medellinMapActive = false,
            state.profileActive = true
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    setActiveGeneralMap,
    setActiveMedellinMap,
    setProfile
} =  mapSlice.actions;