import React from 'react'

function MenuGroup({publicGroup, chatlistCardHandler}) {
    // Fix dimana ketika di klik, elemen grup nya enggak ganti warna;
  return (
    <>
        <div id="chatlist-title" className='w-full h-auto py-3 px-4 bg-[#393053] border-b-4 border-b-slate-500'>
      <h2 className='text-slate-200 font-sans font-bold text-xl text-center'>📃 Daftar Chat 📃</h2>
      <h6 className='text-slate-200 font-sans text-base text-center mt-2'>🌐 Publik | 💬 Personal</h6>
    </div>

    {/* Daftar chat */}
    {publicGroup?
      <div id="chatlist" className='w full max-h-full flex-grow flex flex-col items-center px-4 gap-2 pt-2 bg-[#2c314e] first:px-0 overflow-y-auto overflow-x-hidden'>
        {/* isian */}
        {
          publicGroup.map((item, index) => {
            return(
              <div {...{"listname":item.groupName}} className='chatlist-card w-full h-auto py-4 px-4 rounded-lg transition duration-200 bg-[#2c314e] hover:bg-white/10 hover:cursor-pointer' onClick={chatlistCardHandler} key={index}>
                <h2 className='text-slate-200 font-sans font-semibold text-lg'>{item.kind == "public"? "🌐" : "💬"} {item.groupName}</h2>
              </div>
            )
          })
        }

      </div>
      :
      <div id="chatlist" className='w full max-h-full flex-grow flex flex-col items-center px-4 gap-2 pt-2 bg-[#393053] first:px-0 overflow-y-auto overflow-x-hidden'>
        {/* isian */}
          <div {...{"listname":"global"}} className='chatlist-card w-full h-auto py-4 px-4 rounded-lg transition duration-200 bg-[#393053] hover:bg-white/10 hover:cursor-pointer' >
            <h2 className='text-slate-200 font-sans font-semibold text-lg'>Loading ...</h2>
          </div>
      </div>
    }
    </>
  )
}

export default MenuGroup