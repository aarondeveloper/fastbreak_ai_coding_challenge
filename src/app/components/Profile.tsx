'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="flex items-center space-x-4">
        {user.picture && (
          <img 
            src={user.picture} 
            alt={user.name || 'Profile'} 
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    )
  );
} 