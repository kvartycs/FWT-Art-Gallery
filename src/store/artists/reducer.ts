import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IArtist, IArtistById, IArtistsState } from "./types";

export const fetchArtists = createAsyncThunk("fetchArtists", async () => {
  const { data } = await axios.get<IArtist[]>(
    "https://internship-front.framework.team/artists/static",
  );
  return data as IArtist[];
});

export const fetchArtistById = createAsyncThunk(
  "fetchArtistById",
  async (id: string | undefined) => {
    const { data } = await axios.get<IArtistById>(
      `https://internship-front.framework.team/artists/static/${id}`,
    );
    return data as IArtistById;
  },
);

const initialState: IArtistsState = {
  artists: [],
  status: "loading",
  data: null,
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
    builder.addCase(fetchArtistById.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchArtistById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchArtistById.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
  },
});

export default artistsSlice.reducer;
