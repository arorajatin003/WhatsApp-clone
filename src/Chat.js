import React, {useState,useEffect} from 'react'
import './chat.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined, InsertEmoticon, Mic } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {Avatar, IconButton, Input} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import db from './Firebase'
import firebase from 'firebase'
import {useStateValue} from './stateProvider'

function Chat(){
  const [seed, setSeed]=useState('');
  const [input, setInput]=useState("");
  const {roomId} = useParams();
  const [roomName, setRoomName]=useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue()

  useEffect(()=>{
    setSeed(Math.floor(Math.random() * 5000))
  },[]);

  useEffect(()=>{
    if(roomId){
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ));

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot)=>
          setMessages(snapshot.docs.map((doc)=>
            doc.data()))
          );
    }
  }, [roomId])

  const sendMessage=(e)=>{
    e.preventDefault();
    console.log(input);
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('')
  }
  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/male/${roomName}.svg`} />
        <div className='chat__headerContent'>
          <h3>{roomName}</h3>
          <p>Last Seen{" "}
            {new Date(messages[messages.length -1]?.timestamp?.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
          </p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map((message)=>(
          <p className={`chat__bodyMessage ${
            message.name===user.displayName && "chat__recivers"}`}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{new Date(message.timestamp?.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</span>
          </p>
        ))}
      </div>
      <div className='chat__footer'>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input value={input} onChange={(e)=>setInput(e.target.value)}
            type='text' placeHolder='Type a message'
          />
          <button type='submit' onClick={sendMessage}>Send</button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
