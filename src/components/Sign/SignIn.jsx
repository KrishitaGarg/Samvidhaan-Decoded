import React from "react";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import "./SignIn.css";
import Github from "../../assets/github.png";
import Facebook from "../../assets/facebook.png";
import Google from "../../assets/google.png";
import Or from "../../assets/SignOr.png";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const sendSignInDetailsToBackend = async (user) => {
    try {
      const response = await fetch(
        "https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io/user/get-user/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        alert("User details fetched successfully!");
        console.log("User details:", data); // Optionally log or use the data
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error("Validation Error:", errorData);
        alert("Validation error: " + JSON.stringify(errorData.detail)); // Show specific validation error
      } else {
        throw new Error("Failed to fetch user details from backend.");
      }
    } catch (error) {
      console.error("Error fetching user details from backend", error);
      alert("Failed to fetch user details from backend.");
    }
  };

  const handleSignInSuccess = async (user) => {
    alert("Signed in successfully!");
    // Optionally, send the user details to the backend API
    await sendSignInDetailsToBackend(user);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await handleSignInSuccess(user);
    } catch (error) {
      console.error("Error signing in with email and password", error);
      alert("Failed to sign in. Please check your credentials.");
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      await handleSignInSuccess(user);
    } catch (error) {
      console.error("Error signing in with provider", error);
      alert("Failed to sign in with provider.");
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email", error);
      alert("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <h1 className="title">
          Welcom<span>e</span>
        </h1>
        <h2 className="subheading">Enter your details to sign in</h2>
        <input
          type="text"
          placeholder="Email or Username"
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
        <a href="#" onClick={handlePasswordReset} className="forgot-password">
          Forgot Password?
        </a>
        <img src={Or} alt="Or" className="or" />
        <div className="social-icons">
          <img
            src={Google}
            alt="Google Sign-In"
            className="social-icon"
            onClick={() => handleSocialSignIn(googleProvider)}
          />
          <img
            src={Github}
            alt="GitHub Sign-In"
            className="social-icon"
            onClick={() => handleSocialSignIn(githubProvider)}
          />
          <img
            src={Facebook}
            alt="Facebook Sign-In"
            className="social-icon"
            onClick={() => handleSocialSignIn(facebookProvider)}
          />
        </div>
        <button onClick={handleSignIn} className="sign-in-button">
          Sign In
        </button>
        <div>
          <Link to="/signup" className="signup">
            New here? <span>Sign up now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
