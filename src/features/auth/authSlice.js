import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.confic";

const initialState = {
  email: "",
  role: "",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk("auth/createUser", async ({ email, password }) => {
  const data = await createUserWithEmailAndPassword(auth, email, password);
  return data.user.email;
});

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
  const data = await signInWithEmailAndPassword(auth, email, password);
  return data.user.email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.email = "";
      state.error = "";
      state.isError = false;
    },
    setUser: (state, action) => {
      state.email = action.payload;
      state.error = "";
      state.isError = false;
      state.isLoading = false;
    },

    toggleLoading:(state)=>{
          
    }
  },
  extraReducers: (builder) => {
    //signup or create user
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.isError = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.email = action.payload;
        state.role = action.payload.role;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isError = true;
      })
      //========== login user ==========
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isError = true;
      });
  },
});

export const { logOutUser, setUser } = authSlice.actions;

export default authSlice.reducer;
