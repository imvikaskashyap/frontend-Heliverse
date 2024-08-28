import { useDispatch } from 'react-redux';
import { createTeamAsync } from '../features/teams/teamsSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';

const TeamCreationModal = ({ onClose, users, onTeamCreated }) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const dispatch = useDispatch();

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) => {
      const updatedSelection = new Set(prev);
      if (updatedSelection.has(userId)) {
        updatedSelection.delete(userId);
      } else {
        updatedSelection.add(userId);
      }
      return updatedSelection;
    });
  };

  const handleCreateTeam = () => {
    if (teamName.trim() === '') {
      toast.error('Please enter a team name.');
      return;
    }

    const userIds = Array.from(selectedUsers);
    dispatch(createTeamAsync({
      teamName,
      teamDescription,
      userIds
    }))
      .unwrap()
      .then(() => {
        toast.success('Team successfully created!');
        onTeamCreated(); 
      })
      .catch(() => {
        toast.error('Failed to create team.');
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg w-11/12 max-w-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Create Team</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Team Description</label>
          <input
            type="text"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-300">Select Users</h3>
          {users.filter(user => user.available).map(user => (
            <div key={user._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedUsers.has(user._id)}
                onChange={() => handleCheckboxChange(user._id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="ml-2 text-gray-100">{user.first_name} {user.last_name}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleCreateTeam}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 mr-2"
          >
            Create Team
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCreationModal;
