import Aos from 'aos'
import "aos/dist/aos.css";
import React, { useEffect } from 'react'

function Home() {

  // let element = document.getElementsByTagName("div")[0];

  // let m = ["Aduhai", "Jomoknya", "Umami"]
  // let i = 0;
  // let j = 0;
  // let gas = true
  // function type(){
  //   if(i < m[j].length && gas){
  //     element.innerHTML += m[j].charAt(i);
  //     i++
  //   } else if(gas) {
  //     gas = false
  //     setTimeout(() => {
  //       i = 0;
  //       if(j == m.length - 1){
  //         j = 0
  //       } else if(j < m.length){
  //         j++
  //       }
        
  //       element.innerHTML = "";
  //       gas = true
  //     }, 2000)
  //   }
  //   setTimeout(type, 100)
  // }

  // if(gas){
  //   type()
  // }

  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <div className='bg-gradient-to-br from-indigo-700 to-fuchsia-600 w-full h-screen flex justify-center'>
      <div className="flex flex-col justify-center border border-red-600 home-container w-full h-auto md:p-10 md:max-w-4xl">
        <div data-aos="fade-up" className='flex flex-row justify-center mb-8'>
          <svg role="img" width={40} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill='#cbd5e1' d="M11.999 0c-2.25 0-4.5.06-6.6.21a5.57 5.57 0 00-5.19 5.1c-.24 3.21-.27 6.39-.06 9.6a5.644 5.644 0 005.7 5.19h3.15v-3.9h-3.15c-.93.03-1.74-.63-1.83-1.56-.18-3-.15-6 .06-9 .06-.84.72-1.47 1.56-1.53 2.04-.15 4.2-.21 6.36-.21s4.32.09 6.36.18c.81.06 1.5.69 1.56 1.53.24 3 .24 6 .06 9-.12.93-.9 1.62-1.83 1.59h-3.15l-6 3.9V24l6-3.9h3.15c2.97.03 5.46-2.25 5.7-5.19.21-3.18.18-6.39-.03-9.57a5.57 5.57 0 00-5.19-5.1c-2.13-.18-4.38-.24-6.63-.24zm-5.04 8.76c-.36 0-.66.3-.66.66v2.34c0 .33.18.63.48.78 1.62.78 3.42 1.2 5.22 1.26 1.8-.06 3.6-.48 5.22-1.26.3-.15.48-.45.48-.78V9.42c0-.09-.03-.15-.09-.21a.648.648 0 00-.87-.36c-1.5.66-3.12 1.02-4.77 1.05-1.65-.03-3.27-.42-4.77-1.08a.566.566 0 00-.24-.06z"/></svg>
          <div className="text-4xl font-mono font-bold text-slate-300 ml-2">AChatt</div>
        </div>
        <div className="words text-center font-medium">
          <h1 data-aos="fade-up" data-aos-delay="100" className='text-4xl text-slate-300 font-extrabold font-sans border-b-2 border-slate-300 w-auto mb-6'>Placeholder</h1>
          <h3 data-aos="fade-up" data-aos-delay="200" className='text-slate-300 text-justify border border-white w-auto'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur aliquam aliquid provident, voluptatum veritatis eligendi cupiditate nihil natus. Sapiente consectetur vitae quaerat voluptatibus error nesciunt libero ipsam sed exercitationem alias?</h3>
        </div>
      </div>
    </div>
  )
}

export default Home