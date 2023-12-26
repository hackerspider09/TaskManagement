import React,{useEffect,useState,useContext} from 'react'
import { APIContext } from '../context/APIcontext'
const Navbar = () => {
    const [isClicked,setIsClicked]= useState(false)
    const {isLoggedIn} = useContext(APIContext)
    
  return (
    <div>
        <nav className="w-full z-50 fixed border-gray-200  bg-bgColor4">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">DevHub</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={()=>{setIsClicked(!isClicked)}}>
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className={`${isClicked ? "" :'hidden'} w-full md:block md:w-auto`} id="navbar-default">

      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  bg-bgColor4  border-gray-700">
        
        {isLoggedIn ?
        <>
        <li>
          <a href="/" className="block py-2 px-3  rounded bg-transparent text-white " aria-current="page">Home</a>
        </li>
        
        </>
          :
        <li>
          <a href="/auth" className="block py-2 px-3  rounded bg-transparent text-white ">Login/SignUp</a>
        </li>
          }
      </ul>
   
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar