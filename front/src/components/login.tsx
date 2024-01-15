import React from "react";
import "../styles/login.scss";

interface LoginProps {
  connect: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  nameValid: boolean;
}
const Login = ({ connect, setUsername, username, nameValid }: LoginProps) => {
  
  return (
    <div className="wrapper">
      <div className="form">
        <div className="title">Sign In</div>
        <input
          type="text"
          className={`input ${nameValid ? 'error' : ''}`}
          placeholder={nameValid ? "You Should Enter Name" : "Enter Your Name"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="loginBtn" onClick={connect} onTouchStart={connect}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default Login;
