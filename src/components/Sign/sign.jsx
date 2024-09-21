import React, { useState } from "react";
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
} from "firebase/auth";
import "./styles.css";
import bg from "../../assets/complete-reg.png";

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
  min-height: 600px;
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
  margin: 0;
`;

const Input = styled.input`
  background-color: white;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
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
`;

const Paragraph = styled.p`
  font-weight: 500px;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const Line = styled.h2`
  position: absolute;
  width: 275px;
  margin-top: 20px;
  height: 9px;
  background: #d68d44;
  left: 20%;
  border-radius: 11px;
`;

const SignInSignUp = () => {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("We officially welcome you to sign in to S.Decoded !");
      navigate("/sign");
    } catch (error) {
      alert(`Failed to sign up. Error: ${error.message}`);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("We officially welcome you to S.Decoded !");
      navigate("/");
    } catch (error) {
      alert(`Failed to sign in. Error: ${error.message}`);
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      alert("We officially welcome you to S.Decoded !");
      navigate("/");
    } catch (error) {
      alert(`Failed to sign in with provider. Error: ${error.message}`);
    }
  };

  return (
    <Container>
      <SignUpContainer signingIn={signIn}>
        <Form onSubmit={handleSignUp}>
          <Title>Create Account</Title>
          <Input type="text" placeholder="Name" required />
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
          <Button type="submit">Sign Up</Button>
        </Form>
      </SignUpContainer>
      <SignInContainer signingIn={signIn}>
        <Form onSubmit={handleSignIn}>
          <Title>Sign in</Title>
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
          <Anchor href="#">Forgot your password?</Anchor>
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

          <img
            src={Or}
            alt="Or"
            style={{ width: "300px", margin: "20px 10px 0px" }}
          />

          <Button type="submit">Sign In</Button>
        </Form>
      </SignInContainer>

      <OverlayContainer signingIn={signIn}>
        <Overlay signingIn={signIn}>
          <LeftOverlayPanel signingIn={signIn}>
            <WelcomeTitle>Welcome to Samvidhaan Decoded</WelcomeTitle>
            <Line></Line>
            <Paragraph>Complete registration to continue to sign up.</Paragraph>
            <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
          </LeftOverlayPanel>
          <RightOverlayPanel signingIn={signIn}>
            <WelcomeTitle>Welcome to Samvidhaan Decoded</WelcomeTitle>
            <Line></Line>
            <Paragraph>Sign in to continue to your account</Paragraph>
            <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default SignInSignUp;
