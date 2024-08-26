import { CirclePlus, Search } from "lucide-react";

function FilterSearch() {
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-100">Total Users:</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">240 </span>
          </div>
        </div>

        <div className="flex items-center mt-4 gap-x-3">
          <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600">
          <CirclePlus className="w-5 h-5"/>
            <span>Add vendor</span>

          </button>
        </div>
      </div>

      <div className="mt-6 md:flex md:items-center md:justify-between">
        <div className="inline-flex overflow-hidden bg-gray-900 border divide-x rounded-lg rtl:flex-row-reverse border-gray-700 divide-gray-700">
          <button className="px-5 py-2 text-xs font-medium text-gray-300 transition-colors duration-200 bg-gray-800 sm:text-sm">
            View all
          </button>
          <button className="px-5 py-2 text-xs font-medium text-gray-300 transition-colors duration-200 sm:text-sm hover:bg-gray-800">
            Monitored
          </button>
          <button className="px-5 py-2 text-xs font-medium text-gray-300 transition-colors duration-200 sm:text-sm hover:bg-gray-800">
            Unmonitored
          </button>
        </div>

        <div className="relative flex items-center mt-4 md:mt-0">
          <span className="absolute left-3">
            <Search className="text-gray-400 w-5 h-5" />
          </span>

          <input
            type="text"
            placeholder="Search"
            className="block w-full py-1.5 pr-5 pl-10 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg rtl:pl-10 rtl:pr-5 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterSearch;
