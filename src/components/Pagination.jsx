import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  
  const getDisplayedPages = () => {
    const delta = 2;
    const range = [];

    
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    
    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    return [1, ...range, totalPages];
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-5 py-2 text-sm text-gray-100 capitalize transition-colors duration-200 bg-gray-900 border border-gray-700 rounded-md gap-x-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Previous</span>
      </button>

      <div className="items-center hidden md:flex gap-x-3">
        {displayedPages.map((page, index) => (
          typeof page === "number" ? (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-2 py-1 text-sm rounded-md ${
                page === currentPage ? 'text-blue-500 bg-blue-100/60' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 py-1 text-sm text-gray-300">
              {page}
            </span>
          )
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-5 py-2 text-sm text-gray-100 capitalize transition-colors duration-200 bg-gray-900 border border-gray-700 rounded-md gap-x-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Next</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
