import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrgData } from '@/types/Usertypes';

interface OrgState {
  currentOrg: OrgData | null;
}

const orginitialdata: OrgState = {
  currentOrg: null,
};

const OrgSlice = createSlice({
  name: 'org',
  initialState :orginitialdata,
  reducers: {
    setOrgData(state, action: PayloadAction<OrgData>) {
      state.currentOrg = action.payload;
    },
    clearOrgData(state) {
      state.currentOrg = null;
    },
    updateOrgData(state, action) {
      const { leadId } = action.payload;
      
      // if (state.currentOrg) {
      //   // Map through the leads and update the specific one
      //   const updatedLeads = state.currentOrg.leads.map(lead => 
      //     lead.id === leadId 
      //       ? { ...lead, contactUnlocked: true } 
      //       : lead
      //   );
        
      //   // Update the state with the modified leads array
      //   state.currentOrg = {
      //     ...state.currentOrg,
      //     leads: updatedLeads
      //   };
      // }
  // state.currentOrg?.leads[leadId].contactUnlocked = true;    

    }
  },
});

export const { setOrgData, clearOrgData,updateOrgData } = OrgSlice.actions;
export default OrgSlice.reducer;

