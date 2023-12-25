import React from 'react'
import ChatFooter from './ChatFooter';
import MyChat from './MyChat';
import OtherChat from './OtherChat';

function MenuChat({selectedChat, isiChat, userId, activeChat}) {
  return (
    <>
        <div className="isi-chat bg-[#272a49] relative h-full rounded-lg overflow-hidden">

        {/* Header */}
        <div className="header h-auto py-2 flex flex-col justify-center items-center text-slate-300 text-xl font-sans font-bold border-b-[1px] border-b-slate-300/50 mx-4">
        <h1 className='justify-self-center'>{selectedChat}</h1>
        </div>

        {/* isi */}
        {selectedChat && isiChat? 
        <div className="chats chat-container flex flex-col items-start overflow-x-hidden overflow-y-auto w-full max-h-[83%] px-2 md:px-4">
        {isiChat.map((item, index) => {
            if (item.from === userId) {
            return <MyChat key={index} chat={item.chat} from={item.from} />;
            } else if (item.from !== userId && index !== 0) {
            return <OtherChat key={index} chat={item.chat} from={item.from} />;
            } else {
            return null;
            }
        }
        )}

        
        {/* Footer */}
        <ChatFooter userId={userId || null} address={activeChat}/>
        
        </div>
        : // Kalau gaada chat yang dipilih selectedChat && isiChat? 
        <div className='w-full h-full flex justify-center items-center flex-col gap-y-2'>
        <h1 className='text-2xl font-bold font-mono text-slate-300'>Belum ada chat yang dipilih🤔❔</h1>
        <h1 className='text-lg font-bold font-sans text-slate-300'>Silahkan pilih chat</h1>
        </div>

        }


        </div>
    </>
  )
}

export default MenuChat