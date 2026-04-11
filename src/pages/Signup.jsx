import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Step 1 state
  const [email, setEmail] = useState('');
  
  // Step 2 state
  const [otp, setOtp] = useState('');
  const [registrationToken, setRegistrationToken] = useState('');
  
  // Step 3 state
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  
  // Dynamic Attributes State
  const [attributes, setAttributes] = useState({
    fullName: '',
    staffId: '',
    rollNo: '',
    branch: 'CSE',
    currYear: '1',
    clubName: '',
    coordinatorName: '',
    clubType: 'TECHNICAL'
  });

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    setAttributes(prev => ({ ...prev, [name]: value }));
  };

  const handleInitiate = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await api.post('/auth/signup/initiate', { email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to initiate signup. Email may be invalid or already in use.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await api.post('/auth/signup/verifyOtp', { 
        email, 
        userProvidedOtp: otp 
      });
      setRegistrationToken(response.data.registrationToken);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      let roleAttributes = {};
      
      if (role === 'ADMIN') {
        roleAttributes = { 
          staffId: attributes.staffId, 
          fullName: attributes.fullName 
        };
      } else if (role === 'STUDENT') {
        roleAttributes = { 
          fullName: attributes.fullName, 
          rollNo: attributes.rollNo, 
          branch: attributes.branch, 
          currYear: Number(attributes.currYear) 
        };
      } else if (role === 'CLUB') {
        roleAttributes = { 
          clubName: attributes.clubName, 
          coordinatorName: attributes.coordinatorName, 
          clubType: attributes.clubType 
        };
      }

      const payload = {
        registrationToken,
        email,
        password,
        role,
        attributes: roleAttributes
      };

      const response = await api.post('/auth/signup/complete', payload);
      const { token, userDto } = response.data;

      if (!userDto.enabled) {
        // Disabled logic for ADMIN/CLUB
        setStep(4); // Success/Disabled step
      } else {
        // Active logic for STUDENT
        login(token, userDto);
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Signup failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <form onSubmit={handleInitiate} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? <div className="spinner" /> : 'Send OTP'}
          </button>
        </form>
      );
    }
    
    if (step === 2) {
      return (
        <form onSubmit={handleVerifyOtp} className="login-form">
          <div className="form-group">
            <label>OTP sent to {email}</label>
            <input 
              type="text" 
              id="otp" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              placeholder="Enter OTP"
              required 
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? <div className="spinner" /> : 'Verify OTP'}
          </button>
          
          <button type="button" className="btn-ghost" style={{marginTop: '1rem', width: '100%'}} onClick={() => setStep(1)}>
            Change Email
          </button>
        </form>
      );
    }

    if (step === 3) {
      return (
        <form onSubmit={handleCompleteSignup} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Setup Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter a strong password"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="styled-select"
            >
              <option value="STUDENT">STUDENT</option>
              <option value="CLUB">CLUB</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {role === 'STUDENT' && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={attributes.fullName} onChange={handleAttributeChange} required />
              </div>
              <div className="form-group">
                <label>Roll Number</label>
                <input type="text" name="rollNo" value={attributes.rollNo} onChange={handleAttributeChange} required />
              </div>
              <div style={{display: 'flex', gap: '1rem', width: '100%'}}>
                <div className="form-group" style={{flex: 1}}>
                  <label>Branch</label>
                  <select name="branch" value={attributes.branch} onChange={handleAttributeChange} className="styled-select">
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ETC">ETC</option>
                    <option value="EI">EI</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>
                <div className="form-group" style={{flex: 1}}>
                  <label>Year</label>
                  <input type="number" name="currYear" min="1" max="5" value={attributes.currYear} onChange={handleAttributeChange} required />
                </div>
              </div>
            </>
          )}

          {role === 'CLUB' && (
            <>
              <div className="form-group">
                <label>Club Name</label>
                <input type="text" name="clubName" value={attributes.clubName} onChange={handleAttributeChange} required />
              </div>
              <div className="form-group">
                <label>Coordinator Name</label>
                <input type="text" name="coordinatorName" value={attributes.coordinatorName} onChange={handleAttributeChange} required />
              </div>
              <div className="form-group">
                <label>Club Type</label>
                <select name="clubType" value={attributes.clubType} onChange={handleAttributeChange} className="styled-select">
                  <option value="TECHNICAL">TECHNICAL</option>
                  <option value="CULTURAL">CULTURAL</option>
                  <option value="ENTERPRENEURSHIP">ENTERPRENEURSHIP</option>
                  <option value="SOCIAL_WORK">SOCIAL_WORK</option>
                </select>
              </div>
            </>
          )}

          {role === 'ADMIN' && (
            <>
              <div className="form-group">
                <label>Staff ID</label>
                <input type="text" name="staffId" value={attributes.staffId} onChange={handleAttributeChange} required />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={attributes.fullName} onChange={handleAttributeChange} required />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? <div className="spinner" /> : 'Complete Signup'}
          </button>
        </form>
      );
    }

    if (step === 4) {
      return (
        <div style={{textAlign: 'center'}}>
          <div style={{marginBottom: '2rem', color: 'var(--success-color)'}}>
            <svg style={{width: '64px', height: '64px', margin: '0 auto'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 style={{marginBottom: '1rem'}}>Registration Submitted</h3>
          <p style={{marginBottom: '2rem'}}>Account created successfully but is currently disabled. Please try again later or contact an admin to approve your platform request.</p>
          <button className="btn-primary" style={{width: '100%'}} onClick={() => navigate('/login')}>
            Return to Login
          </button>
        </div>
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass">
        <div className="login-header">
          <h2>{step === 4 ? 'Success' : 'Create Account'}</h2>
          {step < 4 && <p>Step {step} of 3</p>}
        </div>

        {error && <div className="error-message">{error}</div>}

        {renderStep()}

        {step < 4 && (
          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Already have an account? <span 
              onClick={() => navigate('/login')} 
              style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '500' }}>
              Log in
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
