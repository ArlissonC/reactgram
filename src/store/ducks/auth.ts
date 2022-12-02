import { AppDispatch } from "./../configureStore";
import { LOGIN_USER, REGISTER_USER } from "services/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: any;
  error: any;
  success: boolean;
  loading: boolean;
}

const user = JSON.parse(localStorage.getItem("user")!);
const initialState = {
  user: user ? user : null,
  error: null,
  success: false,
  loading: false,
} as InitialState;

// Register an user and sign in
export const register = createAsyncThunk(
  "auth/register",
  async (user: any, { rejectWithValue }) => {
    try {
      const { data } = await REGISTER_USER(user);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: any, { rejectWithValue }) => {
    try {
      const { data } = await LOGIN_USER(user);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  },
);

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch(resetLogout());
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    resetLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.success = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = payload;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.user = null;
      });
  },
});

export const { reset, resetLogout } = slice.actions;

export default slice.reducer;
