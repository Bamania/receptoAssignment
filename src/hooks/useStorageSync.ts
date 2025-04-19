import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrgData } from '@/redux/features/Org/orgSlice';
import { OrgData } from '@/types/Usertypes';
import { localStorageUtils } from '@/lib/localStorageutils';


export const useStorageSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      // Only handle "currentOrgdata" changes
      if (e.key === 'currentOrgdata' && e.newValue) {
        try {
          // Parse the new data and update Redux store
          console.log("new storage vent",e)
          const newOrgData: OrgData = JSON.parse(e.newValue);
          localStorageUtils.setCurrentOrgData(newOrgData);
          // dispatch(setOrgData(newOrgData));
          console.log('Cross-tab sync: Updated org data from another tab');
        } catch (error) {
          console.error('Error parsing cross-tab storage data:', error);
        }
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);
}; 