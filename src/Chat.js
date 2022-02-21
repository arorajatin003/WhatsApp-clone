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
import axios from 'axios';

function Chat({view}){
  const [seed, setSeed]=useState('');
  const [input, setInput]=useState("");
  const {roomId} = useParams();
  const [roomName, setRoomName]=useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();
  // const [chMessage, setSendMessage] = useState(false);

  var url = "https://www.purgomalum.com/service/containsprofanity?text=";

  // var options = {
  //   method: 'POST',
  //   url: 'https://profanity-toxicity-detection-for-user-generated-content.p.rapidapi.com/',
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //     'x-rapidapi-host': 'profanity-toxicity-detection-for-user-generated-content.p.rapidapi.com',
  //     'x-rapidapi-key': '6636599010msh2a05586fe66a75cp131570jsnfdd2759596d0'
  //   },
  //   data: {text: 'You idiot! I will find where you live and kick you ass!'}
  // };
  // // const api = fetch('http://52.252.23.9:80/api/v1/service/deployment-aksprof/score');
  // // console.log(api);
  // useEffect(()=>{
  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //   }).catch(function (error) {
  //     console.error(error);
  //   });  
  // },[])

  
  
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
    console.log(url+input);
    // console.log(fetch(url+input));
    axios.request(url+input).then(function (response) {
          console.log(response.data);
          if(response.data){
            setInput('Try not to use velgure language');
          } 
        }).catch(function (error) {
          console.error(error);
        });
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('')
  }
  return (
    <div className={!view? 'chat':'chat_mobile'}>
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
