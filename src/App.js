import React, {useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router , Route, Link,Switch } from "react-router-dom";
import {useStateValue} from './stateProvider'
import CreateRoom from './CreateRoom'

function App() {
  const [{user}, dispatch] = useStateValue()
  const [mobileView,setMobileView ] = useState(false);
  const [timeout,setTimeout]=useState(false);
  const [backButton,setBackButton] = useState(true);
  let delay=250;

  const shiftMobileView = () =>{
    if(window.innerWidth<700){
      setMobileView(true);
    }else{
      setMobileView(false);
    }

    console.log(mobileView);
  }

  window.addEventListener('resize',function(){
    clearTimeout(timeout)
    setTimeout(shiftMobileView,delay)
  })
  // window.onpopstate = (e =>{
  //   if(backButton){
      
  //   }
  // })
  return (
    <div className="App">
    {!user ?(
      <Login />
    ):(
      <div className='app__body' >
      {!mobileView ?
        (<Router>
          <Sidebar view={mobileView}/>
          <Switch>
            <Route path='/rooms/:roomId'>
              <Chat view={mobileView}/>
            </Route>
            <Route path="/createRoom">
              <CreateRoom view={mobileView} />
            </Route>
            <Route path='/'>
              <Chat view={mobileView}/>
            </Route>
          </Switch>
        </Router>)
        :
        (<Router>
          <Switch>
          <Route exart path="/rooms/:roomId">
              <Chat view={mobileView} />
            </Route>
            <Route exart path="/">
              <Sidebar view={mobileView} />
            </Route>
          </Switch>
        </Router>)
      }

      </div>
      )}
    </div>

  );
}

export default App;
