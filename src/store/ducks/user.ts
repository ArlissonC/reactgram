import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from "services/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_USER } from "services/user";

interface InitialState {
  user: any;
  error: any;
  success: boolean;
  loading: boolean;
  message: string | null;
}

const initialState = {
  user: null,
  error: null,
  success: false,
  loading: false,
  message: null,
} as InitialState;

export const getUser = createAsyncThunk("user/getUser", async () => {
  const { data } = await GET_USER();
  return data;
});

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (user: any, { rejectWithValue }) => {
    try {
      const { data } = await UPDATE_USER_PROFILE(user);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  },
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (id: string) => {
    const { data } = await GET_USER_PROFILE(id);
    return data;
  },
);

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.message = "Usuário atualizado com sucesso!";
        state.user = payload;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.user = null;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = payload;
      });
  },
});

export const { resetMessage } = slice.actions;

export default slice.reducer;
