import React ,{useState,useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosInstance,addAuthToken } from '../utils/axiosconfig';
import { setToken,getToken } from '../utils/utils';
import { APIContext } from "../context/APIcontext";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AddIcon from '@mui/icons-material/Add';

import LiComponent from "./LiComponent"

import CloseIcon from '@mui/icons-material/Close';


const SideBar = () => {
    const [channelList,setChannelList] = useState(null)
    const [channelBtn,setChannelBtn] = useState(false)
    const {setChannelAdminMap} = useContext(APIContext)
    const [sideBarBtnClick,setSideBarBtnClick] = useState(true)

    const navigate = useNavigate()
    const signOut =()=>{
        console.log("signout")
      localStorage.removeItem('token')
      localStorage.removeItem('userIsLogedIn')
      navigate("/auth")
      window.location.reload()

    }

    const setChaannelMapInCOntext=(channelsData)=>{
        const adminMap = {};
    channelsData.forEach((channel) => {
      adminMap[channel.channel_id] = channel.status === 'admin';
    });
    setChannelAdminMap(adminMap);
    }

    useEffect(()=>{
        addAuthToken(getToken())
        AxiosInstance.get("/core/channel/",)
        .then((response) => {
            // console.log("enter in then ");
            if (response.status) {
                setChaannelMapInCOntext(response.data);
                setChannelList(response.data)
                // console.log(response.data)
            }
            else {
                // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                // console.log("fetch failed");
                
            }
        })
        .catch((error) => {
            // console.log("fetch faile")  
            if (error.response.status===401){
                navigate("/auth")
             }
                  

        })
    },[])


  return (
    <div className='pt-20'>

    <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg sm:hidden hover:bg-bgColor5 focus:outline-none focus:ring-2 focus:ring-gray-200 text-bgColor4  focus:ring-gray-600" onClick={()=>{setSideBarBtnClick(!sideBarBtnClick)}}>
    <span className="sr-only">Open sidebar</span>
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
    </button>

    <aside id="sidebar-multi-level-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sideBarBtnClick ? '-translate-x-full' : null} sm:translate-x-0`} aria-label="Sidebar">
    <div className="h-full px-3 py-4 overflow-y-auto bg-bgColor5   pt-20">
        <ul className="space-y-2 font-medium">
            {!sideBarBtnClick ? 
            <li className='flex justify-end text-white'>
                <span onClick={()=>{setSideBarBtnClick(!sideBarBtnClick)}}><CloseIcon /></span>
            </li>
            : null}
            <li>
                <a href="/channel/create/" className="flex items-center p-2  rounded-lg text-white  dark:hover:bg-bgColor6 group">
                <svg className="w-5 h-5 transition duration-75 text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <AddIcon fontSize="large" />

                </svg>
                <span className="ms-3">Create Channel</span>
                </a>
            </li>

            <li>
                <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-bgColor6 dark:text-white " aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick={(e)=>{setChannelBtn(!channelBtn)}}>
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                        <WorkOutlineIcon fontSize='large' />
                    </svg>
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Channels</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <ul id="dropdown-example" className={`${channelBtn ? "" :"hidden"} py-2 space-y-2`}>
                    {channelList && channelList.map((data,index)=>(
                            <LiComponent key={index} title={data.channel} path={data.channel_id} />
                    ))}
                    
                </ul>
            </li>
            
            <li>
                <button className="flex items-center p-2 rounded-lg text-white hover:bg-bgColor6 group w-full justify-start" onClick={signOut}>
                <svg className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" >
                    <ExitToAppIcon />
                </svg>
                <span className="flex justify-start ms-3 whitespace-nowrap">SignOut</span>
                
                </button>
            </li>
            
        </ul>
    </div>
    </aside>

   
    </div>

  )
}

export default SideBar