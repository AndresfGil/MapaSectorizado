import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({

    name: "map",
    initialState: {
    generalMapActive: true,
    medellinMapActive: false,
    profileActive: false,
    isModalOpen: false,
  },

  reducers: {
    setActiveGeneralMap: (state) => {
      (state.generalMapActive = true),
      (state.medellinMapActive = false),
      (state.profileActive = false);
    },
    setActiveMedellinMap: (state) => {
      (state.generalMapActive = false),
      (state.medellinMapActive = true),
      (state.profileActive = false);
    },
    setModalOpen: (state) => {
      state.isModalOpen = true;
    },
    setModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});


export const { setActiveGeneralMap, setActiveMedellinMap, setModalOpen, setModalClose } = mapSlice.actions;
