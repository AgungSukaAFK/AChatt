import React, { useState, useEffect } from 'react'
import OtherChat from '../Fragment/OtherChat'
import MyChat from '../Fragment/MyChat'
import ChatHeader from '../Fragment/ChatHeader'
import ChatFooter from '../Fragment/ChatFooter'
// import navigasi from '../../utils/navigate'
import axios from 'axios'
import LoadingScreen from '../Fragment/LoadingScreen'

function ChatLayout() {

  let apiChat = "https://chat-api-agung.vercel.app/chat"
  let apiDashboard = "https://chat-api-agung.vercel.app/dashboard"
  
  let [isiChat, setIsiChat] = useState(null);
  let [userId,  setUserId] = useState(null);
  // let [isLoading, setIsLoading] = useState(0)
  
  
  useEffect(() => {
    document.querySelector(".loading-container").classList.remove("hidden")

  }, [])

  useEffect(() => {
    // console.log("useEffect")
    const fetchChat = async () => {
      // console.log("Chat fetch")
      try {
        const response = await axios.get(apiChat, {
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
                                if(response.globalChats){
          // console.log(response)
          setIsiChat(response.globalChats);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUser = async () => {
      // console.log("User fetch")
      try {
        let user = await axios.get(apiDashboard, {
                          headers: {
                            'content-type': 'application/json',
                          },
                          withCredentials: true
                        })
                        .then(res => {
                          let data = res.data
                          // console.log(data.user.userId);
                          if(!data.user.userId){
                            return null
                          }
                          return (data.user.userId? data.user : null);
                        })
        if(user){
          setUserId(user.userId)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const intervalId = setInterval(() => {
      // setIsLoading(false)
      // console.log("Loop")
      if(userId){
        fetchChat();
      } else {
        fetchUser();
      }
      // setIsLoading(isLoading + 1);
    }, 1000); // Interval setiap 1000 ms (1 detik)

    setTimeout(() => {
      document.querySelector(".loading-container").classList.add("hidden")
    }, 3000);

    return () => {
      clearInterval(intervalId); // Membersihkan interval
    };

  });

  return (
    <div className='w-full h-screen relative text-base bg-[#272a49] mx-auto md:max-w-3xl lg:max-w-4xl lg:text-lg overflow-y-scroll chat-container'>
      <LoadingScreen classAdd={"md:max-w-3xl lg:max-w-4xl"}/>
      {isiChat? 
      <div>
        <ChatHeader userId={userId || null}/>
        <div className="flex flex-col items-start text-white w-full p-2 my-12">
            {isiChat.map( (item, index) => {
                if (item.from === userId && index !== 0) {
                  return <MyChat key={index} chat={item.chat} from={item.from} />;
                } else if (item.from !== userId && index !== 0) {
                  return <OtherChat key={index} chat={item.chat} from={item.from} />;
                } else {
                  return null;
                }
              }
            )}
        </div>
        <ChatFooter userId={userId || null} />
      </div>
      : <div className='text-white text-2xl flex w-full h-full justify-center items-center'>
          <p className='text-center'>
            Tidak bisa mengakses halaman chat,<br />silahkan untuk <a href='/login' className='text-blue-600 hover:underline'>login</a> terlebih dulu
          </p>
        </div>}
    </div>
  )

}

export default ChatLayout