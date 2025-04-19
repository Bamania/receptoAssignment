import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/Usertypes';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // set the current log in user in the redux storage
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export default UserSlice.reducer;