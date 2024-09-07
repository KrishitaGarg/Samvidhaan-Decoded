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
import Github from "../../assets/github.png";
import Facebook from "../../assets/facebook.png";
import Google from "../../assets/google.png";
import Or from "../../assets/SignOr.png";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to send user data to the backend
  const sendUserDetailsToBackend = async (user) => {
    try {
      const response = await fetch("https://your-backend-api.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          username: username,
          email: email,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send data to the backend.");
      }
      alert("User data sent to backend successfully!");
    } catch (error) {
      console.error("Error sending user data to backend", error);
      alert("Failed to send user data to backend.");
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Set the display name (username)
      await updateProfile(user, {
        displayName: username,
      });

      alert("Signed up successfully!");

      // Send the user details to the backend API
      await sendUserDetailsToBackend(user);
    } catch (error) {
      console.error("Error signing up with email and password", error);
      alert("Failed to sign up. Please try again.");
    }
  };

  const handleSocialSignUp = async (provider) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      alert("Signed up successfully with social provider!");

      // Send the user details to the backend API
      await sendUserDetailsToBackend(user);
    } catch (error) {
      console.error("Error signing up with provider", error);
      alert("Failed to sign up with provider.");
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-box">
        <h1 className="title">
          Welcom<span>e</span>
        </h1>
        <h2 className="subheading">Enter your details to sign up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
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
        <button onClick={handleSignUp} className="sign-up-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
