import React, { useState } from 'react'
import "./style.css";

const CreateRoom = ({view})=>{
    const [name,setName] = useState('');
    return (
        <div className='createRoom'>
           <div className='createRoom_header'>
                Create New Chat Room
           </div>
           <div className="createRoom_body">
               <div className='createRoom_input_wrapper'>
                    <label>Name</label>
                    <br />
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter the chat name"
                    />
               </div>
           </div>
        </div>
    )
}

export default CreateRoom;