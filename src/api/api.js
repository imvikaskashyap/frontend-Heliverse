
import axios from 'axios';
import { BACKEND_URL } from '../utils/config';

const API_URL = `${BACKEND_URL}` 

// User API =====>>>>>>>>>
export const fetchUsers = (page, filters) => {
  return axios.get(`${API_URL}/users`, {
    params: {
      page,
      ...filters,
    },
  });
};

// create user
export const createUser = (userData) => {
  return axios.post(`${API_URL}/create`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// edit user
export const editUser = (userId, user) => {
  return axios.put(`${API_URL}/users/${userId}`, user); 
};


// Delete a user 
export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/users/${userId}`); 
};


// Team API =====>>>>>>>>> 

// Fetch all teams
export const fetchTeams = () => {
  return axios.get(`${API_URL}/teams`);
};
// Create team
export const createTeam = ({ teamName, teamDescription, teamMembers }) => {
  return axios.post(`${API_URL}/teams`, {
    team_name: teamName,
    team_description: teamDescription,
    team_members: teamMembers,
  });
};

// Fetch a single team by ID
export const fetchTeamById = (id) => {
  return axios.get(`${API_URL}/teams/${id}`);
};