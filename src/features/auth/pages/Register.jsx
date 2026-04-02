import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';

const Register = () => {
    const navigate = useNavigate();

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

    const [studentData, setStudentData] = useState({
        fullName: '',
        rollNumber: '',
        branch: '',
        currentYear: ''
    });

    const handleStudentChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const [adminData, setAdminData] = useState({
        staffId: '',
        fullName: ''
    });

    const handleAdminChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const [clubData, setClubData] = useState({
        clubName: '',
        coordinatorName: '',
        clubType: '' 
    });

    const handleClubChange = (e) => {
        setClubData({ ...clubData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setRole(newRole);

        setPassword('');
        setStudentData({ fullName: '', rollNumber: '', branch: '', currentYear: ''});
        setAdminData({ staffId: '', fullName: ''});
        setClubData({ clubName: '', coordinatorName: '', clubType: ''});
    };

    const handleSendOtp = (e) => {
        e.preventDefault();

        if (!email || email.trim() === "") {
            alert("Please enter a valid email address first!");
            return;
        }

        const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(newOtp);
        alert(`Your OTP is: ${newOtp}`);
        setIsOtpSent(true);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otp === generatedOtp) {
            setIsVerified(true);
        } else {
            alert("Wrong OTP, try again.");
        }
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        let payload = {
            email,
            password,
            role
        };
        
        if (role === 'Student') payload = { ...payload, ...studentData };
        if (role === 'Admin') payload = { ...payload, ...adminData };
        if (role === 'Club') payload = { ...payload, ...clubData };

        console.log("🚀 Sending this to backend:", payload);
        alert(`Registration submitted for ${role}!`);
    };

    return (
        <main>
            <div className='form-container'>
                <h1>Register</h1>
                <form onSubmit={handleFinalSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Email address' 
                            disabled={isOtpSent}
                            required 
                        />
                    </div>  

                    {!isOtpSent && (
                        <button 
                            className="button primary-button" 
                            onClick={handleSendOtp}
                            style={{ opacity: (!email.trim()) ? 0.5 : 1 }}
                        >
                            Send OTP
                        </button>
                    )}

                    {isOtpSent && !isVerified && (
                        <div style={{ marginTop: '20px' }}>
                            <div className="input-group">
                                <label htmlFor="otp">Enter OTP</label>
                                <input 
                                    type="text" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    placeholder='1234' 
                                    maxLength={4}
                                />
                            </div>
                            <button 
                                type="button"
                                className="button primary-button"
                                onClick={handleVerifyOtp}>
                                Verify OTP
                            </button>
                        </div>
                    )}

                    {isVerified && (
                        <div className="input-group" style={{ marginTop: '20px' }}>
                            <label htmlFor="role">Select Role</label>
                            <select 
                                id="role" 
                                value={role} 
                                onChange={handleRoleChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
                                required
                            >
                                <option value="" disabled>Choose a Role</option>
                                <option value="Student">Student</option>
                                <option value="Admin">Admin</option>
                                <option value="Club">Club</option>
                            </select>
                        </div>
                    )}

                    {isVerified && role === 'Student' && (
                        <div className="student-fields">
                            <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '20px' }}>
                                <div className="input-group">
                                    <label>Full Name</label>
                                    <input name="fullName" type="text" value={studentData.fullName} onChange={handleStudentChange} placeholder="John Doe" required />
                                </div>
                                
                                <div className="input-group">
                                    <label>Roll Number</label>
                                    <input name="rollNumber" type="text" value={studentData.rollNumber} onChange={handleStudentChange} placeholder="e.g. 2021CS01" required />
                                </div>

                                <div className="input-group">
                                    <label>Branch</label>
                                    <input name="branch" type="text" value={studentData.branch} onChange={handleStudentChange} placeholder="Computer Science" required />
                                </div>

                                <div className="input-group">
                                    <label>Current Year</label>
                                    <select name="currentYear" value={studentData.currentYear} onChange={handleStudentChange} required>
                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type="password" 
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required 
                                    />
                                </div>

                                <button type="submit" className="button primary-button" style={{ marginTop: '20px' }}>
                                    Complete Student Registration
                                </button>
                            </div>
                        </div>
                    )}

                    
                    {isVerified && role === 'Admin' && (
                        <div className="admin-fields">
                            <div className="fade-in" style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '20px' }}>
                                
                                <div className="input-group">
                                    <label>Staff ID</label>
                                    <input 
                                        name="staffId" 
                                        type="text" 
                                        value={adminData.staffId}
                                        onChange={handleAdminChange} 
                                        placeholder="e.g. ADM-1024" 
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Full Name</label>
                                    <input 
                                        name="fullName" 
                                        type="text" 
                                        value={adminData.fullName}
                                        onChange={handleAdminChange} 
                                        placeholder="Enter your full name" 
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type="password" 
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required 
                                    />
                                </div>

                                <button type="submit" className="button primary-button" style={{ marginTop: '20px' }}>
                                    Complete Admin Registration
                                </button>
                            </div>
                        </div>
                    )}

                    {isVerified && role === 'Club' && (
                       <div className="club-fields">
                            <div className="fade-in" style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '20px' }}>
                                
                                <div className="input-group">
                                    <label>Club Name</label>
                                    <input 
                                        name="clubName" 
                                        type="text" 
                                        value={clubData.clubName}
                                        onChange={handleClubChange} 
                                        placeholder="e.g. Robotics Club" 
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Coordinator Name</label>
                                    <input 
                                        name="coordinatorName" 
                                        type="text" 
                                        value={clubData.coordinatorName}
                                        onChange={handleClubChange} 
                                        placeholder="Enter Coordinator's Name" 
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Club Category</label>
                                    <select 
                                        name="clubType" 
                                        value={clubData.clubType} 
                                        onChange={handleClubChange}
                                        required
                                    >
                                        <option value="" disabled>-- Select Category --</option>
                                        <option value="TECHNICAL">Technical</option>
                                        <option value="CULTURAL">Cultural</option>
                                        <option value="ENTERPRENEURSHIP">Entrepreneurship</option>
                                        <option value="SOCIAL_WORK">Social Work</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type="password" 
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required 
                                    />
                                </div>

                                <button type="submit" className="button primary-button" style={{ marginTop: '20px' }}>
                                    Complete Club Registration
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                {!isVerified && (
                    <p style={{ marginTop: '20px' }}>
                        Already have an account? <Link to="/">Login</Link>
                    </p>
                )}
            </div>
        </main>
    );
};

export default Register;