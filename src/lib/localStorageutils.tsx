// users->localStorage that stores the user data
// orgData_tesla->local storage that stores the org data


import { User, OrgData } from '../types/Usertypes';

export const localStorageUtils = {

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },
  
  
  setCurrentUser: (user: User): void => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  getAllUsers: (): User[] | null => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : null;
  },

  getOrgData: (): OrgData | null => {
    const orgData = localStorage.getItem("orgData_tesla");
    return orgData ? JSON.parse(orgData) : null;
  },
  
  
};