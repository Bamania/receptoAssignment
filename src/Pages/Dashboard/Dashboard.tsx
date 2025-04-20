import React, { use, useEffect, useState } from 'react';
import { Search, Filter, ThumbsUp, ThumbsDown, Phone, Building } from 'lucide-react';
import { LeadsList } from './components/LeadItem';
import receptoLogo from "@/assets/receptoLogo.png"
import { useAppSelector } from '@/redux/hooks';
import { unlockLead, updateAssignedCount, updateLikeCount } from '@/redux/features/Org/orgSlice';
import { useDispatch } from 'react-redux';
import { Commonheader } from '../commonheader';
// import { localStorageUtils } from '@/lib/localStorageutils';

const ReceptoDashboard: React.FC = () => {


const loggedUserData=useAppSelector((state)=>state.USER_DATA.user)
// const loggedUserData=localStorageUtils.getCurrentUser()
// const loggedUserOrgData=localStorageUtils.getCurrentOrgData()
const loggedUserOrgData=useAppSelector((state)=>state.ORG_DATA.currentOrg)
// const SeededData=useAppSelector((state)=>state.SEED_DATA)
const dispatch=useDispatch()


const handleUnlock=(lid:number)=>{
  console.log("Unlocking lead with ID:", lid);
  dispatch(unlockLead(lid))
  // console.log("logging updated userr data",loggedUserOrgData)
}

const handleLike=(lid:number)=>{
  console.log("liked the lead " ,lid)
  alert("liked the lead")
  dispatch(updateLikeCount({leadId: lid, username:loggedUserData?.username}))
  
}



  
 

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 bg-white shadow-md flex flex-col border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <img  src={receptoLogo} className="text-blue-600 font-bold text-xl"></img>
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
          <div className="px-4 py-2 flex items-center text-gray-600">
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
          <div className="px-4 py-2 flex items-center text-gray-600">
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
        
        {/* Filter row */}handleUnlock
        <div className="bg-white p-4 flex justify-end items-center">
          <div className="flex items-center border border-gray-200 rounded-lg p-2">
            <Filter className="text-gray-500 w-4 h-4 mr-2" />
            <span className="text-sm">Filters</span>
            <div className="ml-2 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
              2
            </div>
          </div>
        </div>
        
        {/* Leads listing */}
        <div className="flex-1 overflow-y-auto p-4">
         
           
            <LeadsList  handleUnlock={handleUnlock} handleLike={handleLike} leads={loggedUserOrgData?.leads || []} />
      
        </div> 
      </div>
    </div>
  );
};

export default ReceptoDashboard;