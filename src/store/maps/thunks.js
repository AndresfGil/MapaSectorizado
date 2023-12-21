import { setActiveMap } from "./mapSlice";


export const startActiveMap = () => (dispatch) => {
    dispatch( setActiveMap() );
}