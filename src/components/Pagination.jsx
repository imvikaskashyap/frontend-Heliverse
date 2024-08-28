import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-5 py-2 text-sm text-gray-100 capitalize transition-colors duration-200 bg-gray-900 border border-gray-700 rounded-md gap-x-2 hover:bg-gray-800"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Previous</span>
      </button>

      <div className="items-center hidden md:flex gap-x-3">
        {[...Array(totalPages).keys()].map(page => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`px-2 py-1 text-sm rounded-md ${page + 1 === currentPage ? 'text-blue-500 bg-blue-100/60' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-5 py-2 text-sm text-gray-100 capitalize transition-colors duration-200 bg-gray-900 border border-gray-700 rounded-md gap-x-2 hover:bg-gray-800"
      >
        <span>Next</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
