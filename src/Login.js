import React from 'react'
import {Button} from '@material-ui/core'
import './Login.css'
import {auth,provider} from './Firebase'
import {actionType} from './reducer'
import {useStateValue} from './stateProvider'

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn=()=>{
    auth
      .signInWithPopup(provider)
      .then((result)=>{
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        })
      })
      .catch((error)=>alert(error.message));
  };
  return (
    <div className='login'>
       <div className='login__container'>
          <img
           src='https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/12/4/1417693419838/2352f5f7-484a-43e8-9ca5-00010c7d4a24-1020x1020.jpeg?width=140&quality=45&auto=format&fit=max&dpr=2&s=0aed5ecd654d82c2e5088d963e40fb3c'
           alt='Logo' />
           <div className='login__text'>
              <h1>Sign in to WhatsApp clone</h1>
           </div>
           <Button onClick={signIn}>
            Sign In with Google
           </Button>
       </div>
    </div>
  )
}

export default Login
