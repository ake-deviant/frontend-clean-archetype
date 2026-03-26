'use client';

import { useEffect, useState } from 'react';
import { AuthViewModel, UserViewModel } from '@frontend-archetype/core';

interface LoginModalProps {
  onLoggedIn: (user: AuthViewModel) => void;
  onClose: () => void;
}

export function LoginModal({ onLoggedIn, onClose }: LoginModalProps) {
  const [users, setUsers] = useState<UserViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/login')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleSelect = async (userId: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      setIsLoading(false);
      return;
    }

    const user: AuthViewModel = await response.json();
    onLoggedIn(user);
    setIsLoading(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Choisir un utilisateur</h2>

        {error && <p className="error">{error}</p>}

        <ul className="user-list">
          {users.map((user) => (
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
