import React from 'react';
import axios from 'axios';

function ChatFooter({userId, address}) {
  let api = "https://chat-api-agung.vercel.app/chat"
  function sendChat(e){
    e.preventDefault();
    let inputMessage = document.querySelector("input[name='teks']");
    let halamanChat = document.querySelector(".chat-container");
    // return null;
    // console.log(`userId: ${userId}`);
    // console.log(`chat: ${inputMessage.value}`);
    let input = {
      action: "send",
      chatAddress: address,
      chat: inputMessage.value,
      from: userId
    }

    let inputJson = JSON.stringify(input);
    console.log(inputMessage.value)
    // return
    if(input.chat){
      axios.post(api, inputJson, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }).then( (res)=> {
        if (res.status !== 200) {
          throw new Error('Request gagal coy, status ' + response.status);
        }
        inputMessage.value = "";
        // console.log(`scrhollheihgt: ${halamanChat.scrollHeight}`)
        setTimeout(() => {
          halamanChat.scrollTo({
            top: halamanChat.scrollHeight,
            behavior: 'smooth'
          })
        }, 1500); // Kenapa di set timeout? karena saat ini di scroll, heightnya akan mengacu pada halaman sebelum ditambah chat baru, maka dari itu perlu menunggu sampai chat baru dirender
      }).catch(err => {
        console.log(err)
      })
    }

  }
  return (
    <div className='w-full absolute bottom-0 h-auto px-4 py-2 bg-slate-800 '>
        <form action="" className=''>
            <input type="text" name='teks' placeholder='Write a message...' className='w-[85%] bg-slate-900 shadow-none transition duration-300 text-white py-2 px-4 m-0 h-10 box-border rounded-3xl mr-4 hover:shadow-blue-300/50 hover:shadow-sm'/>
            <button type="submit" className='bg-lime-500 w-[10%] h-10 box-border m-0 rounded-full transition duration-200 shadow-none hover:shadow-blue-300/50 hover:shadow-md' 
            onClick={sendChat}>KK</button>
        </form>
    </div>
    // <div className='w-full h-auto fixed bottom-0 px-4 py-2 bg-slate-800 md:max-w-3xl lg:max-w-4xl'>
    //     <form action="" className=''>
    //         <input type="text" name='teks' placeholder='Write a message...' className='w-[85%] bg-slate-900 shadow-none transition duration-300 text-white py-2 px-4 m-0 h-10 box-border rounded-3xl mr-4 hover:shadow-blue-300/50 hover:shadow-sm'/>
    //         <button type="submit" className='bg-lime-500 w-[10%] h-10 box-border m-0 rounded-full transition duration-200 shadow-none hover:shadow-blue-300/50 hover:shadow-md' onClick={sendChat}>KK</button>
    //     </form>
    // </div>
  )
}

export default ChatFooter