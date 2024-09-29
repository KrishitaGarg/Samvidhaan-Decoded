import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Github from "../../assets/github.png";
import Facebook from "../../assets/facebook.png";
import Google from "../../assets/google.png";
import Or from "../../assets/SignOr.png";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";


import "./styles.css";
import bg from "../../assets/complete-reg.png";
import { useTheme } from "../ThemeToggle/ThemeToggle.jsx";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 900px;
  max-width: 100%;
  margin: auto;
  top: 25%;
  left: 25%;
  transform: translate(-42%, 5%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: -5;
  height: 111%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signingIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;`
      : null}
`;

const SignInContainer = styled.div`
  position: absolute;
  top: -5;
  height: 111%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(100%);` : null}
`;

const Form = styled.form`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.7rem;
  color: #413233;
  margin: 0;
  margin-bottom: 20px;
`;

const Input = styled.input`
  background-color: white;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 10px;
  border: 1px solid black;
  background-color: #57383b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: #333;
  left: 0%;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;

const Overlay = styled.div`
  background: #57383b;
  color: white;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(50%);` : null}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(20%);` : null}
`;

const WelcomeTitle = styled.h1`
  color: white;
  animation: ${fadeIn} 0.6s ease-in-out forwards;
  font-size: 1.7rem;
  text-align: left;
  padding-left: 35px;
  margin-bottom: 0px;
`;

const Paragraph = styled.p`
  font-weight: 500px;
  padding-left: 30px;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 60px 0 30px;
`;

const Line = styled.h2`
  position: absolute;
  width: 175px;
  text-align: left;
  margin-top: -200px;
  height: 9px;
  background: #d68d44;
  left: 17%;
  border-radius: 11px;
`;

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    setDisplayedText("");
    let index = -1;
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        index++;
        setDisplayedText((prev) => prev + text.charAt(index));
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <Title>{displayedText}</Title>;
};

const BASE_URL =
  "https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io";

const SignInSignUp = () => {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [typingText, setTypingText] = useState("Sign In");
  const { theme } = useTheme();

  const sendSignInDetailsToBackend = async (user) => {
    try {
      const data = {
        email: user.email,
        name: user.displayName,
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
          errorData?.detail?.[0]?.msg || "Failed to send data to backend.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching user details from backend", error);
      alert("Failed to fetch user details from backend.");
    }
  };


  const handleToggle = (isSignIn) => {
    toggle(isSignIn);
    setTypingText(isSignIn ? "Sign In" : "Create Account");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      await sendSignInDetailsToBackend(user);
      alert("We officially welcome you to sign in to S.Decoded !");
      navigate("/sign");
    } catch (error) {
      alert(`Failed to sign up. Error: ${error.message}`);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendSignInDetailsToBackend(user);
      alert("We officially welcome you to S.Decoded !");
      navigate("/");
    } catch (error) {
      alert(`Failed to sign in. Error: ${error.message}`);
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user
      await sendSignInDetailsToBackend(user);
      alert("We officially welcome you to S.Decoded !");
      navigate("/");
    } catch (error) {
      alert(`Failed to sign in with provider. Error: ${error.message}`);
    }
  };

  return (
    <div className={`${theme}-theme`}>
      <Container>
        <SignUpContainer signingIn={signIn}>
          <Form onSubmit={handleSignUp}>
            <TypingEffect text={typingText} speed={150} />
            <Input
              type="text"
              placeholder="Name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="button-click">
              Sign Up
            </Button>
          </Form>
        </SignUpContainer>
        <SignInContainer signingIn={signIn}>
          <Form onSubmit={handleSignIn}>
            <TypingEffect text={typingText} speed={150} />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Anchor href="#">Forgot password?</Anchor>

            <img
              src={Or}
              alt="Or"
              style={{ width: "300px", margin: "20px 10px 0px" }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                gap: "50px",
              }}
            >
              <img
                src={Google}
                alt="Sign in with Google"
                onClick={() => handleSocialSignIn(googleProvider)}
                style={{ width: "40px", cursor: "pointer", margin: "0 10px" }}
              />
              <img
                src={Github}
                alt="Sign in with GitHub"
                onClick={() => handleSocialSignIn(githubProvider)}
                style={{ width: "40px", cursor: "pointer", margin: "0 10px" }}
              />
              <img
                src={Facebook}
                alt="Sign in with Facebook"
                onClick={() => handleSocialSignIn(facebookProvider)}
                style={{ width: "40px", cursor: "pointer", margin: "0 10px" }}
              />
            </div>

            <Button type="submit" className="button-click">
              Sign In
            </Button>
          </Form>
        </SignInContainer>

        <OverlayContainer signingIn={signIn}>
          <Overlay signingIn={signIn}>
            <LeftOverlayPanel signingIn={signIn}>
              <WelcomeTitle>Welcome to Sansthaein & Samvidhan</WelcomeTitle>
              <Line className="line2"></Line>
              <Paragraph className="para">
                Sign up to continue to your account
              </Paragraph>
              <GhostButton
                className="overlay-button1"
                onClick={() => handleToggle(true)}
              >
                Sign In
              </GhostButton>
            </LeftOverlayPanel>
            <RightOverlayPanel signingIn={signIn}>
              <WelcomeTitle>Welcome to Sansthaein & Samvidhan</WelcomeTitle>
              <Line></Line>
              <Paragraph className="para">
                Sign in to continue to your account
              </Paragraph>
              <GhostButton
                className="overlay-button2"
                onClick={() => handleToggle(false)}
              >
                Sign Up
              </GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </div>
  );
};

export default SignInSignUp;
