import React from 'react'

function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col gap-8 justify-center items-center'>
      <h1 className='text-4xl font-bold'>Oops!</h1>
      <p className='text-xl'>Halaman yang dituju tidak ada.</p>
      <p className='text-xl'>
        404: Not Found
      </p>
      <a href="/" className='text-xl font-medium text-blue-600 underline'>Kembali ke halaman utama</a>
    </div>
  )
}

export default NotFound