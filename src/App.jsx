import { useState, useRef } from 'react';
import './App.css';
import Auth from './components/Auth';
import { signOut } from 'firebase/auth';

import Cookies from "universal-cookie";
import {auth} from './firebase-config'
import Chat from './components/Chat';

const cookies = new Cookies()


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }
 
  if(!isAuth) {
    return (
        <>
        <Auth setIsAuth={setIsAuth} />
        </>
    )
  }
  return (
    <>
      {
        room ? (
          <div>
            <Chat room={room} />
          </div>
        ) : (
          <div className='room'>
            <label htmlFor="">Enter Room Name</label>
            <input ref={roomInputRef} type="text" />
            <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
          </div>
        )
      }
      <div className="sign-out">
        <button onClick={signUserOut}>sign out</button>
      </div>
    </>
  )
}

export default App
