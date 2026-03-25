import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAvailableUsers, login } from './auth.slice';

interface LoginModalProps {
  onClose: () => void;
}

export function LoginModal({ onClose }: LoginModalProps) {
  const dispatch = useAppDispatch();
  const { availableUsers, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAvailableUsers());
  }, [dispatch]);

  const handleSelect = async (userId: string) => {
    const result = await dispatch(login(userId));
    if (login.fulfilled.match(result)) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Choisir un utilisateur</h2>

        {error && <p className="error">{error}</p>}

        <ul className="user-list">
          {availableUsers.map((user) => (
            <li key={user.id}>
              <button onClick={() => handleSelect(user.id)} disabled={isLoading}>
                {user.fullName}
              </button>
            </li>
          ))}
        </ul>

        <button className="btn-secondary" onClick={onClose}>
          Annuler
        </button>
      </div>
    </div>
  );
}
