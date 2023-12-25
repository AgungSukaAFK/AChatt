import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Elements
import MyChat from '../Fragment/MyChat'
import OtherChat from '../Fragment/OtherChat'
import Achatt from '../Element/Achatt'
import ChatFooter from '../Fragment/ChatFooter'

function BetaLayout() {
  let [selectedChat, setSelectedChat] = useState(null) // as chatAddress
  let [activeChat, setActive] = useState(null)
  let [userId, setUserId] = useState(null);
  let [isiChat, setIsiChat] = useState(null);
  let [contact, setContact] = useState(null);
  let [publicGroup, setPublicGroup] = useState(null);
  let [menuSelected, setMenuSelected] = useState("Chat")

  let apiChat = "https://chat-api-agung.vercel.app/chat"
  let apiDashboard = "https://chat-api-agung.vercel.app/dashboard"

  function achattHandler(){
    window.open(`${window.location.origin}/`, "_blank")
  }

  function chatlistCardHandler(e){
    let room = e.currentTarget.getAttribute("listname"); // Global, Indonesia, Jamal / attribute listname grup nya
    let selected = document.querySelector(`[listname='${room}']`); 
    setActive(selected.attributes.listname.value) // Elemen yang terpilihnya
    console.log(activeChat) // Elemen yang terpilihnya
    let namaChat = selected.querySelector("h2").innerHTML;
    setSelectedChat(namaChat);
    let allListName = document.querySelectorAll('[listname]');

    allListName.forEach(item => {
      if(item.getAttribute("listname") == room){
        if(!selected.classList.contains("bg-white/10")){
          selected.classList.remove("bg-[#2c314e]")
          selected.classList.add("bg-white/10")
        }
      } else {
        item.classList.remove("bg-white/10")
        item.classList.add("bg-[#2c314e]")
      }
    })
  } 

  function dashboardButtonHanlder(){
    window.open(`${window.location.origin}/dashboard`, "_blank")
  }

  useEffect(() => {
    
    const fetchChat = async () => {
      if(!activeChat){
        return
      }
      let reqBody = {
        "action": "get",
        "chatAddress": `${activeChat}`
      }
      try {
        console.log(`Processing ${activeChat} chat`)
        const response = await axios.post(apiChat, reqBody, {
                                headers: {
                                  'content-type': 'application/json',
                                },
                                withCredentials: true
                              })
                                .then((response) => {
                                  const data = response.data;
                                  if (data) {
                                    return data
                                  } else {
                                    console.log('No chat found');
                                  }
                                })
                                .catch((error) => {
                                  console.log(error);
                                }); 
                                if(response.chats){
                                  setIsiChat(response.chats);
                                }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUser = async () => {
      try {
        let user = await axios.get(apiDashboard, {
                          headers: {
                            'content-type': 'application/json',
                          },
                          withCredentials: true
                        })
                        .then(res => {
                          let data = res.data
                          if(!data.user || !data.user.userId){
                            return null
                          }
                          return (data.user.userId? data.user : null);
                        })

        let userContact = await axios.get("https://chat-api-agung.vercel.app/user/contact", {
          headers: {
            'content-type': 'application/json',
          },
          withCredentials: true
        })
        .then(res => {
          let data  = res.data
          if(!data.contact || !data.contact.groupIds){
            return null
          }
          return (data.contact.groupIds? res.data.contact.groupIds : null)
        })
        
        if(user){
          setUserId(user.userId)
          setContact(userContact);
        }

      } catch (error) {
        console.log(error)
      }
    }

    const fetchPublicGroup = async () => {
      try{
        let publicGroups = await axios.get("https://chat-api-agung.vercel.app/group/public", {
          headers: {
            'content-type': 'application/json',
          },
          withCredentials: true
        })
        .then(res => {
          setPublicGroup(res.data.result)
        })
      } catch (err) {
        console.log(err)
      }
    }

    const intervalId = setInterval(() => {
      if(userId){
        fetchChat(); 
        if(!publicGroup){
          fetchPublicGroup();
        }
      } else {
        fetchUser();
      }
    }, 1000); // Interval setiap 1000 ms (1 detik)


    return () => {
      clearInterval(intervalId); // Membersihkan interval
    };

  });


  function menuHandler(e){
    e.preventDefault();
    let otherSpan = document.querySelectorAll("[listname='navbar'] span");
    let teks = e.currentTarget.innerText;
    setMenuSelected(teks)
    otherSpan.forEach(element => {
      if(element == e.currentTarget){
        // element.innerHTML = "Ahay" hover:bg-[#393053] hover:-translate-y-8 hover:scale-110
        element.classList.replace("scale-100", "scale-125");
        element.classList.replace("-translate-y-0", "-translate-y-9")
        element.classList.replace("bg-inherit", "bg-[#393053]")
      } else {
        element.classList.remove("scale-125", "-translate-y-9", "bg-[#393053]");
        element.classList.add("scale-100", "-translate-y-0", "bg-inherit")
      }
    });
  }

  return (
    <>
    {/* // Background */}
    <div className=' justify-center items-center bg-[#3d415c] md:w-full md:flex md:h-screen hidden w-0 h-0 '>
      {/* <LoadingScreen/> */}
      {/* Container dasar*/}
      {userId? 
      <div className='w-full h-screen max-h-screen bg-[#272a49] flex flex-col overflow-hidden md:w-[80%] md:rounded-[1rem] md:h-[90%] max-w-[1280px]'>

        {/* navbar di bagian atas container yang ada logo achatt nya */}
        <div className="navbar w-full text-lg font-bold text-slate-300 px-10 pt-8 bg-[#272a49] md:flex">
          
          {/* Logo achatt */}
          <div onClick={achattHandler} className='flex w-fit flex-row hover:cursor-pointer'>
            <svg role="img" width={40} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='#cbd5e1' d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 00-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 005.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56-.18-3-.15-6 .06-9 .06-.84.72-1.47 1.56-1.53 2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53.24 3 .24 6 .06 9-.12.93-.9 1.62-1.83 1.59h-3.15l-6 3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 00-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24zm-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 .33.18.63.48.78 1.62.78 3.42 1.2 5.22 1.26 1.8-.06 3.6-.48 5.22-1.26.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.648.648 0 00-.87-.36c-1.5.66-3.12 1.02-4.77 1.05-1.65-.03-3.27-.42-4.77-1.08a.566.566 0 00-.24-.06z"/></svg>
            <Achatt />
          </div>

          {/* Tombol logout */}
          <div className='grow flex justify-end gap-x-4'>
            <button className='w-fit px-4 py-1 text-lg font-bold font-mono text-slate-700 rounded-lg bg-blue-200 hover:text-slate-200 hover:bg-slate-700 transition duration-200' onClick={dashboardButtonHanlder}>Dashboard</button>
            <button className='w-fit px-4 py-1 text-lg font-bold font-mono text-slate-200 rounded-lg bg-red-700 hover:text-slate-400 hover:bg-slate-700 transition duration-200'>Logout</button>
          </div>

        </div>

        <div className="isi w-full h-full flex flex-row justify-evenly md:grow md:h-[85%] md:py-8">

          {/* Kotak pertama */}
          <div className="sidebar bg-[#272a49] h-full rounded-lg md:w-[360px] border-slate-300/80 border overflow-hidden box-border md:flex md:flex-col">

            {/* Header sidebar || Profil singkat*/}
            <div id="profil" className='w-full h-[30%] py-6 justify-center flex flex-col items-center bg-profile relative z-0 before:-z-10 before:absolute before:top-0 before:bottom-0 before:bg-black/50 before:w-full'>

              <div className='border-2 border-blue-400/60 rounded-full p-1 shadow-lg shadow-white/10'>
                <div id="profile-pic" className='w-24 h-24 rounded-full overflow-hidden'>
                  <img src="./../dist/img/tifa.jpg" alt="Profile Pic" className='h-full w-full object-cover'/>
                </div>
              </div>

              <div id="username">
                <p className='text-lg font-bold font-sans text-slate-200 drop-shadow-md'>MyUsername</p>
              </div>

              <div id="userId">
                <p className='text-base font-sans text-slate-200 drop-shadow-md'>User's ID</p>
              </div>

            </div>

            {/* Bagian daftar chats - title*/}
            <div id="chatlist-title" className='w-full h-auto py-3 px-4 bg-[#2c314e] border-b-4 border-b-slate-500'>
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
              : // Nyari public group dan conversation publicGroup?
              <div id="chatlist" className='w full max-h-full flex-grow flex flex-col items-center px-4 gap-2 pt-2 bg-[#2c314e] first:px-0 overflow-y-auto overflow-x-hidden'>
                {/* isian */}
                  <div {...{"listname":"global"}} className='chatlist-card w-full h-auto py-4 px-4 rounded-lg transition duration-200 bg-[#2c314e] hover:bg-white/10 hover:cursor-pointer' onClick={chatlistCardHandler}>
                    <h2 className='text-slate-200 font-sans font-semibold text-lg'>Loading</h2>
                  </div>
              </div>

            }

            <div className='w-full flex items-center px-4 my-2'>
              <button className='ont-bold font-mono bg-slate-200 text-slate-800 text-xl rounded-lg w-full h-auto py-2 hover:text-slate-200 hover:bg-slate-700 transition duration-200'>Tambah chat</button>
            </div>
            

          </div>

          {/* Kotak kedua di isi */}
          <div className="main bg-[#353956] h-full w-full rounded-lg md:w-[800px] md:p-4">

            {/* Bagian isi chat itu sendiri */}
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
              </div>
              : // Kalau gaada chat yang dipilih selectedChat && isiChat? 
              <div className='w-full h-full flex justify-center items-center flex-col gap-y-2'>
                <h1 className='text-2xl font-bold font-mono text-slate-300'>Belum ada chat yang dipilih🤔❔</h1>
                <h1 className='text-lg font-bold font-sans text-slate-300'>Silahkan pilih chat</h1>
              </div>
            
              }

              {/* Footer */}
              <ChatFooter userId={userId || null} address={activeChat}/>

            </div>

          </div>
        </div>
      </div>
      : // Kalau gaada userId
      <div className='w-full h-screen flex flex-col gap-8 justify-center items-center'>
        <h1 className='text-4xl font-bold text-slate-300'>Oops!</h1>
        <p className='text-xl text-slate-300'>Halaman yang dituju tidak ada.</p>
        <p className='text-xl text-slate-400'>
          Not logged in
        </p>
        <a href="/login" className='text-xl font-medium text-blue-600 underline'>Login disini</a>
      </div> 
      }

    </div>
    



    {/* DIV VVVVVVVVVVVVVVVVVVV*/}
  {userId?
    <div className='bg-[#18122B] flex-col w-full h-screen overflow-hidden flex md:hidden'>
      
      {/* Group */}
    <div id="chatlist-title" className='w-full h-auto py-3 px-4 bg-[#393053] border-b-4 border-b-slate-500'>
      <h2 className='text-slate-200 font-sans font-bold text-xl text-center'>📃 Daftar Chat 📃</h2>
      <h6 className='text-slate-200 font-sans text-base text-center mt-2'>🌐 Publik | 💬 Personal</h6>
    </div>

    {/* Daftar chat */}
    {publicGroup?
      <div id="chatlist" className='w full max-h-full flex-grow flex flex-col items-center px-4 gap-2 pt-2 bg-[#393053] first:px-0 overflow-y-auto overflow-x-hidden'>
        {/* isian */}
        {
          publicGroup.map((item, index) => {
            return(
              <div {...{"listname":item.groupName}} className='chatlist-card w-full h-auto py-4 px-4 rounded-lg transition duration-200 bg-[#393053] hover:bg-white/10 hover:cursor-pointer' onClick={chatlistCardHandler} key={index}>
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

      <div {...{"listname": "navbar"}} className='bg-[#443C68] w-full h-20 gap-4 flex justify-evenly items-center'>
        <span className='w-16 h-16 px-4 bg-inherit text-lg rounded-full flex items-center justify-center text-slate-300 font-bold font-mono transition duration-200 -translate-y-0 scale-100 hover:cursor-pointer hover:text-slate-100' onClick={menuHandler}>Group</span>
        
        <span className='w-16 h-16 px-4 text-lg rounded-full flex items-center justify-center text-slate-300 font-bold font-mono  transition duration-200  hover:cursor-pointer scale-125 -translate-y-9 bg-[#393053] hover:text-slate-100' onClick={menuHandler}>Chats</span>

        <span className='w-16 h-16 px-4 bg-inherit text-lg rounded-full flex items-center justify-center text-slate-300 font-bold font-mono  transition duration-200 -translate-y-0 scale-100 hover:cursor-pointer hover:text-slate-100' onClick={menuHandler}>About</span>
      </div>

    </div>

    : // Kalau gaada user

    <div className='w-full h-screen flex flex-col gap-8 justify-center bg-[#393053] items-center'>
      <h1 className='text-4xl font-bold text-slate-300'>Oops!</h1>
      <p className='text-xl text-slate-300'>Halaman yang dituju tidak ada.</p>
      <p className='text-xl text-slate-400'>
        Not logged in
      </p>
      <a href="/login" className='text-xl font-medium text-blue-600 underline'>Login disini</a>
    </div> 
  }
    
    </>
  )
}

export default BetaLayout