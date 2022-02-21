import React, {useEffect, useState} from 'react';
import './SidebarChat.css';
import {Avatar} from '@material-ui/core';
import db from './Firebase';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SidebarChat({id, name, addNewChat}) {
  const [seed,setSeed]=useState("");
  const [messages, setMessages]=useState([]);
  const history = useHistory();

  useEffect(()=>{
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  

  const createChat =()=>{
    history.push("/createRoom");

    // const roomName = prompt("Prease enter room name");

    // if(roomName){
    //   //do database stuff....
    //   db.collection('rooms').add({
    //     name:roomName,
    //   });
    // }
  }

  useEffect(() =>{
    if(id){
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot)=>
          setMessages(snapshot.docs.map((doc)=>
            doc.data())
          )
        );

    }
  },[id])

  return !addNewChat ?(
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/male/${name}.svg`} />
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ):(
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat;
