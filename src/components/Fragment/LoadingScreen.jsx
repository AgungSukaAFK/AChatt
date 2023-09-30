import React from 'react'

function LoadingScreen({classAdd}) {
  return (
    <div className={`loading-container hidden w-screen h-screen fixed flex justify-center items-center z-30 bg-slate-800/70 ${classAdd}`}>
        <div className='loading-div flex justify-center items-center z-10 text-2xl bg-slate-800 text-white'></div>
        <span className='absolute text-xl font-bold text-white z-20 font-mono'>Loading</span>
    </div>
  )
}

export default LoadingScreen