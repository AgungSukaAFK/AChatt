import React from 'react'
import OtherChat from '../Fragment/OtherChat'
import MyChat from '../Fragment/MyChat'
import ChatHeader from '../Fragment/ChatHeader'
import ChatFooter from '../Fragment/ChatFooter'

function ChatLayout() {
  return (
    <div className='w-full h-auto min-h-screen text-base bg-slate-800 relative pb-12 md:max-w-3xl lg:max-w-4xl lg:text-lg mx-auto'>
        <ChatHeader />
        <chats className="flex flex-col items-start text-white w-full p-2">
            <OtherChat />
            <MyChat />
        </chats>
        <ChatFooter />
    </div>
  )
}

export default ChatLayout