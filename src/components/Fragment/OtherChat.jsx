import React from 'react'

function OtherChat({chat, from}) {
  return (
    <div className="inline-block w-auto self-start max-w-[80%] my-2">
        <p className='ml-2 text-red-300 font-medium my-1'>{from || "Username" }</p>
        <p className='bg-slate-900 py-2 px-3 rounded-xl text-slate-200 text-justify'>{chat || "Isi chat"}</p>
        {/* <p className='ml-2 text-slate-300'>06:12 AM</p> */}
    </div>
  )
}

export default OtherChat