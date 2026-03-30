import { Search, MapPin, ShoppingCart, SlidersHorizontal, X } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="sticky bg-white border-b border-gray-200 py-4 px-6 w-full top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Keyword Search */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white flex-1 min-w-[200px] focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
            <Search className="text-gray-400 w-4 h-4 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search for job title or keywords"
              className="outline-none text-sm text-gray-700 w-full bg-transparent"
            />
          </div>

          {/* Location Search */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white flex-1 min-w-[180px] focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
            <MapPin className="text-gray-400 w-4 h-4 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search for location"
              className="outline-none text-sm text-gray-700 w-full bg-transparent"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={onSearch}
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors duration-200"
          >
            Search jobs
          </button>

          {/* Job Cart */}
          <button className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            Job Cart
            <span className="bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">1</span>
          </button>
        </div>

        {/* Filter Row */}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <button className="flex items-center gap-1.5 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
            Job Field (Function / Discipline)
            <span className="text-gray-400">▾</span>
          </button>
          <button className="flex items-center gap-1.5 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            All Filters
          </button>
          <button className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-800 font-medium">
            <X className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;