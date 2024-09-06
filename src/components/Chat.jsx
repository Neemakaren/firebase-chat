import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import "../styles/Chat.css"


const Chat = ({room}) => {
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    const messagesRef = collection(db, "messages")

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"))
       const unsubscribe =  onSnapshot(queryMessages, (snapShot) => {
            let messages = []
            snapShot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessages(messages)
        })
        return () => unsubscribe()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(newMessage === "") return;
        
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room
        });
        setNewMessage("")
    }

    
  return (
    <section className='chat-app'>
        <div className='header'>
            <h1>welcome to: {room}</h1>
        </div>
        <div className='messages'>
            {
                messages.map((message) => (
                    <div className='message' key={message.id}>
                        <span className='user'>{message.user}:</span> {message.text}
                       
                    </div>
                ))
            }
        </div>
        <form onClick={handleSubmit} action="" className='new-message-form'>
        <input type="text"
             className='new-message-input' 
             placeholder='type your message here...' 
             onChange={(e) => setNewMessage(e.target.value)}
             value={newMessage}
             />
        <button type='submit' className='send-button'>send</button>
        </form>
    </section>
  )
}

export default Chat