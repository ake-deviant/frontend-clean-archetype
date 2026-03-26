'use client';

import { useState } from 'react';
import { AuthViewModel } from '@frontend-archetype/core';
import { LoginModal } from './LoginModal';

export function AuthBar() {
  const [currentUser, setCurrentUser] = useState<AuthViewModel | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="auth-bar">
        {currentUser ? (
          <>
            <span className="auth-user">{currentUser.displayLabel}</span>
            <button className="btn-secondary" onClick={() => setCurrentUser(null)}>
              Se déconnecter
            </button>
          </>
        ) : (
          <button onClick={() => setShowModal(true)}>Se connecter</button>
        )}
      </div>

      {showModal && (
        <LoginModal
          onLoggedIn={(user) => {
            setCurrentUser(user);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
