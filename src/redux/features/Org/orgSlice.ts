import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrgData } from "@/types/Usertypes";
import { localStorageUtils } from "@/lib/localStorageutils";

interface OrgState {
  currentOrg: OrgData | null;
}

const orginitialdata: OrgState = {
  currentOrg: null,
};

const OrgSlice = createSlice({
  name: "org",
  initialState: orginitialdata,
  reducers: {
    setOrgData(state, action: PayloadAction<OrgData>) {
      state.currentOrg = action.payload;
      // Save to localStorage whenever the org data is set
      // if (action.payload) 
      //   localStorageUtils.setCurrentOrgData(action.payload);
      // }
    },
    clearOrgData(state) {
      state.currentOrg = null;
    },
    unlockLead(state, action) {
      const leadId = action.payload;

      // since currentOrg might be null implement if statement
      if (state.currentOrg) {
        const lead = state.currentOrg.leads.filter((lead) => lead.id === leadId);
        if (lead) {
          lead[0].contactUnlocked = true;
        }
        
        // Save the updated org data to localStorage ,add event listener somehow to update the state !
        localStorageUtils.setCurrentOrgData(state.currentOrg);
      }
    },
    updateAssignedCount(state, action) {
      const {leadId, username} = action.payload;

      // since currentOrg might be null implement if statement
      if (state.currentOrg) {
        const leadIndex = state.currentOrg.leads.findIndex((lead) => lead.id === leadId);
        if (leadIndex !== -1) {
          // Initialize likedBy array if it doesn't exist
          if (!state.currentOrg.leads[leadIndex].peopleList) {
            state.currentOrg.leads[leadIndex].peopleList = [];
          }
          
          // Add username to likedBy array
          state.currentOrg.leads[leadIndex].peopleList?.push(username);
        }
        
        // Save the updated org data to localStorage 
        
      }
    },
    updateLikeCount(state, action) {
      const {leadId, username} = action.payload;

      // since currentOrg might be null implement if statement
      if (state.currentOrg) {
        const leadIndex = state.currentOrg.leads.findIndex((lead) => lead.id === leadId);
        if (leadIndex !== -1) {
          // Initialize likedBy array if it doesn't exist
          if (!state.currentOrg.leads[leadIndex].likedBy) {
            state.currentOrg.leads[leadIndex].likedBy = [];
          }
          
          // Add username to likedBy array
          state.currentOrg.leads[leadIndex].likedBy.push(username);
        }
        
        // Save the updated org data to localStorage
        // localStorageUtils.setCurrentOrgData(state.currentOrg);
      }
    },
  },
});

export const { setOrgData, clearOrgData, unlockLead,updateLikeCount ,updateAssignedCount} = OrgSlice.actions;
export default OrgSlice.reducer;
