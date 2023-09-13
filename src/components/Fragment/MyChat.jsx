import React from 'react'

function MyChat() {
  return (
    <myChat className="inline-block w-auto self-end max-w-[80%] text-end">
        <p id='username'  className='ml-2 text-blue-100 font-medium my-1'>Username</p>
        <p id='isi-chat' className='bg-indigo-800 py-2 px-3 rounded-xl text-slate-200 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis eos</p>
        <p id='waktu' className='ml-2 text-slate-300'>06:12 AM</p>
    </myChat>
  )
}

export default MyChat