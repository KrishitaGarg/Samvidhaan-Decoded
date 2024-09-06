import React from "react";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "./firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
    } catch (error) {
      console.error("Error signing in with email and password", error);
      alert("Failed to sign in. Please check your credentials.");
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in successfully!");
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
        <h1 className="title">Welcome</h1>
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
        <div className="social-icons">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="Google Sign-In"
            className="social-icon"
            onClick={() => handleSocialSignIn(googleProvider)}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub Sign-In"
            className="social-icon"
            onClick={() => handleSocialSignIn(githubProvider)}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
            alt="Facebook Sign-In"
            className="social-icon"
            onClick={() => handleSocialSignIn(facebookProvider)}
          />
        </div>
        <button onClick={handleSignIn} className="sign-in-button">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
