import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterModalProps {
  onClose: () => void;
  onApply: (filters: Record<string, string[]>) => void;
  initialFilters?: Record<string, string[]>;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose, onApply, initialFilters = { location: [], score: [] } }) => {
  // Initial filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'location',
      label: 'Location',
      options: [
        { value: 'india', label: 'India' },
        { value: 'united_kingdom', label: 'United Kingdom' },
        { value: 'united_states_of_america', label: 'United States of America' },
        { value: 'saudi_arabia', label: 'Saudi Arabia' },
        { value: 'united_states_of_america_2', label: 'United States of America' },
        { value: 'singapore', label: 'Singapore' },
        { value: 'india_2', label: 'India' },
        { value: 'taiwan', label: 'Taiwan' },
        { value: 'france', label: 'France' },
        { value: 'united_states_of_america_3', label: 'United States of America' },
        { value: 'germany', label: 'Germany' },
        { value: 'china', label: 'China' },
      ],
    },
    {
      id: 'score',
      label: 'Score',
      options: [
        { value: '90-100', label: '90-100' },
        { value: '80-89', label: '80-89' },
        { value: '70-79', label: '70-79' },
        { value: '60-69', label: '60-69' },
      ],
    },
  ];

  // State for active filter category and search query
  const [activeFilter, setActiveFilter] = useState('location');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for selected filters - initialize with passed-in filters
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(initialFilters);

  // Count total applied filters
  const totalAppliedFilters = Object.values(selectedFilters).reduce(
    (count, filters) => count + filters.length, 
    0
  );

  // Count applied filters for the current category
  const appliedFiltersCount = (category: string) => {
    return selectedFilters[category]?.length || 0;
  };

  // Handle checkbox changes
  const handleCheckboxChange = (filterId: string, value: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[filterId]) {
        newFilters[filterId] = [];
      }
      
      if (newFilters[filterId].includes(value)) {
        newFilters[filterId] = newFilters[filterId].filter(v => v !== value);
      } else {
        newFilters[filterId] = [...newFilters[filterId], value];
      }
      
      return newFilters;
    });
  };

  // Filter options based on search query
  const filteredOptions = activeFilter
    ? filterOptions
        .find(option => option.id === activeFilter)
        ?.options.filter(option => 
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        ) || []
    : [];

  // Clear all filters for a category
  const clearCategoryFilters = (category: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: [],
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      location: [],
      score: [],
    });
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    onApply(selectedFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium">Filters</h2>
              <p className="text-sm text-gray-600 flex items-center">
                <span className="font-medium text-blue-600 mr-1">{totalAppliedFilters} applied</span>
                {totalAppliedFilters > 0 && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-blue-600 ml-1"
                  >
                    <X size={14} />
                  </button>
                )}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            See results in your view based on the filters you select here.
          </p>
        </div>

        <div className="flex h-96">
          {/* Filter Categories */}
          <div className="w-60 border-r border-gray-200 overflow-y-auto">
            {filterOptions.map(filter => (
              <div
                key={filter.id}
                className={`flex items-center p-3 cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <div className={`mr-3 rounded-md p-1 ${
                  filter.id === 'location' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {filter.id === 'location' ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-medium">{filter.label}</span>
                </div>
                {appliedFiltersCount(filter.id) > 0 && (
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                    {appliedFiltersCount(filter.id)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Filter Options */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{activeFilter === 'location' ? 'Location' : 'Score'}</h3>
                <div className="text-sm text-blue-600">
                  {appliedFiltersCount(activeFilter) > 0 && (
                    <span>
                      {appliedFiltersCount(activeFilter)} applied
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">Select options to filter results</p>
              
              {/* Search input */}
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Options list */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredOptions.map((option) => (
                <div key={option.value} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <input
                    type="checkbox"
                    id={option.value}
                    checked={selectedFilters[activeFilter]?.includes(option.value) || false}
                    onChange={() => handleCheckboxChange(activeFilter, option.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={option.value} className="ml-3 block text-sm font-medium text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;