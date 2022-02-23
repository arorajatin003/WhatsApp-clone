import React, { useState } from 'react'
// import {AddCircleOutlineIcon} from '@material-ui/icons';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./style.css";

const CreateRoom = ({view})=>{
    const [name,setName] = useState('');
    const [mode, setMode] = useState(0);
    const [email, setEmail] = useState('');
    const [members, setMembers] = useState([]);

    const addMember = (e)=>{
        if(e.key==='Enter'){
            setMembers([...members, email ]);
            setEmail('');
            console.log(members);
        }
    }
    const deleteMember = (idx)=>{
        members.filter((data,i)=>i!==idx);
    }
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
               <div className='createRoom_input_wrapper'>
                    <label>Mode</label>
                    <br />
                    <div className="createRoom_input_bigRadio_wrapper">
                        <div 
                            className={`createRoom_input_bigRadio ${mode===0 && 'createRoom_input_bigRadio_clicked'}`}
                            onClick={()=>setMode(0)}
                        >
                            Public
                        </div>
                        <div 
                            className={`createRoom_input_bigRadio ${mode===1 && 'createRoom_input_bigRadio_clicked'}`}
                            onClick={()=>setMode(1)}
                        >
                            Sami-public
                        </div>
                        <div 
                            className={`createRoom_input_bigRadio ${mode===2 && 'createRoom_input_bigRadio_clicked'}`}
                            onClick={()=>setMode(2)}
                        >
                            Private
                        </div>
                    </div>
               </div>
               {mode>0?
                    <div className='createRoom_input_wrapper'>
                        <label>Add members</label>
                        <br />
                        <input 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter user email and press enter to add"
                            onKeyPress={addMember}
                        />
                        { members.length>0 && 
                            <div className="membersList">
                                {
                                    members.map((val,idx)=>{
                                        return(
                                            <div className="members_wrapper">
                                                {val}
                                                <div className="deleteMember" onClick={()=>deleteMember(idx)}>
                                                    +
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                :""
               }
           </div>
        </div>
    )
}

export default CreateRoom;