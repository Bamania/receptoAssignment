import { combineReducers } from 'redux'
import orgReducer from '../features/Org/orgSlice'
import userReducer from '../features/user/userSlice'
import seedDataSlice from '../features/SeedData/seeddataSlice'
const rootReducer = combineReducers({
  ORG_DATA: orgReducer,
  USER_DATA: userReducer,
  SEED_DATA:seedDataSlice
})

export default rootReducer;
