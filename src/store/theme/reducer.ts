import { createSlice } from "@reduxjs/toolkit";
import { getTheme } from "../../utils/getTheme";
import type { RootState } from "../index";

const initialState = getTheme();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => action.payload,
  },
});

export const selectTheme = (state: RootState) => state.theme;

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
