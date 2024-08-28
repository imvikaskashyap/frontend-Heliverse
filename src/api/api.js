
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchUsers = (page, filters) => {
  return axios.get(`${API_URL}/users`, {
    params: {
      page,
      ...filters,
    },
  });
};

export const createUser = (user) => {
  return axios.post(`${API_URL}/users`, user);
};

// API call to update user
export const editUser = (userId, user) => {
  return axios.put(`${API_URL}/users`, user, {
    params: {
      id: userId,
    },
  });
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/users/oneUser`, {
    params: {
      id: userId, 
    },
  });
};

export const fetchTeams = () => {
  return axios.get(`${API_URL}/teams`);
};

export const createTeam = ({ teamName, teamDescription, teamMembers }) => {
  return axios.post(`${API_URL}/teams`, {
    team_name: teamName,
    team_description: teamDescription,
    team_members: teamMembers,
  });
};

// Fetch a single team by ID
export const fetchTeamById = (id) => {
  return axios.get(`${API_URL}/teams`, {
    params: {
      id, 
    },
  });
};