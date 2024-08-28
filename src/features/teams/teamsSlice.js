import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchTeamById } from '../../api/api';
import { BACKEND_URL } from '../../utils/config';

const API_URL = `${BACKEND_URL}/teams` ;

// Initial state for teams
const initialState = {
  teams: [],
  selectedTeam: null, 
  loading: false,
  error: null,
};

// Async thunk for fetching teams
export const fetchTeamsAsync = createAsyncThunk(
  'teams/fetchTeams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
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
      console.log('Fetched team details:', response.data); 
      return response.data; 
    } catch (error) {
      console.error('Failed to fetch team details:', error);
      return rejectWithValue(error.response.data);
    }
  }
);



// Async thunk for creating a team with users
export const createTeamAsync = createAsyncThunk(
  'teams/createTeam',
  async ({ teamName, teamDescription, userIds }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, {
        team_name: teamName,
        team_description: teamDescription,
        team_members: userIds,
      });
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
