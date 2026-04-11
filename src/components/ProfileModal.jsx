import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const ProfileModal = ({ isOpen, onClose }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/user');
      setProfileData(response.data);
    } catch (err) {
      setError('Failed to fetch profile details.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const renderDetails = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <div className="spinner"></div>
        </div>
      );
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    if (!profileData) return null;

    const { userDto, adminDto, clubDto, studentDto } = profileData;

    return (
      <div className="profile-details">
        <div className="detail-group">
          <h4>Account Information</h4>
          <p><strong>Email:</strong> {userDto?.email}</p>
          <p><strong>Role:</strong> <span className={`user-badge ${userDto?.role.toLowerCase()}`}>{userDto?.role}</span></p>
          <p><strong>Status:</strong> {userDto?.enabled ? 'Active' : 'Disabled'}</p>
        </div>

        {adminDto && (
          <div className="detail-group">
            <h4>Admin Details</h4>
            <p><strong>Full Name:</strong> {adminDto.fullName}</p>
            <p><strong>Staff ID:</strong> {adminDto.staffId}</p>
          </div>
        )}

        {clubDto && (
          <div className="detail-group">
            <h4>Club Details</h4>
            <p><strong>Club Name:</strong> {clubDto.clubName}</p>
            <p><strong>Type:</strong> {clubDto.clubType}</p>
            <p><strong>Coordinator:</strong> {clubDto.coordinatorName}</p>
          </div>
        )}

        {studentDto && (
          <div className="detail-group">
            <h4>Student Details</h4>
            <p><strong>Full Name:</strong> {studentDto.fullName}</p>
            <p><strong>Branch:</strong> {studentDto.branch}</p>
            <p><strong>Current Year:</strong> {studentDto.currYear}</p>
            <p><strong>Roll No:</strong> {studentDto.rollNo}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Your Profile</h3>
          <button className="btn-ghost close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {renderDetails()}
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
