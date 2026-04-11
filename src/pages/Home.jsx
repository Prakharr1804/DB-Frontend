import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../components/ProfileModal';
import api from '../api/axios';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [roomsError, setRoomsError] = useState('');
  const [roomsLoaded, setRoomsLoaded] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const loadRooms = async () => {
    setLoadingRooms(true);
    setRoomsError('');
    try {
      const response = await api.get('/rooms');
      setRooms(response.data);
      setRoomsLoaded(true);
    } catch (err) {
      setRoomsError('Failed to fetch rooms metadata.');
    } finally {
      setLoadingRooms(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="logo">SAARC</div>
        <div className="nav-actions">
          <span className="user-badge">{user?.role}</span>
          <button className="btn-secondary" onClick={() => setIsProfileOpen(true)}>Profile</button>
          <button className="btn-secondary" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>
      
      <main className="dashboard-content">



        {roomsError && <div className="error-message" style={{marginTop: '2rem'}}>{roomsError}</div>}

        {roomsLoaded && (
          <section className="rooms-section animation-slide-up">
            <h2 className="section-title">{user?.role === 'STUDENT' ? 'Available Labs' : 'Available Facilities'}</h2>
            <div className="room-grid">
              {rooms.map((room) => (
                <div key={room.id} className="room-card glass">
                  <div className="room-header">
                    <span className="room-number">{room.roomNo}</span>
                    <span className={`badge ${room.bookable ? 'badge-success' : 'badge-disabled'}`}>
                      {room.bookable ? (user?.role === 'STUDENT' ? 'Accessible' : 'Bookable') : 'Unavailable'}
                    </span>
                  </div>
                  <div className="room-body">
                    <p><strong>Block:</strong> {room.block}</p>
                    <p><strong>Type:</strong> {room.roomType}</p>
                    <p><strong>Capacity:</strong> {room.capacity} seats</p>
                  </div>
                </div>
              ))}
              {rooms.length === 0 && <p>No rooms available.</p>}
            </div>
          </section>
        )}
      </main>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default Home;
