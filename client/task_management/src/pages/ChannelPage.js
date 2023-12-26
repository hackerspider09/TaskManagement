import React,{useState,useEffect,useContext} from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import { setToken,getToken } from '../utils/utils';
import { AxiosInstance,addAuthToken } from '../utils/axiosconfig';
import { APIContext } from '../context/APIcontext';
import ListComponent from "../components/ListComponent"

import AddUserModal from '../components/AddUserModal';
import TaskModal from '../components/TaskModal';
import TaskDisplay from '../components/TaskDisplay';
import PieChartComponent from '../components/PieChartComponent';
// import { AxiosInstance,addAuthToken } from '../utils/axiosconfig';
// import { setToken,getToken } from '../utils/utils';


const ChannelPage = () => {
    const { channelId } = useParams();
    const [channelName,setChannelName] = useState("")
    const navigate = useNavigate()
    const [crntUserIsAdmin,setCrntUserIsAdmin] = useState(false);
    const [channelUsersList,setChannelUsersList] = useState(null);
    const [addUsermodalEnable,setAddUserModalEnable] = useState(false);
    const [addTaskmodalEnable,setAddTaskModalEnable] = useState(false);


    const [channelTaskData,setChannelTaskData] = useState(null)
//   const {setUser} = useContext(APIContext)

    useEffect(()=>{
      addAuthToken(getToken())
        AxiosInstance.get(`/user/user-details/?channel=${channelId}`,)
        .then((response) => {
            // console.log("enter in userdetail channelid ");
            if (response.status) {
                setChannelTaskData(response.data.taskData)
            }
            else {
                // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                
            }
        })
        .catch((error) => {
            // console.log("axios error",error.response.status)
            if (error.response.status===401){
               navigate("/auth")
            }

        })
    },[])


    


    useEffect(()=>{
        addAuthToken(getToken())
        AxiosInstance.get(`/core/channel/${channelId}`)
        .then((response) => {
            if (response.status) {
                // console.log(response.data)
                setChannelName(response.data.channel_name)
                setChannelUsersList(response.data.members)
                if(response.data.status==='admin'){
                    setCrntUserIsAdmin(true)
                }
            }
            else {
                // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                // console.log("channel failed");
                
            }
        })
        .catch((error) => {
            // console.log("channel faile")  
                  

        })
    },[])

  return (
    <div className='p-4 sm:ml-64 '>
        <div className="w-full min-h-screen ">
            <div className='bg-bgColor5 flex justify-center  w-full  rounded-lg  text-white mb-1'>{channelName}</div>
            <div className='w-full h-full flex flex-wrap xl:flex-row flex-col '>
                
                {/* 1/2 */}
                <div className='xl:w-1/2 md:w-1/2 h-full '>

                    {/* w 1/2 */}
                    <div className='    h-full  '>
                        
                        {/* w 1/2 */}
                        <div className='xl:w-1/2'>

                            <div className='flex flex-col gap-2 border-dashed border-2 p-2 rounded-xl overflow-y-auto max-h-[40vh] m-1'>

                            

                            

                                {channelUsersList && channelUsersList.map((data,index)=>(
                                    <ListComponent key={index} data={data} />
                                    ))}

                                <div>
                                    {crntUserIsAdmin ? 
                                    <>
                                    <button onClick={()=>{setAddUserModalEnable(!addUsermodalEnable)}} className="w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-primary-700 focus:ring-primary-800" >Add Member</button>
                                    

                                    <AddUserModal enable={addUsermodalEnable} setEnable={setAddUserModalEnable} />
                                    </>
                                    : ""}
                                </div>
                            </div>
                        </div>


                        {/* h 1/2 */}
                        <div className='flex flex-col gap-2  rounded-xl overflow-y-auto overflow-x-auto py-10  m-1 xl:w-1/2'>
                            {/* <div className='flex flex-col'>
                                <span className='text-white bg-bgColor5 p-2 rounded-xl text-center'>Task assigned To Me</span>
                                <PieChartComponent pieData={pieDataTo} />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-white bg-bgColor5 p-2 rounded-xl text-center'>Task assigned By Me</span>
                                <PieChartComponent pieData={pieDataBy} />
                            </div> */}
                            <div className='flex flex-col gap-2 border-dashed border-2 p-2 rounded-xl overflow-y-auto max-h-[40vh] m-1'>
                                <span className='bg-bgColor5 p-2 w-full  rounded-lg  text-white text-center'>Completed : {channelTaskData?.completed}</span>
                                <span className='bg-bgColor5 p-2 w-full  rounded-lg  text-white text-center'>On Hold : {channelTaskData?.on_hold}</span>
                                <span className='bg-bgColor5 p-2 w-full  rounded-lg  text-white text-center'>Rejected : {channelTaskData?.rejected}</span>
                                <span className='bg-bgColor5 p-2 w-full  rounded-lg  text-white text-center'>Not Completed : {channelTaskData?.not_completed}</span>
                                
                            </div>
                        </div>

                        


                    </div>
                    

                    {/* 1/2 */}
                    <div>

                    </div>

                </div>
                
                {/* 1/2 */}
                <div className='xl:w-1/2 '>

                    <div className='p-2 rounded-xl xl:h-[80vh] overflow-y-auto flex  flex-col-reverse '>
                            <TaskDisplay data={channelUsersList}/>
                    </div>

                    <div className='flex justify-end'>
                    {crntUserIsAdmin ? 
                                <>
                    <button onClick={()=>{setAddTaskModalEnable(!addTaskmodalEnable)}} className=" text-white  focus:ring-4 m-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-primary-700 focus:ring-primary-800" >Add Task</button>
                    <TaskModal enable={addTaskmodalEnable} setEnable={setAddTaskModalEnable} data={channelUsersList}/>
                    </>
                                
                                : ""}
                    </div>
                   
                </div>
            </div>

        </div>
        
    </div>
  )
}

export default ChannelPage