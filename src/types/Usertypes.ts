// TypeScript interface for user data
export interface User{
    username: any;
    password: string;
    org: string;
    role: string;
    status: string;
    credits?: 100; // optional field
}

export interface Leads {
    id: number; 
    type: "receptonet" | "orgnet";
    name: string;
    location: string;
    credits:number;
    description?: string;
    contactUnlocked: boolean;
    unlockedBy?: string;
    assignedTo?: string;
    likedBy: string[];
    dislikedBy: string[];
    score: number;
    timeAgo: '3 hours ago'
    group: string;
    peopleAssociated: string[]; // usernames who interacted for eg those who liked the lead !
//   not sure i need the two different type to show the associated people with a lead !
    peopleList?: string[];  //all the people who are assigned
    tag?: string;
    createdAt?: string; // ISO date string
  }

export interface OrgData {
   
    orgName: string;
    leads: Leads[]; 
    users: User[];
    stats: {
    liked: number;
    disliked: number;
    assigned: number;
    contacted: number;
    };
    }