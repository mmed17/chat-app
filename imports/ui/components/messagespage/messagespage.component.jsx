import { Avatar, Button } from "@mui/material";
import React, {useState, useRef, useEffect, useContext} from "react";
import {useTracker} from "meteor/react-meteor-data";
import { useLocation, useNavigate } from "react-router-dom";
import './messagespage.styles.css'
import SendIcon from '@mui/icons-material/Send';
import UndoIcon from '@mui/icons-material/Undo';

const data = [
    {"from": "hanae@gmail.com", "to": "mohamed@gmail.com", "content": "Hello !", id:1, },
    {"to": "hanae@gmail.com", "from": "mohamed@gmail.com", "content": "Hi !", id:2},
    {"from": "hanae@gmail.com", "to": "mohamed@gmail.com", "content": "Whatsupp !", id:3},
    {"to": "hanae@gmail.com", "from": "mohamed@gmail.com", "content": "I am good hbu ?", id:4},
    {"from": "hanae@gmail.com", "to": "mohamed@gmail.com", "content": "I am great !", id:5},
    {"from": "hanae@gmail.com", "to": "mohamed@gmail.com", "content": "Any news ?", id:6},
    {"from": "fernando@gmail.com", "to": "mohamed@gmail.com", "content": "Any news ? 2", id:7}
]

export const MessagesPage = () => {
    const currentUser = useTracker(() => Meteor.user());
    const navigate = useNavigate();
    const {state} = useLocation();
    const [messages,setMessages] = useState(data);
    const msgRef = useRef();
    const [id, setId] = useState(8);
    const scrollRef = useRef();
    
    useEffect(() => {
        msgRef.current.value = "";
        scrollRef.current.scrollTop = 1e31;
    }, [messages]);

    useEffect(() => {
        const newMssg = msgRef.current.value;
        if (newMssg) {
            setMessages((oldMssgs) =>
            [...oldMssgs, {content: newMssg, "from": currentUser.emails[0].address, "to": state.emails, "id": id}])
        }
    }, [id]);

    return (
        <>
        <div className="container">
            <div className="chat-box">
                <div className="client">
                    <div className="client-header">
                        <Avatar src="." />
                        <div className="client-info">
                            <h2>{state.username}</h2>
                        </div>
                    </div>
                    <Button  onClick={() => navigate("/home")} variant="contained" color="secondary"> <UndoIcon /> </Button>
                </div>
                <div className="chats" ref={scrollRef}>
                    {messages.map(msg => {
                        if( currentUser && (msg.from === currentUser.emails[0].address && msg.to === state.emails)){
                            return (<p key={msg.id} className='my-chat'>{msg.content}</p>);
                        } else if ( currentUser && (msg.to === currentUser.emails[0].address && msg.from === state.emails)) {
                            return (<p key={msg.id} className='client-chat'>{msg.content}</p>);
                        }
                    })}
                </div>
                <div className="chat-input">
                    <input ref={msgRef} type="text" placeholder="Enter Message" />  
                    <Button sx={{height: 30, padding: 2, textAlign: 'center'}} variant="contained" color="secondary" endIcon={<SendIcon />} onClick={() => {
                        setId(id => id + 1);
                    }} >Send</Button>
                </div>
            </div>
        </div> 
        </>

  );
}