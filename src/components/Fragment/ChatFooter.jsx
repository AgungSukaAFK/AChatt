import React from 'react'

function ChatFooter() {
  return (
    <div className='w-full h-auto fixed bottom-0 px-4 py-2 bg-slate-800 md:max-w-3xl lg:max-w-4xl'>
        <form action="" className=''>
            <input type="text" placeholder='Write a message...' className='w-[85%] bg-slate-900 shadow-none transition duration-300 text-white py-2 px-4 m-0 h-10 box-border rounded-3xl mr-4 hover:shadow-blue-300/50 hover:shadow-sm'/>
            <button type="submit" className='bg-lime-500 w-[10%] h-10 box-border m-0 rounded-full transition duration-200 shadow-none hover:shadow-blue-300/50 hover:shadow-md'>KK</button>
        </form>
    </div>
  )
}

export default ChatFooter