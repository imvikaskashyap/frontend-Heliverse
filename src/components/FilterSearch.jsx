import { useState, useEffect } from "react";
import { Search } from "lucide-react";

function FilterSearch({ onFilterChange, totalUsers, onAddTeamClick }) {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [domain, setDomain] = useState("");
  const [available, setAvailable] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterApply = () => {
    onFilterChange({ search, gender, domain, available });
  };

 
  useEffect(() => {
    handleFilterApply();
  }, [search]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-4">
          <h2 className="text-xl font-semibold text-gray-100">Total Users:</h2>
          <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">{totalUsers}</span>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center gap-x-3">
          <button
            onClick={onAddTeamClick}
            className="flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Add Team
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-center md:gap-4">
        <div className="relative flex items-center w-full md:w-1/4">
          <span className="absolute left-3 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            className="block w-full py-2 pl-10 pr-4 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col md:flex-row md:gap-4 w-full mt-4 md:mt-0">
          <div className="w-full md:w-1/4">
            <label className="block text-gray-300 font-medium">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block w-full mt-2 px-3 py-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="w-full md:w-1/4">
            <label className="block text-gray-300 font-medium">Domain:</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain"
              className="block w-full mt-2 px-3 py-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="w-full md:w-1/4">
            <label className="block text-gray-300 font-medium">Available:</label>
            <select
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
              className="block w-full mt-2 px-3 py-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-auto mt-4 md:mt-0">
          <button
            onClick={handleFilterApply}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSearch;
