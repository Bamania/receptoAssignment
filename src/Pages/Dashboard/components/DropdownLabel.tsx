import { localStorageUtils } from '@/lib/localStorageutils';
import { useEffect, useState } from 'react';

const AssignMenu = () => {
  const [searchText, setSearchText] = useState('');
  const [users] = useState([
    { id: '1', name: 'Olivia Rhye', isVerified: true },
    { id: '2', name: 'Olivia Rhye' },
    { id: '3', name: 'Olivia Rhye' },
    { id: '4', name: 'Olivia Rhye' },
    { id: '5', name: 'Olivia Rhye' },
    { id: '6', name: 'Olivia Rhye' },
  ]);
useEffect(() => {
localStorageUtils.getAllUsers
},[])


  return (
    <div className="w-full max-w-md bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200">
      {/* Search Bar */}
      <div className="relative p-3 bg-white">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="pl-10 pr-10 py-2 w-full block rounded-md text-sm border border-gray-300"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button onClick={() => setSearchText('')} className="text-gray-400 hover:text-gray-500">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="max-h-96 overflow-y-auto">
        {users.map((user, index) => (
          <div 
            key={user.id}
            className={`flex items-center px-4 py-3 hover:bg-gray-100 ${index !== users.length - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <img 
              src="/api/placeholder/48/48" 
              alt={`${user.name}'s profile`} 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3 flex items-center">
              <span className="text-sm font-medium text-gray-900">{user.name}</span>
              {user.isVerified && (
                <span className="ml-1 bg-blue-100 text-blue-800 rounded-full p-1">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignMenu;