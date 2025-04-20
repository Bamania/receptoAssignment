import { use, useState } from "react";
import {
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FacebookIcon,
  Home,
  LogOut,
  MoreVertical,
  PieChart,
  Search,
  ThumbsUp,
  TowerControl,
  Users,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import receptoLogo from "@/assets/receptoLogo.png";
import { localStorageUtils } from "@/lib/localStorageutils";
import { User } from "@/types/Usertypes";
import randomProfile from "@/assets/pfps/pfp2.png";
import { Commonheader } from "../commonheader";
import { LeadChart } from "./Component/LeadChart";
import EditTeamMember from "./Component/EditTeamMember";
import { useDispatch } from "react-redux";

export default function Analytics() {
  const loggedUserData = useAppSelector((state) => state.USER_DATA.user);
  const userRole = useAppSelector((state) => state.USER_DATA.user?.role);
  const AllLeads = useAppSelector((state) => state.ORG_DATA.currentOrg?.leads);
  const teamMates = localStorageUtils.getCurrentOrgData().users;
  const dispatch = useDispatch();

  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (userRole && userRole !== "admin") {
    return "you are not admin so fuck off";
  }

  const countLeadsByType = (type: string, property: 'likedBy' | 'peopleList') => {
    return AllLeads?.reduce((total, item) => {
      if (item.type === type) {
        return total + (item[property]?.length || 0);
      }
      return total;
    }, 0) || 0;
  };

  const receptoleadCount = countLeadsByType('receptonet', 'likedBy');
  const orgnetleadCount = countLeadsByType('orgnet', 'likedBy');
  const receptoAssignedCount = countLeadsByType('receptonet', 'peopleList');
  const orgnetAssignedCount = countLeadsByType('orgnet', 'peopleList');

  const handleEditClick = (member: User) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleSaveMember = (updatedMember: User) => {
    // Here you would typically dispatch an action to update the user in your state
    console.log("Saving updated member:", updatedMember);
    
    // Example of how you might update the user in your Redux store:
    // dispatch(updateTeamMember(updatedMember));
    
    // Also update in localStorage
    const allUsers = localStorageUtils.getAllUsers();
    if (allUsers) {
      const updatedUsers = allUsers.map(user => 
        user.username === updatedMember.username ? updatedMember : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    
    // Close the modal
    setIsEditModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 bg-white shadow-md flex flex-col border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <img src={receptoLogo} className="text-blue-600 font-bold text-xl" alt="Recepto Logo" />
        </div>
        
        {/* Main navigation */}
        <div className="py-4">
          <div className="px-4 py-2 text-gray-500 text-sm font-medium">MAIN</div>
          <div className="px-4 py-2 flex items-center rounded-r-lg cursor-pointer">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                <circle cx="12" cy="12" r="10" />
                <polyline points="8 12 12 16 16 12" />
                <line x1="12" y1="8" x2="12" y2="16" />
              </svg>
            </div>
            <span onClick={() => window.location.href = '/Dashboard'}>Leads</span>
          </div>
          <div className="px-4 py-2 flex items-center bg-blue-50 text-blue-600">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span>Analytics</span>
          </div>
        </div>
        
        {/* More section */}
        <div className="">
          <div className="px-4 py-2 text-gray-500 text-sm font-medium">MORE</div>
          <div className="px-4 py-2 flex items-center text-gray-600 cursor-pointer">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
            <span onClick={() => window.location.href = '/'}>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Commonheader />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* ReceptoNet Leads Section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-lg shadow p-4 grid grid-cols-3 gap-4">
                <div className="col-span-1 flex flex-col">
                  <div className="flex flex-col items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                      <TowerControl />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">ReceptoNet Leads</span>
                        <div className="ml-2 text-gray-400 rounded-full border border-gray-300 h-5 w-5 flex items-center justify-center text-xs">
                          i
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-3xl font-bold">404</span>
                        <span className="text-gray-500 ml-2">Total</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-blue-100 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>

                  <div className="flex justify-between w-full text-xs">
                    <div className="flex items-center">
                      <div className="h-1 w-3 bg-blue-600 rounded-sm mr-1"></div> 
                      <div>
                        <div>Unlocked</div> 
                        <div className="font-medium">179 users</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1 w-3 bg-blue-100 rounded-sm mr-1 border border-blue-200"></div>
                      <div>
                        <div>Yet to Unlock</div>
                        <div className="font-medium">394 users</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 relative">
                  {/* <div className="h-full flex items-end">
                    <div className="w-full h-48 bg-blue-50 rounded-md relative overflow-hidden">
                      <div
                        className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-blue-300 to-blue-100"
                        style={{
                          clipPath:
                            "polygon(0% 90%, 15% 80%, 30% 85%, 45% 70%, 60% 75%, 75% 55%, 90% 60%, 100% 50%, 100% 100%, 0% 100%)",
                        }}
                      ></div>
                      <div className="absolute top-1/4 right-1/4 transform -translate-y-1/2 flex flex-col items-center">
                        <div className="bg-white px-1.5 py-0.5 rounded shadow text-blue-600 text-xs font-medium border border-blue-200">
                          394
                        </div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full border-2 border-white absolute -bottom-1"></div>
                      </div>
                      <div className="absolute top-1/4 right-1/4 h-3/4 w-px bg-blue-300"></div>
                      
                      <div className="absolute bottom-1 w-full flex justify-between text-xs text-gray-500 px-2">
                        <span>Jan</span>
                        <span>Mar</span>
                        <span>May</span>
                      </div>
                      <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 py-2">
                        <span>400</span>
                        <span>300</span>
                        <span>200</span>
                      </div>
                    </div>
                  </div> */}
                  <LeadChart />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between aspect-square">
                  <div className="flex flex-col items-start justify-start mb-2">
                    <div className="bg-blue-100 p-1 rounded-md mr-2 gap-5">
                      <ThumbsUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Liked Leads</span>
                    <div className="text-2xl font-bold">{receptoleadCount}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between aspect-square">
                  <div className="flex flex-col items-start justify-start mb-2">
                    <div className="bg-green-100 p-1 rounded-md mr-2">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm">Assigned Leads</span>
                    <div className="text-2xl font-bold">{receptoAssignedCount}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Org Network Leads Section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-lg shadow p-4 grid grid-cols-3 gap-4">
                <div className="col-span-1 flex flex-col">
                  <div className="flex flex-col items-start mb-4">
                    <div className="bg-orange-100 p-2 rounded-md mr-3">
                      <FacebookIcon className="text-orange-600" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">Org Network Leads</span>
                        <div className="ml-2 text-gray-400 rounded-full border border-gray-300 h-5 w-5 flex items-center justify-center text-xs">
                          i
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-3xl font-bold">594</span>
                        <span className="text-gray-500 ml-2">Total</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-yellow-100 rounded-full h-2 mb-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-between w-full text-xs">
                    <div className="flex items-center">
                      <div className="h-1 w-3 bg-yellow-700 rounded-sm mr-1"></div>
                      <div>
                        <div>Contacted</div>
                        <div className="font-medium">179 users</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1 w-3 bg-orange-100 rounded-sm mr-1 border border-orange-200"></div>
                      <div>
                        <div>Yet to Contact</div>
                        <div className="font-medium">394 users</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 relative">
                  <div className="h-full flex items-end">
                    <div className="w-full h-full bg-white rounded-lg shadow-lg p-4">
                      <LeadChart />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between aspect-square">
                  <div className="flex flex-col items-start justify-start mb-2">
                    <div className="bg-orange-100 p-3 rounded-md mr-2 ">
                      <ThumbsUp className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-sm">Liked Leads</span>
                    <div className="text-2xl font-bold">{orgnetleadCount}</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-between aspect-square">
                  <div className="flex flex-col items-start justify-start mb-2">
                    <div className="bg-green-100 p-1 rounded-md mr-2">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm">Assigned Leads</span>
                    <div className="text-2xl font-bold">{orgnetAssignedCount}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-6">
                <div className="col-span-2 font-medium text-gray-500">Team</div>
                <div className="font-medium text-gray-500 flex items-center">
                  Role
                  <div className="ml-1 text-gray-400 rounded-full border border-gray-300 h-5 w-5 flex items-center justify-center text-xs">
                    i
                  </div>
                </div>
                <div className="font-medium text-gray-500 flex items-center">
                  Generated
                  <div className="ml-1 text-gray-400 rounded-full border border-gray-300 h-5 w-5 flex items-center justify-center text-xs">
                    i
                  </div>
                </div>
                <div className="font-medium text-gray-500 flex items-center">
                  Unlocked
                  <div className="ml-1 text-gray-400 rounded-full border border-gray-300 h-5 w-5 flex items-center justify-center text-xs">
                    i
                  </div>
                </div>
                <div className="font-medium text-gray-500 flex items-center">
                  Assigned
                  <div className="ml-1 text-gray-400 rounded-full border border-gray-300 h-5 w-5 flex items-center justify-center text-xs">
                    i
                  </div>
                </div>
              </div>

              {/* Team Members List */}
              {teamMates && teamMates.map((member: User, index: number) => (
                <div key={index} className="px-6 py-4 grid grid-cols-6 items-center border-b border-gray-100">
                  <div className="col-span-2 flex items-center">
                    <div className="h-10 w-10 bg-gray-300 rounded-full mr-3 relative">
                      <div className="rounded-full bg-gray-300 flex items-center justify-center">
                        <img src={randomProfile} className="text-gray-600 h-10 w-10" alt="Profile" />
                      </div>
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="font-medium">{member.username || "Olivia Rhye"}</div>
                      <div className="text-xs text-gray-500">Last active 2min ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`px-2 py-1 rounded-md text-xs font-medium flex items-center ${
                      member.role === "admin" ? "bg-blue-50 text-blue-600" : 
                      member.role === "removed" ? "bg-red-50 text-red-600" : 
                      "bg-gray-100 text-gray-600"
                    }`}>
                      <span className="mr-1">★</span>
                      {member.role || (index % 3 === 0 ? "Admin" : index % 3 === 1 ? "Removed" : "Member")}
                    </div>
                  </div>
                  
                  <div className="text-gray-900 font-medium">
                    {index === 0 ? "123" : index === 1 ? "23" : index === 2 ? "56" : index === 3 ? "12" : "123"}
                  </div>
                  
                  <div className="text-gray-900 font-medium">
                    {index === 0 ? "123" : index === 1 ? "23" : index === 2 ? "56" : index === 3 ? "12" : "123"}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                      index === 0 ? "bg-orange-100 text-orange-600" : 
                      index === 1 ? "bg-blue-100 text-blue-600" : 
                      index === 2 ? "bg-green-100 text-green-600" : 
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {index === 0 ? "40" : index === 1 ? "25" : index === 2 ? "15" : index === 3 ? "10" : "5"}
                    </div>
                    <button 
                      onClick={() => handleEditClick(member)}
                      className="focus:outline-none"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <button className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {[1, 2, "...", 6, 7].map((page, index) => (
                  <button
                    key={index}
                    className={`h-8 w-8 flex items-center justify-center rounded-md ${
                      currentPage === page ? "bg-gray-100" : ""
                    }`}
                    onClick={() =>
                      typeof page === "number" && setCurrentPage(page)
                    }
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Team Member Modal */}
      {isEditModalOpen && selectedMember && (
        <EditTeamMember
          member={selectedMember}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedMember(null);
          }}
          onSave={handleSaveMember}
        />
      )}
    </div>
  );
}