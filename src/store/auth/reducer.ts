import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IAuthState, IRegisterProps, ITokens } from "./type";
import { getCookie } from "../../utils/getCookie";

export const fetchAuth = createAsyncThunk<ITokens, IRegisterProps>(
  "auth/fetchAuth",
  async (props) => {
    const { data } = await axios.post(
      "https://internship-front.framework.team/auth/login",
      props,
    );
    return data;
  },
);
export const fetchRegister = createAsyncThunk<ITokens, IRegisterProps>(
  "auth/fetchRegister",
  async (props) => {
    const { data } = await axios.post(
      "https://internship-front.framework.team/auth/register",
      props,
    );
    return data;
  },
);

const initialState: IAuthState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
  },
});

export const selectIsAuth = () => Boolean(getCookie("accessToken"));

export default authSlice.reducer;
