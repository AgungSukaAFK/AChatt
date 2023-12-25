import axios from "axios";

export default async function playground(){
    let somevar = await axios.get("https://chat-api-agung.vercel.app/user/contact", {
        headers: {
            'content-type': 'application/json',
          },
          withCredentials: true
    })
    .then(res => {
        somevar = res
    })
    .catch(err => {
        somevar = err
    })

    return somevar
}