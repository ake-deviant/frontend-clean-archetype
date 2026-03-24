import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUser } from './user.slice';

export function UserPage() {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.user);

  const loadUser = () => {
    dispatch(fetchUser('1'));
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div className="user-card">
      <h2>{user.fullName}</h2>
      <p>{user.email}</p>
      <small>{user.displayLabel}</small>
      <br />
      <button onClick={loadUser}>Refresh</button>
    </div>
  );
}
