import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from './auth.slice';
import { LoginModal } from './LoginModal';

export function AuthBar() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="auth-bar">
        {currentUser ? (
          <>
            <span className="auth-user">{currentUser.displayLabel}</span>
            <button className="btn-secondary" onClick={() => dispatch(logout())}>
              Se déconnecter
            </button>
          </>
        ) : (
          <button onClick={() => setShowModal(true)}>Se connecter</button>
        )}
      </div>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}
