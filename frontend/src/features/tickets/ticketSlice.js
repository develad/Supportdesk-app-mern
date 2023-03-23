import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new ticket
export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkAPI) => {
    try {
      // With the thunkAPI we have access to all of the state in the different slices
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get user tickets
export const getTickets = createAsyncThunk(
  "tickets/getAll",
  async (_, thunkAPI) => {
    try {
      // With the thunkAPI we have access to all of the state in the different slices
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTickets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get user ticket
export const getTicket = createAsyncThunk(
  "tickets/get",
  async (ticketId, thunkAPI) => {
    try {
      // With the thunkAPI we have access to all of the state in the different slices
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Close ticket
export const closeTicket = createAsyncThunk(
  "tickets/close",
  async (ticketId, thunkAPI) => {
    try {
      // With the thunkAPI we have access to all of the state in the different slices
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // The message is coming from the return thunkAPI.rejectWithValue(message) in the catch clause
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // The message is coming from the return thunkAPI.rejectWithValue(message) in the catch clause
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // The message is coming from the return thunkAPI.rejectWithValue(message) in the catch clause
        state.message = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        // Updating the UI in the frontend without having to reload the page. The Backend had already been handled
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = "closed")
            : ticket,
        );
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer; // This go to the store
