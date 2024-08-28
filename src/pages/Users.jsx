import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAsync, setCurrentPage, setFilters, updateUserAsync, deleteUserAsync } from "../features/users/usersSlice";
import FilterSearch from "../components/FilterSearch";
import Pagination from "../components/Pagination";
import EditUserModal from "../components/EditUserModal";
import { toast } from "react-toastify";
import TeamCreationModal from "../components/TeamCreationModal";


const Users = () => {
  const dispatch = useDispatch();
  
  
  const { users, totalUsers, currentPage, filters, loading, error } = useSelector((state) => state.users);

  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  useEffect(() => {
    dispatch(fetchUsersAsync({ page: currentPage, filters }));
  }, [dispatch, currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(setCurrentPage(1)); 
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (userId) => {
    dispatch(deleteUserAsync(userId))
      .unwrap()
      .then(() => {
        toast.success("User successfully deleted!");
      })
      .catch(() => {
        toast.error("Failed to delete user.");
      });
  }

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = (updateInfo) => {
    dispatch(updateUserAsync(updateInfo))
      .unwrap()
      .then(() => {
        toast.success("User successfully updated!");
        setIsEditModalOpen(false);
      })
      .catch(() => {
        toast.error("Failed to update user.");
      });
  };

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

  const handleAddTeamClick = () => {
    setIsTeamModalOpen(true);
  };

  const handleTeamModalClose = () => {
    setIsTeamModalOpen(false);
  };

  const handleTeamCreated = () => {
    handleTeamModalClose();
    dispatch(fetchUsersAsync({ page: currentPage, filters }));
  };

  return (
    <div className="overflow-hidden flex mt-20 justify-center">
      <section className="container px-4 mx-auto">
        <FilterSearch 
          onFilterChange={handleFilterChange} 
          totalUsers={totalUsers} 
          onAddTeamClick={handleAddTeamClick} 
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900">
                      <tr>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-300">Select</th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-300">Avatar</th>
                        <th className="px-8 py-3.5 text-sm font-normal text-left text-gray-300">Full Name</th>
                        <th className="px-8 py-3.5 text-sm font-normal text-left text-gray-300">Gender</th>
                        <th className="px-8 py-3.5 text-sm font-normal text-left text-gray-300">Domain</th>
                        <th className="px-12 py-3.5 text-sm font-normal text-left text-gray-300">Status</th>
                        <th className="relative py-3.5 px-4">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-700">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedUsers.has(user._id)}
                              onChange={() => handleCheckboxChange(user._id)}
                              className="form-checkbox h-5 w-5 text-blue-600"
                              disabled={!user.available}
                            />
                          </td>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <img
                              src={user.avatar}
                              alt={`${user.first_name} ${user.last_name}`}
                              className="w-10 h-10 rounded-full"
                            />
                          </td>
                          <td className="px-8 py-4 text-sm font-medium whitespace-nowrap">
                            <h2 className="font-medium text-gray-100">
                              {user.first_name} {user.last_name}
                            </h2>
                          </td>
                          <td className="px-8 py-4 text-sm font-medium whitespace-nowrap">
                            <h2 className="font-medium text-gray-100">{user.gender}</h2>
                          </td>
                          <td className="px-8 py-4 text-sm font-medium whitespace-nowrap">
                            <h2 className="font-medium text-gray-100">{user.domain}</h2>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                            <div
                              className={`inline py-1 text-sm font-normal rounded-full ${
                                user.available ? 'text-emerald-500 bg-green-100' : 'text-red-500 bg-red-100'
                              }`}
                            >
                              {user.available ? 'Available' : 'Not Available'}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <button 
                              className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-800"
                              onClick={() => handleEditClick(user)}
                            >
                              Edit
                            </button>
                            <button 
                              className="ml-2 px-1 py-1 text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-800"
                              onClick={() => handleDeleteClick(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

       
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalUsers / 10)}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

     
      {isEditModalOpen && selectedUser && (
        <EditUserModal 
          user={selectedUser} 
          onClose={handleModalClose} 
          onSave={handleUserUpdate} 
        />
      )}

    
      {isTeamModalOpen && (
        <TeamCreationModal
          onClose={handleTeamModalClose}
          users={users}
          onTeamCreated={handleTeamCreated}
        />
      )}
    </div>
  );
};

export default Users;
