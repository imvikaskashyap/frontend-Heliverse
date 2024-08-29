// teamsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTeams, fetchTeamById, createTeam } from '../../api/api'; 

// Initial state for teams
const initialState = {
  teams: [],
  selectedTeam: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all teams
export const fetchTeamsAsync = createAsyncThunk(
  'teams/fetchTeams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTeams(); 
      return response.data.teams;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching a single team by ID
export const fetchTeamByIdAsync = createAsyncThunk(
  'teams/fetchTeamById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchTeamById(id); 
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk for creating a new team with users
export const createTeamAsync = createAsyncThunk(
  'teams/createTeam',
  async ({ teamName, teamDescription, userIds }, { rejectWithValue }) => {
    try {
      const response = await createTeam({ teamName, teamDescription, userIds }); // Use imported API function
      return response.data.team;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeamsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTeamByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTeam = action.payload;
      })
      .addCase(fetchTeamByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTeamAsync.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      });
  },
});

export default teamsSlice.reducer;
