import React from 'react'
import OtherChat from '../Fragment/OtherChat'
import MyChat from '../Fragment/MyChat'
import ChatHeader from '../Fragment/ChatHeader'
import ChatFooter from '../Fragment/ChatFooter'

function ChatLayout() {

  fetch("https://chat-api-agung.vercel.app/chat").then(res => {
    return res.json();
  }).then(res => {
    let isiChat = res.globalChats
    console.log(isiChat)
    console.log(`Jumlah chat: ${isiChat.length - 1 }`)

  }).catch(err => {
    console.log(err)
  })

  return (
    <div className='w-full h-screen relative text-base bg-slate-800 mx-auto md:max-w-3xl lg:max-w-4xl lg:text-lg overflow-y-scroll'>
        <ChatHeader />
        <div className="flex flex-col items-start text-white w-full p-2">
            <OtherChat />
            <MyChat />
        </div>
        <ChatFooter />
    </div>
  )
}

export default ChatLayout