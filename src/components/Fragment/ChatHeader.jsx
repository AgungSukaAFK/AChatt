import React from 'react'
// nanti ubah jadi menampilkan username bukannya userid
function ChatHeader({userId}) {
  return (
    <div className='text-center font-medium text-amber-100 bg-slate-900 fixed top-0 w-full h-auto md:max-w-3xl lg:max-w-4xl'>
        <p>Server: Global</p>
        <p>My UserId: {userId || userId}</p>
    </div>
  )
}

export default ChatHeader