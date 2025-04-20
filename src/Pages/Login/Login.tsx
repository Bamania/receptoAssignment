import { localStorageUtils } from "@/lib/localStorageutils";
import { setOrgData } from "@/redux/features/Org/orgSlice";
import { setUser } from "@/redux/features/user/userSlice";
import { User } from "@/types/Usertypes";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"

export const Login = () => {
    const navigate=useNavigate();
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
    org: "",
    role: "" ,
    status: "active",
    credits:100
  });
const dispatch = useDispatch();  


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    console.log("Button clicked");
    const allUsers=localStorageUtils.getAllUsers()
    const allOrgsData=localStorageUtils.getOrgData()
    if(userData.org !== "ketamind" && userData.org !== "tesla") {
      // This will only be true if org is neither "ketamind" nor "tesla"
      alert("Invalid organization! Please enter either 'ketamind' or 'tesla'");
      return;
    }


    if(allUsers?.filter((user)=>{user.username===userData.username && user.password===userData.password})){
        // compare it with the local users and if user is true  continue
        // set the current logged in user data ! 
        dispatch(setUser(userData))
          // localStorageUtils.setCurrentUser(userData);      
        if  (allOrgsData && Array.isArray(allOrgsData)) {
        const requiredOrgs=allOrgsData.find((reqOrgData:any)=>reqOrgData.orgName===userData?.org)
        
      
        
        //  only do if its empty for the first logger ! and if the current org data is same as the current user org data
        // otherwise it would be the case for the user from diff org
        const data=localStorageUtils.getCurrentOrgData();
        if(!data ||userData.org!=data.orgName ){
           localStorageUtils.setCurrentOrgData(requiredOrgs);
           dispatch(setOrgData(requiredOrgs))
        }
        
         }
       
        navigate("/Dashboard")
        
    }else {
        alert("Invalid credentials")
    }

  };

  return (
    <div className="bg-black text-white flex h-full w-full flex-col items-center pt-16 sm:justify-center sm:pt-0">
     <div className="bg-white p-1 rounded-lg shadow-md max-w-3xl mx-auto ">
  <h1 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Important ReadMe: Organizations - Ketamind & Tesla</h1>
  
  <div className="space-y-4">
    <p className="font-medium text-gray-700">Login credentials for testing:</p>
    
    <div className="bg-blue-50 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-blue-800 mb-2">Ketamind Organization</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-gray-800">Admin: <span className="font-mono bg-gray-100 px-1 rounded">username: john</span>, <span className="font-mono bg-gray-100 px-1 rounded">password: 1234</span>, <span className="font-mono bg-gray-100 px-1 rounded">role: admin</span></li>
        <li className="text-gray-800">Sales: <span className="font-mono bg-gray-100 px-1 rounded">username: maurya</span>, <span className="font-mono bg-gray-100 px-1 rounded">password: 1234</span>, <span className="font-mono bg-gray-100 px-1 rounded">role: sales</span></li>
      </ul>
    </div>
    
    <div className="bg-green-50 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-green-800 mb-2">Tesla Organization</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-gray-800">Admin: <span className="font-mono bg-gray-100 px-1 rounded">username: elon</span>, <span className="font-mono bg-gray-100 px-1 rounded">password: 1234</span>, <span className="font-mono bg-gray-100 px-1 rounded">role: admin</span></li>
        <li className="text-gray-800">Sales: <span className="font-mono bg-gray-100 px-1 rounded">username: kkpant</span>, <span className="font-mono bg-gray-100 px-1 rounded">password: 1234</span>, <span className="font-mono bg-gray-100 px-1 rounded">role: sales</span></li>
      </ul>
    </div>
    
    <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
      <p className="text-gray-800"><span className="font-semibold">Important note:</span> Please use the 2nd member from each organization to check data persistence in the <span className="font-semibold">SAME TAB</span>. Unfortunately, cross-tab session persistence is not working yet, but data is fully persisted in the same tab as mentioned in the Figma documentation.lmk if theres any issue or change you guys want ,Thanks !</p>
    </div>
  </div>
</div>

      <a href="#">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
              />
            </svg>
          </div>
          Sasta recepto Login
        </div>
      </a>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Login
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form >
              <div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Username
                      </label>
                      <div className="absolute right-3 translate-y-2 text-green-200">
                
                      </div>
                    </div>
                    <input
                      type="text"
                      onChange={(e) => {
                        setUserData({ ...userData, username: e.target.value });
                      }}
                      name="username"
                      placeholder="Username"
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Password
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="password"
                        onChange={(e) => {
                          setUserData({ ...userData, password: e.target.value });
                        }}
                        name="password"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Role-sales/admin
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="text"
                        onChange={(e) => {
                          setUserData({ ...userData, role: e.target.value });
                        }}
                        name="admin"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Organization-ketamind/tesla
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="TEXT"
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            org: e.target.value
                          });
                        }}
                        name="password"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    className="outline-none focus:outline focus:outline-sky-300"
                  />
                  <span className="text-xs">Remember me</span>
                </label>
                <a
                  className="text-sm font-medium text-foreground underline"
                  href="/forgot-password"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <a
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                  href="/register"
                >
                  Register
                </a>
                <button
                  onClick={handleClick}
                  className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
