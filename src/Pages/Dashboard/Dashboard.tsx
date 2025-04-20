import React, { use, useEffect, useState, useMemo } from 'react';
import { Search, Filter, ThumbsUp, ThumbsDown, Phone, Building } from 'lucide-react';
import { LeadsList } from './components/LeadItem';
import receptoLogo from "@/assets/receptoLogo.png"
import { useAppSelector } from '@/redux/hooks';
import { unlockLead, updateAssignedCount, updateLikeCount } from '@/redux/features/Org/orgSlice';
import { useDispatch } from 'react-redux';
import { Commonheader } from '../commonheader';
import FilterModal from './components/FilterModal';
import { Leads } from '@/types/Usertypes';

const ReceptoDashboard: React.FC = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({
    location: [],
    score: []
  });

  // Count total applied filters
  const totalAppliedFilters = Object.values(appliedFilters).reduce(
    (count, filters) => count + filters.length, 
    0
  );

  const loggedUserData = useAppSelector((state) => state.USER_DATA.user);
  const loggedUserOrgData = useAppSelector((state) => state.ORG_DATA.currentOrg);
  const dispatch = useDispatch();

  
  const filteredLeads = useMemo(() => {
    if (!loggedUserOrgData?.leads) return [];
    
    // If no filters are applied, show all leads
    if (totalAppliedFilters === 0) {
      return loggedUserOrgData.leads;
    }
    
    return loggedUserOrgData.leads.filter(lead => {
      // Filter by location
      const locationFilters = appliedFilters.location;
      if (locationFilters.length > 0) {
        // Map location filter values to actual location strings to check against
        const locationMap: Record<string, string> = {
          'india': 'India',
          'united_kingdom': 'United Kingdom',
          
        };
        
        // Check if lead location matches any of the selected locations
        const matchesLocation = locationFilters.some(filter => 
          lead.location.includes(locationMap[filter] || filter)
        );
        
        if (!matchesLocation) return false;
      }
      
      // Filter by score
      const scoreFilters = appliedFilters.score;
      if (scoreFilters.length > 0) {
        let matchesScore = false;
        
        for (const scoreRange of scoreFilters) {
          const [min, max] = scoreRange.split('-').map(Number);
          if (lead.score >= min && lead.score <= max) {
            matchesScore = true;
            break;
          }
        }
        
        if (!matchesScore) return false;
      }
      
      // If all filters pass, include this lead
      return true;
    });
  }, [loggedUserOrgData?.leads, appliedFilters, totalAppliedFilters]);

  const handleUnlock = (lid: number) => {
    console.log("Unlocking lead with ID:", lid);
    dispatch(unlockLead(lid));
  };

  const handleLike = (lid: number) => {
    console.log("liked the lead ", lid);
    dispatch(updateLikeCount({ leadId: lid, username: loggedUserData?.username }));
  };

  const handleApplyFilters = (filters: Record<string, string[]>) => {
    setAppliedFilters(filters);
    console.log("Applied filters:", filters);
  };

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 bg-white shadow-md flex flex-col border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <img src={receptoLogo} className="text-blue-600 font-bold text-xl" alt="Recepto Logo" />
        </div>
        
        {/* Main navigation */}
        <div className="py-4">
          <div className="px-4 py-2 text-gray-500 text-sm font-medium">MAIN</div>
          <div className="px-4 py-2 flex items-center text-blue-600 bg-blue-50 rounded-r-lg">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                <circle cx="12" cy="12" r="10" />
                <polyline points="8 12 12 16 16 12" />
                <line x1="12" y1="8" x2="12" y2="16" />
              </svg>
            </div>
            <span>Leads</span>
          </div>
          <div className="px-4 py-2 flex items-center text-gray-600 cursor-pointer">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span onClick={() => window.location.href = '/Analytics'}>Analytics</span>
          </div>
        </div>
        
        {/* More section */}
        <div className="">
          <div className="px-4 py-2 text-gray-500 text-sm font-medium">MORE</div>
          <div className="px-4 py-2 flex items-center text-gray-600 cursor-pointer">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
            <span>Logout</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <Commonheader />
        
        {/* Filter row */}
        <div className="bg-white p-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {totalAppliedFilters > 0 ? (
              <span>Showing {filteredLeads.length} filtered results</span>
            ) : (
              <span>Showing all {loggedUserOrgData?.leads?.length || 0} leads</span>
            )}
          </div>
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center border border-gray-200 rounded-lg p-2"
          >
            <Filter className="text-gray-500 w-4 h-4 mr-2" />
            <span className="text-sm">Filters</span>
            {totalAppliedFilters > 0 && (
              <div className="ml-2 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {totalAppliedFilters}
              </div>
            )}
          </button>
        </div>
        
        {/* Leads listing */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredLeads.length > 0 ? (
            <LeadsList 
              handleUnlock={handleUnlock} 
              handleLike={handleLike} 
              leads={filteredLeads} 
            />
          ) : (
            <div className="text-center py-10">
              <div className="text-gray-400 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No matching leads</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters to find what you're looking for.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setAppliedFilters({ location: [], score: [] })}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div> 
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <FilterModal 
          onClose={() => setIsFilterModalOpen(false)} 
          onApply={handleApplyFilters}
          initialFilters={appliedFilters}
        />
      )}
    </div>
  );
};

export default ReceptoDashboard;