import React, { useState } from 'react';
import { User } from '@/types/Usertypes';
import { X } from 'lucide-react';

interface EditTeamMemberProps {
  member: User;
  onClose: () => void;
  onSave: (updatedMember: User) => void;
}

const EditTeamMember: React.FC<EditTeamMemberProps> = ({ member, onClose, onSave }) => {
  const [email, setEmail] = useState<string>(member.username || '');
  const [role, setRole] = useState<string>(member.role || 'admin');

  const handleSave = () => {
    const updatedMember = {
      ...member,
      username: email,
      role: role
    };
    onSave(updatedMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center p-4 relative">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-600"
            >
              <path 
                d="M12 4.35418C12.7329 3.52375 13.8053 3 15 3C17.2091 3 19 4.79086 19 7C19 9.20914 17.2091 11 15 11C13.8053 11 12.7329 10.4762 12 9.64582M15 21H3V20C3 16.6863 5.68629 14 9 14C12.3137 14 15 16.6863 15 20V21ZM15 21H21V20C21 16.6863 18.3137 14 15 14C13.9071 14 12.8825 14.2922 12 14.8027M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-4">
          <h2 className="text-lg font-medium">Edit Team Member</h2>
          <p className="text-sm text-gray-500 mb-4">
            Make changes to team member information
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="colleague@company.com"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md appearance-none"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default EditTeamMember;