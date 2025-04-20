import { useEffect } from 'react';
import './App.css'
import { Login } from './Pages/Login/Login'
import { OrgData, User } from './types/Usertypes';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReceptoDashboard from './Pages/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { setSeedData } from './redux/features/SeedData/seeddataSlice';
import { useStorageSync } from './hooks/useStorageSync';
import Analytics from './Pages/Analytics';
import { LeadChart } from './Pages/Analytics/Component/LeadChart';

function App() {
  const dispatch=useDispatch();
  
  // Initialize cross-tab synchronization
  // useStorageSync();
  
  //  Seed the meta data here only i.e store it in the local storage!
  useEffect(() => {
    // Only seed if no users already exist
    const users = localStorage.getItem("users");
    if (!users) {
      const userList: User[] = [
        {
          username: "john",
          password: "1234",
          org: "ketamind",
          role: "admin",
          status: "active",
          credits:100
        },
        {
          username: "kkPant",
          password: "1234",
          org: "ketamind",
          role: "sales",
          status: "active",
          credits:100
        },
        {
          username: "maurya",
          password: "1234",
          org: "tesla",
          role: "sales",
          status: "active",
          credits:100
        },
        {
          username: "navani",
          password: "1234",
          org: "ketamind",
          role: "sales",
          status: "active",
          credits:100
        },
        {
          username: "elon",
          password: "1234",
          org: "tesla",
          role: "manager",
          status: "active",
          credits:100
        }
      ];

      const orgData: OrgData[] = [
        {
        
        orgName: "tesla",
        leads: [
          {
            id: 0,
            type: "receptonet",
            name: "Lead 1-tesla",
            location: "Haridwar,India",
            credits: 100,
            description: "This is a description for lead 1",
            contactUnlocked: false,
            timeAgo: "3 hours ago",
            tag: "tag1",
            score: 90,
            unlockedBy: "",
            assignedTo: "",
            likedBy: [],
            dislikedBy: [],
            peopleAssociated: [],
            group: "Random group name 1",
            peopleList: [],

            createdAt: new Date().toISOString()
          },
          {
            id: 1,
            type: "receptonet",
            name: "Lead 2-tesla",
            location: "Mussorie,India",
            credits: 100,
            description: "This is a description for lead 2",
            contactUnlocked: false,
            timeAgo: "3 hours ago",
            tag: "tag1",
            score: 74,
            unlockedBy: "",
            assignedTo: "",
            likedBy: [],
            dislikedBy: [],
            peopleAssociated: [],
            group: "Random Group Name 2",
            peopleList: [],
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            type: "orgnet",
            name: "Lead 3-tesla",
            location: "Chopta,India",
            credits: 70,
            description: "This is a description for lead 3",
            timeAgo: "3 hours ago",
            tag: "tag1",
            score: 100,
            contactUnlocked: true,
            unlockedBy: "",
            assignedTo: "",
            likedBy: [],
            dislikedBy: [],
            peopleAssociated: ["", ""],
            group: "Random Group Name 3",
            peopleList: ["john", "elon"],
            createdAt: new Date().toISOString()
          }
        ],
        users: userList.filter((user)=>user.org=="tesla"),
        stats: {
          liked: 0,
          disliked: 0,
          assigned: 0,
          contacted: 0
        }
      },
      {
        
        orgName: "ketamind",
        leads: [
          {
            id: 0,
            type: "orgnet",
            name: "Lead 1-ketamind",
            location: "Haridwar,United Kingdom",
            credits: 100,
            description: "This is a description for lead 1",
            contactUnlocked: false,
            timeAgo: "3 hours ago",
            tag: "tag1",
            score: 80,
            unlockedBy: "",
            assignedTo: "",
            likedBy: [],
            dislikedBy: [],
            peopleAssociated: ["", ""],
            group: "Random group name 1",
            peopleList: [],

            createdAt: new Date().toISOString()
          },
          {
            id: 1,
            type: "receptonet",
            name: "Lead 2-ketamind",
            location: "Mussorie,India",
            credits: 100,
            description: "This is a description for lead 2",
            contactUnlocked: false,
            timeAgo: "3 hours ago",
            tag: "tag1",
            score: 100,
            unlockedBy: "",
            assignedTo: "",
            likedBy: [],
            dislikedBy: [],
            peopleAssociated: ["", ""],
            group: "Random Group Name 2",
            peopleList: [],
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            type: "orgnet",
            name: "Lead 3-ketamind",
            location: "Chopta,India",
            credits: 70,
            description: "This is a description for lead 3",
            timeAgo: "3 hours ago",
            tag: "tag1",
            score: 99,
            contactUnlocked: true,
            unlockedBy: "",
            assignedTo: "",
            likedBy: [],
            dislikedBy: [],
            peopleAssociated: ["", ""],
            group: "Random Group Name 3",
            peopleList: [],
            createdAt: new Date().toISOString()
          }
        ],
        users: userList.filter((user)=>user.org=="ketamind"),
        stats: {
          liked: 0,
          disliked: 0,
          assigned: 0,
          contacted: 0
        }
      }]

      localStorage.setItem("users", JSON.stringify(userList));
      localStorage.setItem("orgData", JSON.stringify(orgData));

      // also update the redux state !
      dispatch(setSeedData({ userList, orgData }));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ReceptoDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/chart" element={<LeadChart/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
