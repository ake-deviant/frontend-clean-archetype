import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllUsers, fetchUser } from './user.slice';

export function UserPage() {
  const dispatch = useAppDispatch();
  const { user, users, isLoading, error } = useAppSelector((state) => state.user);

  const loadAll = () => {
    dispatch(fetchUser('1'));
    dispatch(fetchAllUsers());
  };

  useEffect(() => {
    loadAll();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {user && (
        <div className="user-card">
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
          <small>{user.displayLabel}</small>
        </div>
      )}

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.displayLabel}</li>
        ))}
      </ul>

      <button onClick={loadAll}>Refresh</button>
    </div>
  );
}
