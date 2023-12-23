import { setActiveGeneralMap, setActiveMedellinMap  } from "./mapSlice";


export const startActiveGeneralMap = () => (dispatch) => {
    dispatch( setActiveGeneralMap() );
}

export const startActiveMedellinMap = () => (dispatch) => {
    dispatch( setActiveMedellinMap() );
}