import React from 'react'

function OtherChat() {
  return (
    <chat className="inline-block w-auto self-start max-w-[80%]">
        <p id='username' className='ml-2 text-red-300 font-medium my-1'>Username</p>
        <p id='isi-chat' className='bg-slate-900 py-2 px-3 rounded-xl text-slate-200 text-justify'>Lorem ipsum dolor sit amet consectetur</p>
        <p id='waktu' className='ml-2 text-slate-300'>06:12 AM</p>
    </chat>
  )
}

export default OtherChat