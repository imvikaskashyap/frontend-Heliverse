import ReactDOM from 'react-dom';

const TeamModal = ({ team, onClose }) => {
  if (!team) return null; 

  const { team_name, team_description, team_members = [] } = team.team;

  console.log(team_members, "team modal");

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-gray-100"
          onClick={onClose}
        >
          Close
        </button>
        
        <h2 className="text-2xl font-semibold text-gray-100">{team_name}</h2>
        <p className="text-gray-400 mt-2">{team_description || 'No description available'}</p>
        
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-100">Members:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {team_members.length > 0 ? (
              team_members.map((member) => (
                <div key={member._id} className="flex items-center gap-2">
                  <img
                    src={member.avatar}
                    alt={member.first_name}
                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                  />
                  <span className="text-gray-300">{member.first_name} {member.last_name}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No members available</p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TeamModal;
