import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser, editUser, fetchUsers } from "../../api/api";

// Initial state for users
const initialState = {
  users: [], 
  totalUsers: 0,
  currentPage: 1,
  filters: {
    gender: "",
    domain: "",
    available: "",
  },
  loading: false,
  error: null,
};

// Thunk for fetching users
export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, filters }, { rejectWithValue }) => {
    try {
      const response = await fetchUsers(page, filters);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for updating a user

export const updateUserAsync = createAsyncThunk(
    "users/updateUser",
    async ({ userId, userData }, { rejectWithValue }) => {
      try {
        const response = await editUser(userId, userData); 
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
  

// Thunk for deleting a user
export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await deleteUser(userId);
      return userId; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1; 
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users; 
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUserIndex = state.users.findIndex(user => user._id === action.payload._id);
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload; 
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload); 
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
