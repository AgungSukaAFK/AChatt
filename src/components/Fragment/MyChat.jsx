import React from 'react'

function MyChat({chat,  from}) {
  return (
    <div className="inline-block w-auto self-end max-w-[80%] text-end my-2">
        <p className='ml-2 text-blue-100 font-medium my-1'>{from || "USername"}</p>
        <p className='bg-indigo-800 py-2 px-3 rounded-xl text-slate-200 text-justify'>{chat || "Chats placeholder"}</p>
        {/* <p className='ml-2 text-slate-300'>06:12 AM</p> */}
    </div>
  )
}

export default MyChat