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

function Sidebar({view}){
  const [rooms, setRooms]=useState([]);
  const [{user}, dispatch] = useStateValue();
  const [findRoom, setFindRoom] = useState('');
  const [found, setFound] =useState([null,null]);
  
  const searchRoom = (e)=>{
      e.preventDefault()
      //const foundRoom = rooms.find(o => o.data.name === findRoom)
      const foundRoom = rooms.find(o => {
        let str = o.data.name
        return str.includes(findRoom)
      })
      setFindRoom("");
      //console.log(a);
      //console.log(foundRoom.data.name);
      if(foundRoom){
        let l =[]
        l[0] = foundRoom.id
        l[1] = foundRoom.data.name
        setFound(l);
        console.log(found);
        
      }else{
        setFound([])
        console.log("Not found");
      }
  }

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
    <div className={!view? 'sidebar':'sidebar_mobile'}>
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
            <Input  
              value={findRoom}
              placeholder='Search or Start New Chat' 
              type='text'  
              onChange={(e)=>setFindRoom(e.target.value)} 
            />
            <button type="submit" onClick={searchRoom} hidden/>
          </form>
        </div>
      </div>
      
      <SidebarChat addNewChat/>
        {found[0]!=null ? 
          (
          <div className='sidebar__chats'>
          < SidebarChat key={found[0]} id={found[0]} name={found[1]} />
          </div>
          ):(
          <div className='sidebar__chats'>
          {rooms.map(room=>(
          <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
          ))}
          </div>
          )
          
        }
    </div>
  )
}

export default Sidebar;
