import { setActiveGeneralMap, setActiveMedellinMap, setProfile,  } from "./mapSlice";


export const startActiveGeneralMap = () => (dispatch) => {
    dispatch( setActiveGeneralMap() );
}

export const startActiveMedellinMap = () => (dispatch) => {
    dispatch( setActiveMedellinMap() );
}

export const startActiveProfile = () => (dispatch) => {
    dispatch( setProfile() );
}