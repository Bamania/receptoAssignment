import { useAppSelector } from "@/redux/hooks"
import { User } from "@/types/Usertypes"
import { Building, Search } from "lucide-react"
import randomProf from "@/assets/pfps/pfp1.png"


export const Commonheader=()=>{
    const loggedUserData=useAppSelector((state)=>state.USER_DATA.user)
    return (
        <>
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="w-40 h-8 bg-gray-100 flex items-center rounded px-2">
              {/* used this as wasnot able to download the company logo given in the figma */}
            <Building />
              <span className="ml-2 text-gray-600">{loggedUserData?.org}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="bg-white border border-gray-300 rounded-lg flex items-center py-2 px-3 w-64">
                <Search className="text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="What is the best tool for XYZ XYZ..." 
                  className="ml-2 outline-none flex-1 text-sm"
                />
                <button className="text-gray-400 hover:text-gray-600">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mx-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
      
             
              <svg width="19" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 23C17.799 23 22.5 18.299 22.5 12.5C22.5 6.701 17.799 2 12 2C6.201 2 1.5 6.701 1.5 12.5C1.5 18.299 6.201 23 12 23Z" fill="#FFCB4B"/>
<path d="M12.1054 21.5266C17.032 21.5266 21.0258 17.5329 21.0258 12.6063C21.0258 7.67968 17.032 3.68591 12.1054 3.68591C7.17883 3.68591 3.18506 7.67968 3.18506 12.6063C3.18506 17.5329 7.17883 21.5266 12.1054 21.5266Z" fill="#E5A33D"/>
<path d="M11.8892 15.6622L7.63176 18.1254C7.61889 18.1148 7.64002 17.8326 7.82752 16.7893C8.58409 13.8311 11.9208 12.9497 13.0951 12.5579C14.3023 12.1551 14.6969 11.1499 14.9108 10.6432C15.1725 10.0133 15.2369 8.79634 16.0523 8.75581C16.5196 8.73258 15.7004 8.42065 15.1841 8.23143C13.9597 7.70471 13.0248 8.75362 11.9124 9.42741C9.82793 10.37 8.96518 9.52171 6.20902 7.46698C8.71815 6.87644 10.1896 6.76759 11.5427 6.61273C13.2342 6.41916 17.8118 6.24097 18.1957 9.58854C18.5028 12.2666 15.9019 13.756 14.5631 14.166C14.7098 14.2116 15.1117 14.5492 15.5456 15.5344C15.9795 16.5196 15.7714 17.6977 15.6131 18.1636L11.8892 15.6622Z" fill="#FFCB4B"/>
<path d="M12.7095 10.3023C12.6179 10.2764 11.6841 10.1713 9.88596 9.98526L7.73655 9.7564C7.03955 9.68122 6.45402 9.62234 6.43658 9.62564C6.39124 9.63422 6.38512 9.62099 6.68951 10.084C7.56827 11.4249 8.70587 12.1675 10.0857 12.3004C11.2008 12.4086 12.4628 12.0144 13.0537 11.3762C13.2696 11.1426 13.3561 11.0084 13.3045 10.7736C13.246 10.5077 12.8875 10.3292 12.7095 10.3023Z" fill="#FFCB4B"/>
<circle cx="14.3421" cy="9.12906" r="0.354607" transform="rotate(-5.3352 14.3421 9.12906)" fill="#FFCB4B"/>
</svg>

              <span>{loggedUserData?.credits} credits</span>
            </div>
            
            <div className="flex items-center">
              <img src={randomProf} className="w-8 h-8 bg-gray-200 rounded-full mr-2">

              </img>
              <div>
                <div className="text-sm font-medium">{loggedUserData?.username}</div>
                <div className="text-xs text-gray-500">{loggedUserData?.role}</div>
              </div>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" className="ml-2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div></>
    )
}