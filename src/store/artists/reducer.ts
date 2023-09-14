import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IArtist, IArtistsState } from "./types";

export const fetchArtists = createAsyncThunk("fetchPaintings", async () => {
  const { data } = await axios.get<IArtist[]>(
    "https://internship-front.framework.team/artists/static",
  );
  return data as IArtist[];
});

const initialState: IArtistsState = {
  artists: [],
  status: "loading",
};

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchArtists.pending, (state) => {
      state.status = "loading";
      state.artists = [];
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.status = "error";
      state.artists = [];
    });
  },
});

export default artistsSlice.reducer;
