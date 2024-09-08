import React, { useState } from "react";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import "./SignUp.css";
import Google from "../../assets/google.png";
import Github from "../../assets/github.png";
import Facebook from "../../assets/facebook.png";
import Or from "../../assets/SignOr.png";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  "https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile with username
      await updateProfile(user, { displayName: username });

      // Prepare data to send to backend
      const data = {
        email: user.email,
        name: user.displayName,
        firebase_user_id: user.uid,
      };

      // Send user details to backend
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
          errorData?.detail?.[0]?.msg || "Failed to send data to backend.";
        throw new Error(errorMessage);
      }

      alert("Sign Up successful!");
      navigate("/");
    } catch (error) {
      console.error("Error during Sign Up:", error);
      alert(`Failed to sign up. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider) => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Prepare data to send to backend
      const data = {
        email: user.email,
        name: user.displayName,
        firebase_user_id: user.uid,
      };

      // Send user details to backend
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
          errorData?.detail?.[0]?.msg || "Failed to send data to backend.";
        throw new Error(errorMessage);
      }

      alert("Sign Up successful with social provider!");
      navigate("/");
    } catch (error) {
      console.error("Error signing up with provider:", error);
      alert(`Failed to sign up with provider. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-box">
        <h1 className="title">
          Welcome<span>e</span>
        </h1>
        <h2 className="subheading">Enter your details to sign up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="sign-up-button" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <img src={Or} alt="Or" className="or" />
        <div className="social-icons">
          <img
            src={Google}
            alt="Google Sign-Up"
            className="social-icon"
            onClick={() => handleSocialSignUp(googleProvider)}
          />
          <img
            src={Github}
            alt="GitHub Sign-Up"
            className="social-icon"
            onClick={() => handleSocialSignUp(githubProvider)}
          />
          <img
            src={Facebook}
            alt="Facebook Sign-Up"
            className="social-icon"
            onClick={() => handleSocialSignUp(facebookProvider)}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
