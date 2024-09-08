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

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const sendUserDetailsToBackend = async (user) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io/user/create-user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName,
            firebase_user_id: user.uid,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.detail?.[0]?.msg || "Failed to send data to backend.";
        throw new Error(errorMessage);
      }
      const result = await response.json();
      alert(`Success: ${result}`);
    } catch (error) {
      console.error("Error sending user data to backend", error);
      alert(`Failed to send user data to backend. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
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
      if (error.code === "auth/email-already-in-use") {
        alert(
          "The email address is already in use. Please use a different email or sign in."
        );
      } else {
        console.error("Error signing up with email and password", error);
        alert("Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider) => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      alert("Signed up successfully with social provider!");

      // Send the user details to the backend API
      await sendUserDetailsToBackend(user);
    } catch (error) {
      console.error("Error signing up with provider", error);
      alert("Failed to sign up with provider.");
    } finally {
      setLoading(false);
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
        <button
          onClick={handleSignUp}
          className="sign-up-button"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
