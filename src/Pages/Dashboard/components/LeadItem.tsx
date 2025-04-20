import { Leads } from "@/types/Usertypes";
import { ThumbsDown, ThumbsUp, Clock } from "lucide-react";
import email from "@/assets/icons/email.png";
import ranProfile from "@/assets/pfps/pfp1.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AssignMenu from "./DropdownLabel";
import { updateAssignedCount } from "@/redux/features/Org/orgSlice";
import { useDispatch } from "react-redux";

interface LeadsListProps {
  leads: Leads[];
  handleUnlock: (leadId: number) => void;
  handleLike: (leadId: number) => void;
}

export const LeadsList: React.FC<LeadsListProps> = ({ leads, handleUnlock, handleLike }) => {
  const dispatch = useDispatch();
  
  const handleAssign = (lid: number, username: string) => {
    console.log("assigned username", username, "to lead id", lid);
    dispatch(updateAssignedCount({ leadId: lid, username: username }));
  };
  
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {Object.values(leads).map((lead) => (
        <div key={lead.id} className="bg-white rounded-lg mb-4 border border-gray-200 overflow-hidden">
          <div className={`border-l-4 ${lead.contactUnlocked ? 'border-blue-500' : 'border-blue-500'} p-4`}>
            {/* Header with name, network type and location */}
            <div className="flex justify-between">
              <div className="flex">
                {lead.contactUnlocked ? (
                  <div>
                    <img src={ranProfile} alt="Profile" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3"/>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                )}
                
                <div>
                  <div className="font-medium">Jennifer Markus</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" className="mr-1">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Mumbai, India
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 justify-center items-center">
                {Array.isArray(lead.peopleList) && lead.peopleList?.length > 0 && (
                  <div className="px-5 flex py-1 bg-gray-100 rounded gap-2 items-center">
                    <img src={ranProfile} className="w-5 rounded-full h-5" alt="" />
                    <span className="text-xs text-gray-500">assigned</span>
                  </div>
                )}

                {!lead.contactUnlocked ? (
                  <button 
                    onClick={() => handleUnlock(lead.id)} 
                    style={{ backgroundColor: '#2859DF' }}
                    className="text-white flex items-center justify-center gap-2 px-3 py-1 rounded-lg text-sm mr-2"
                  >
                    <img src={email} alt="" />
                    Unlock
                    <svg width="19" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 23C17.799 23 22.5 18.299 22.5 12.5C22.5 6.701 17.799 2 12 2C6.201 2 1.5 6.701 1.5 12.5C1.5 18.299 6.201 23 12 23Z" fill="#FFCB4B"/>
                      <path d="M12.1054 21.5266C17.032 21.5266 21.0258 17.5329 21.0258 12.6063C21.0258 7.67968 17.032 3.68591 12.1054 3.68591C7.17883 3.68591 3.18506 7.67968 3.18506 12.6063C3.18506 17.5329 7.17883 21.5266 12.1054 21.5266Z" fill="#E5A33D"/>
                      <path d="M11.8892 15.6622L7.63176 18.1254C7.61889 18.1148 7.64002 17.8326 7.82752 16.7893C8.58409 13.8311 11.9208 12.9497 13.0951 12.5579C14.3023 12.1551 14.6969 11.1499 14.9108 10.6432C15.1725 10.0133 15.2369 8.79634 16.0523 8.75581C16.5196 8.73258 15.7004 8.42065 15.1841 8.23143C13.9597 7.70471 13.0248 8.75362 11.9124 9.42741C9.82793 10.37 8.96518 9.52171 6.20902 7.46698C8.71815 6.87644 10.1896 6.76759 11.5427 6.61273C13.2342 6.41916 17.8118 6.24097 18.1957 9.58854C18.5028 12.2666 15.9019 13.756 14.5631 14.166C14.7098 14.2116 15.1117 14.5492 15.5456 15.5344C15.9795 16.5196 15.7714 17.6977 15.6131 18.1636L11.8892 15.6622Z" fill="#FFCB4B"/>
                      <path d="M12.7095 10.3023C12.6179 10.2764 11.6841 10.1713 9.88596 9.98526L7.73655 9.7564C7.03955 9.68122 6.45402 9.62234 6.43658 9.62564C6.39124 9.63422 6.38512 9.62099 6.68951 10.084C7.56827 11.4249 8.70587 12.1675 10.0857 12.3004C11.2008 12.4086 12.4628 12.0144 13.0537 11.3762C13.2696 11.1426 13.3561 11.0084 13.3045 10.7736C13.246 10.5077 12.8875 10.3292 12.7095 10.3023Z" fill="#FFCB4B"/>
                      <circle cx="14.3421" cy="9.12906" r="0.354607" transform="rotate(-5.3352 14.3421 9.12906)" fill="#FFCB4B"/>
                    </svg>
                    <span className="ml-1">
                      3
                    </span>
                  </button>
                ) : (
                  <>
                    {Array.isArray(lead.peopleList) && (lead.peopleList.length === 0) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="border w-40 border-yellow-500 text-yellow-500 px-3 py-1 rounded-lg text-sm mr-2">
                          Assign
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <AssignMenu handleAssign={handleAssign} leadId={lead.id} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    <button className="border w-40 border-yellow-500 text-yellow-500 px-3 py-1 rounded-lg text-sm mr-2">
                      View Details
                    </button>
                  </>
                )}
                
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium bg-green-500 text-white`}>
                  74
                </div>
                
                <div className="ml-2 flex">
                  <button onClick={() => handleLike(lead.id)} className="text-blue-600 mr-1">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400">
                    <ThumbsDown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Lead description */}
            <div className="mt-2 text-sm text-gray-700">
              A team from *company name mentioned* is seeking a highly motivated Business Development Executive to outreach and secure bo...
            </div>
            
            {/* Footer info */}
            <div className="mt-2 flex items-center">
              <div className="flex items-center text-sm text-gray-500 mr-4">
                <Clock className="w-4 h-4 mr-1" />
                <span>Today</span>
              </div>
              
              <div className="flex items-center text-sm text-green-500 mr-4">
              <div className="px-5 flex py-1 bg-gray-100 rounded gap-2 items-center">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                  </svg>
                <span>Group name</span>
                </div>
              </div>
              
              <div className="flex ml-4">
                
                <span className="text-xs text-gray-600 ml-2">{lead.type}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};