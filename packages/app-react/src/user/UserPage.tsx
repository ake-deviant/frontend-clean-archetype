import { useEffect, useState } from 'react';
import { UserViewModel } from '@frontend-archetype/core';
import { getUserPresenter, getUserUseCase } from '../di/container';

export function UserPage() {
  const [user, setUser] = useState<UserViewModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserUseCase
      .execute({ userId: '1' })
      .then((result) => {
        if (result.isErr) {
          setError(result.error.message);
          return;
        }
        setUser(getUserPresenter.present(result.value));
      })
      .catch(() => setError('An unexpected error occurred.'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div className="user-card">
      <h2>{user.fullName}</h2>
      <p>{user.email}</p>
      <small>{user.displayLabel}</small>
    </div>
  );
}
