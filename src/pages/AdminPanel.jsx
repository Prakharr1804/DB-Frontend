import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../components/ProfileModal';

const AdminPanel = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container admin-theme">
      <nav className="navbar">
        <div className="logo">SAARC Admin</div>
        <div className="nav-actions">
          <span className="user-badge admin">Administrator</span>
          <button className="btn-secondary" onClick={() => setIsProfileOpen(true)}>Profile</button>
          <button className="btn-secondary" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>
      
      <main className="dashboard-content">



      </main>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default AdminPanel;
