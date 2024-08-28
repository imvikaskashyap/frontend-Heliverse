import { useState } from "react";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave({ userId: user._id, userData: updatedUser });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg w-11/12 max-w-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Edit User</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">First Name</label>
          <input
            type="text"
            name="first_name"
            value={updatedUser.first_name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={updatedUser.last_name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
          />
        </div>
       
        <div className="flex justify-end mt-6">
       
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 mr-2"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button 
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
