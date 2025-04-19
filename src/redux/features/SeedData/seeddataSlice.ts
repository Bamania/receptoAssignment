import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, OrgData } from '../../../types/Usertypes';

interface SeedDataState {
  userList: User[];
  orgData: OrgData[];
}

const initialState: SeedDataState = {
  userList: [],
  orgData: [],
};

const seedDataSlice = createSlice({
  name: 'seedData',
  initialState,
  reducers: {
    setSeedData: (state, action: PayloadAction<{ userList: User[]; orgData: OrgData[] }>) => {
      state.userList = action.payload.userList;
      state.orgData = action.payload.orgData;
    },
  },
});

export const { setSeedData } = seedDataSlice.actions;
export default seedDataSlice.reducer;