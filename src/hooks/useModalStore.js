import { useDispatch, useSelector } from "react-redux";
import { setModalClose, setModalOpen } from "../store/maps/mapSlice";

export const useModalStore = () => {
  const dispatch = useDispatch();

  const { isModalOpen } = useSelector((state) => state.map);

  const openInfoModal = () => {
    dispatch(setModalOpen());
  };

  const closeInfoModal = () => {
    dispatch(setModalClose());
  };

  return {
    //Propiedades
    isModalOpen,

    //Metodos
    openInfoModal,
    closeInfoModal,
  };
};
