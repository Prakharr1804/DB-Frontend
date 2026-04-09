import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
// import axios from 'axios';

// ─── Step 1: Email Entry ───────────────────────────────────────────────
const Step1_Email = ({ formData, updateFormData, nextStep, onSendOTP }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSendOTP({ email: formData.email });
      nextStep();
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Step 1 of 4 — Enter Email</h2>
      <form onSubmit={handleSendOTP}>
        {" "}
        {/* 👈 wrap in form */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email address"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          className="button primary-button"
          type="submit" // 👈 type submit so form validates before calling handler
          disabled={!formData.email || loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

// ─── Step 2: OTP Verification ──────────────────────────────────────────
const Step2_OTP = ({ formData, nextStep, onVerifyOtp }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    try {
      const success = await onVerifyOtp({ email: formData.email, otp });
      if (success) {
        nextStep(); 
      } else {
        setError("Invalid OTP. Please try again."); 
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Step 2 of 4 — Verify OTP</h2>
      <p>
        OTP sent to <strong>{formData.email}</strong>
      </p>
      <div className="input-group">
        <label htmlFor="otp">OTP</label>
        <input
          type="text"
          id="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        className="button primary-button"
        onClick={handleVerify}
        disabled={!otp || loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

// ─── Step 3: Role Selection ────────────────────────────────────────────
const Step3_RoleSelect = ({ updateFormData, nextStep }) => {
  const roles = ["STUDENT", "ADMIN", "CLUB"];

  const handleRoleSelect = (role) => {
    updateFormData({ role, attributes: {} });
    nextStep();
  };

  return (
    <div>
      <h2>Step 3 of 4 — Select Role</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        {roles.map((role) => (
          <button
            key={role}
            className="button primary-button"
            onClick={() => handleRoleSelect(role)}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Step 4: Role-Based Details + Password ─────────────────────────────
const Step4_Details = ({ formData, updateFormData, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [attrs, setAttrs] = useState({});

  const updateAttr = (key, value) => {
    setAttrs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    updateFormData({ password, attributes: attrs });
    await onSubmit({ password, attributes: attrs });
    setLoading(false);
  };

  return (
    <div>
      <h2>Step 4 of 4 — Fill Details ({formData.role})</h2>

      {formData.role === "STUDENT" && (
        <>
          <div className="input-group">
            <label>Full Name</label>
            <input
              placeholder="Full Name"
              onChange={(e) => updateAttr("fullName", e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Roll No</label>
            <input
              placeholder="Roll No"
              onChange={(e) => updateAttr("rollNo", e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Branch</label>
            <select
              onChange={(e) => updateAttr("branch", e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Branch
              </option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ETC">ETC</option>
              <option value="EI">EI</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MECH">MECH</option>
              {/* <option value="CSBS">CSBS</option>
                    <option value="Bdes">Bdes</option> */}
            </select>
          </div>
          <div className="input-group">
            <label>Year</label>
            <select
              onChange={(e) => updateAttr("currYear", e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
          </div>
        </>
      )}

      {formData.role === "CLUB" && (
        <>
          <div className="input-group">
            <label>Club Name</label>
            <input
              placeholder="Club Name"
              onChange={(e) => updateAttr("clubName", e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Club Lead</label>
            <input
              placeholder="Club Lead"
              onChange={(e) => updateAttr("coordinatorName", e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Club Type</label>
            <select
              onChange={(e) => updateAttr("clubType", e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Club Type
              </option>
              <option value="TECHNICAL">Technical</option>
              <option value="ENTREPRENEURSHIP">Entrepreneurship</option>
              <option value="CULTURAL">Cultural</option>
              <option value="SOCIAL_WORK">Social Work</option>
            </select>
          </div>
        </>
      )}

      {formData.role === "ADMIN" && (
        <>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => updateAttr("fullName", e.target.value)}
            />
            <label>Staff ID</label>
            <input
              type="text"
              placeholder="Enter Staff ID"
              onChange={(e) => updateAttr("staffId", e.target.value)}
            />
          </div>
        </>
      )}

      {/* Admin has no extra fields, just password */}

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="button primary-button"
        onClick={handleSubmit}
        disabled={!password || loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

// ─── Parent: Register ──────────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, handleSendOTP, handleVerifyOtp, loading } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    attributes: {},
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);

  const handleSubmit = async ({ password, attributes }) => {
    try {
      await handleRegister({
        email: formData.email,
        password,
        role: formData.role,
        attributes,
      });
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        {currentStep === 1 && (
          <Step1_Email
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            onSendOTP={handleSendOTP}
          />
        )}
        {currentStep === 2 && (
          <Step2_OTP formData={formData} nextStep={nextStep} onVerifyOtp={handleVerifyOtp} />
        )}
        {currentStep === 3 && (
          <Step3_RoleSelect
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        )}
        {currentStep === 4 && (
          <Step4_Details
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
          />
        )}

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
