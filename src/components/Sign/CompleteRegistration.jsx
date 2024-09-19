import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CompleteRegistration.css";

const BASE_URL =
  "https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io";

const CompleteRegistration = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};

  const handleRegister = async () => {
    if (!user || !username) {
      alert("Please enter your username.");
      return;
    }

    setLoading(true);
    try {
      const data = {
        email: user.email,
        name: username,
        firebase_user_id: user.uid,
      };

      const response = await fetch(`${BASE_URL}/user/create-user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.detail?.[0]?.msg || "Failed to register.";
        throw new Error(errorMessage);
      }

      alert("Registration complete!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert(`Failed to register. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/signin");
  };

  return (
    <div className="complete-registration-container">
      <h1>Complete Your Registration</h1>
      <h2>Enter your Username.</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
        required
      />
      <button
        onClick={handleCancel}
        className="cancel-button"
        disabled={loading}
      >
        Cancel
      </button>
      <button
        onClick={handleRegister}
        className="register-button"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default CompleteRegistration;
