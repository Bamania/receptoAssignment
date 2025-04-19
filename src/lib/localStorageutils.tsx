// users->localStorage that stores the user data
// orgData_tesla->local storage that stores the org data


import { User, OrgData } from '../types/Usertypes';

export const localStorageUtils = {
  // gets the current logged in user in localstorage,might need it later
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },
  
  
  // sets the current logged in user ! in local storage
  setCurrentUser: (user: User): void => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },
// fetches the all saved users in the local storage
  getAllUsers: (): User[] | null => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : null;
  },

  // fetches the all organization data
  getOrgData: (): OrgData | null => {
    const orgData = localStorage.getItem("orgData");
    return orgData ? JSON.parse(orgData) : null;
  },
// sets the currentOrg data of the dashboard into local storage !
setCurrentOrgData:(orgdata:OrgData):void=>{
localStorage.setItem("currentOrgdata",JSON.stringify(orgdata))    
  },
  // returns the currentOrgdata of the dashboard
  getCurrentOrgData:():OrgData=>{
   const orgData= localStorage.getItem("currentOrgdata")
   return orgData ? JSON.parse(orgData) : null;    
      }
      
  
  
};