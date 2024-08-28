import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeamsAsync,
  fetchTeamByIdAsync,
} from "../features/teams/teamsSlice";
import TeamCard from "../components/TeamCard";
import TeamModal from "../components/TeamModal";

const Teams = () => {
  const dispatch = useDispatch();
  const { teams, loading, error, selectedTeam } = useSelector(
    (state) => state.teams
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    console.log('Fetching teams...');
    dispatch(fetchTeamsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTeamId) {
      console.log(`Fetching team with ID: ${selectedTeamId}`);
      dispatch(fetchTeamByIdAsync(selectedTeamId))
        .unwrap()
        .then((fetchedTeam) => {
          console.log('Team details fetched successfully:', fetchedTeam);
          setIsModalOpen(true);
        })
        .catch((error) => {
          console.error('Failed to fetch team details:', error);
          setSelectedTeamId(null); // Clear selection on error
        });
    }
  }, [selectedTeamId, dispatch]);
  

  const handleOpenModal = (teamId) => {
    console.log(`Opening modal for team ID: ${teamId}`);
    setSelectedTeamId(teamId);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    setSelectedTeamId(null);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col gap-y-6">
      <h1 className="text-3xl font-semibold text-gray-100">Teams</h1>

      {loading && !selectedTeamId ? (
        <div className="flex items-center justify-center w-full h-48">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : error && !selectedTeamId ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teams.length > 0 ? (
            teams.map((team) => (
              <TeamCard
                key={team._id}
                team={team}
                onClick={() => handleOpenModal(team._id)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No teams available</p>
          )}
        </div>
      )}

      {isModalOpen && selectedTeam && (
  <>
    {console.log('Selected team details in modal:', selectedTeam)}
    <TeamModal team={selectedTeam} onClose={handleCloseModal} />
  </>
)}

    </div>
  );
};

export default Teams;
