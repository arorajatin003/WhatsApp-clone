import React,{useEffect, useState} from 'react';
import './Sidebar.css';
import SettingsIcon from '@material-ui/icons/Settings';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import {SearchOutlined} from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton, Input} from '@material-ui/core';
import SidebarChat from './SidebarChat';
import db from './Firebase';
import {useStateValue} from './stateProvider'

function Sidebar(){
  const [rooms, setRooms]=useState([]);
  const [{user}, dispatch] = useStateValue();
  // const [findRoom, setFindRoom] = useState('');
  // const [found, setFound] =useState({});
  //
  // const searchRoom = (e)=>{
  //     e.preventDefault()
  //     setFindRoom()
  //     const foundRoom = rooms.find(o => o.data.name === findRoom)
  //     console.log(foundRoom);
  //     if(foundRoom){
  //       setFound(foundRoom);
  //       console.log(found);
  //     }
  // }

  useEffect(()=>{
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>(
      setRooms(snapshot.docs.map(doc=>
        ({
          id: doc.id,
          data: doc.data(),
        })
      )))
    );
    return ()=>{
      unsubscribe();
    }
  },[])


  return(
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar src={user?.photoURL}/>
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__container'>
          <form>
            <SearchOutlined />
            <Input  placeholder='Search or Start New Chat' type='text'   />
          </form>
        </div>
      </div>
      <div className='sidebar__chats'>
        <SidebarChat addNewChat/>
        
        {rooms.map(room=>(
          <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
        ))}
      </div>
    </div>
  )
}

export default Sidebar;
