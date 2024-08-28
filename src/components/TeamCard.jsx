const TeamCard = ({ team, onClick }) => {
   
  
    return (
      <div
        onClick={onClick}
        className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
      >
        <h2 className="text-lg font-semibold text-gray-100">{team.team_name}</h2>
        <p className="text-gray-400">
          {team.team_description || "No description available vk"}
        </p>
        <div className="mt-4 flex items-center gap-2">
          {team.team_members && team.team_members.length > 0 ? (
            team.team_members.slice(0, 5).map((member) => (
              <img
                key={member._id} 
                src={member.avatar}
                alt={member.first_name}
                className="w-8 h-8 rounded-full border-2 border-gray-900"
              />
            ))
          ) : (
            <p className="text-gray-500">No members</p>
          )}
          {team.team_members && team.team_members.length > 5 && (
            <div className="w-8 h-8 flex items-center justify-center text-gray-300 bg-gray-600 rounded-full border-2 border-gray-900">
              +{team.team_members.length - 5}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default TeamCard;
  