import React, { useRef, useState, useEffect } from "react";
import Login from "./login";
import "../styles/chat.scss";

const Content = () => {
  const [messages, setMessages] = useState<any>([]);
  const [value, setValue] = useState("");
  const socket = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:12000");
    if (username !== "") {
      socket.current.onopen = () => {
        setConnected(true);
        const message = {
          event: "connection",
          username,
          id: Date.now(),
        };
        socket.current!.send(JSON.stringify(message));
      };
      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prev: any) => [...prev, message]);
      };
      socket.current.onclose = () => {
        console.log("Socket closed");
      };
      socket.current.onerror = () => {
        console.log("Socket error");
      };
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message",
    };
    if (message.message !== "") {
      socket.current!.send(JSON.stringify(message));
      setValue("");
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!connected)
    return <Login connect={connect} setUsername={setUsername} username={username} nameValid={nameValid} />;

  return (
    <div className="chat">
      <div className="chatWindow">
        <div className="messages" ref={messagesContainerRef}>
          {messages.map((mess: any) => (
            <div key={mess.id}>
              {mess.event === "connection" ? (
                <div className="connectionMessage">User {mess.username} connected</div>
              ) : (
                <div className="message">
                  <div className="messUsername">{mess.username} :</div>
                  <div>{mess.message}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="sendMessageForm">
          <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Content;
