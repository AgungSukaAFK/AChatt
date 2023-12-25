import React, { useEffect, useState } from 'react'
import axios from 'axios';
import playground from '../utils/playground'

function PlaygroundPage() {
    let [pg, setPg] = useState(null);
    let apiChat = "https://chat-api-agung.vercel.app/chat"
    useEffect(() => {
        async function playground(){
            let reqBody = {
                "action": "get",
                "chatAddress": "global"
            }
            const response = await axios.post(apiChat, reqBody, {
                headers: {
                  'content-type': 'application/json',
                },
                withCredentials: true
              })
                .then((response) => {
                  const data = response.data;
                  if (data) {
                    setPg(data.chats);
                  } else {
                    console.log('No chat found');
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
        }
        // async function playground(){
        //     let somevar = await axios.get("https://chat-api-agung.vercel.app/user/contact", {
        //         headers: {
        //             'content-type': 'application/json',
        //             },
        //             withCredentials: true
        //     })
        //     .then(res => {
        //         setPg(res.data.contact.groupIds)
        //     })
        //     .catch(err => {
        //         setPg(err)
        //     })
        // }

        playground()
        console.log(pg);
    }, [])

  return (
    <div>
        Hello
    </div>
  )
}

export default PlaygroundPage