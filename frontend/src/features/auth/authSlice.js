import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register new user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    // console.log(user, thunkAPI);
    // return user;

    // **************
    // const res = await fetch(
    //   "https://jsonplaceholder.typicode.com/users/1/todos?_limit=4",
    // );
    // const data = res.json();
    // return data;
    // **************
    console.log(user);
  },
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  console.log(user);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(register.fulfilled, (state, action) => {
    //   console.log(state);
    //   console.log(action);
    //   state.user = action.payload;
    // state.isLoading = false;
    // });
    //   .addCase(register.pending, (state) => {
    //     state.isLoading = true;
    //   });
  },
});

export default authSlice.reducer;
