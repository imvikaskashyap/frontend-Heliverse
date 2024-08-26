import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination() {
  return (
    <div className="flex items-center justify-between mt-6">
      <button className="flex items-center justify-center px-5 py-2 text-sm text-gray-100 capitalize transition-colors duration-200 bg-gray-900 border border-gray-700 rounded-md gap-x-2 hover:bg-gray-800">
      <ChevronLeft className="w-5 h-5" />
        <span>Previous</span>
      </button>

      <div className="items-center hidden md:flex gap-x-3">
        <button className="px-2 py-1 text-sm text-blue-500 rounded-md bg-blue-100/60">1</button>
        <button className="px-2 py-1 text-sm text-gray-300 rounded-md hover:bg-gray-800">2</button>
        <button className="px-2 py-1 text-sm text-gray-300 rounded-md hover:bg-gray-800">3</button>
        <button className="px-2 py-1 text-sm text-gray-300 rounded-md hover:bg-gray-800">...</button>
        <button className="px-2 py-1 text-sm text-gray-300 rounded-md hover:bg-gray-800">12</button>
        <button className="px-2 py-1 text-sm text-gray-300 rounded-md hover:bg-gray-800">13</button>
        <button className="px-2 py-1 text-sm text-gray-300 rounded-md hover:bg-gray-800">14</button>
      </div>

      <button className="flex items-center justify-center px-5 py-2 text-sm text-gray-100 capitalize transition-colors duration-200 bg-gray-900 border border-gray-700 rounded-md gap-x-2 hover:bg-gray-800">
        <span>Next</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Pagination;
