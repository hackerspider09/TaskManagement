import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { setToken,getToken } from '../utils/utils';
import { AxiosInstance,addAuthToken } from '../utils/axiosconfig';
import ListComponent from "../components/ListComponent"

import AddUserModal from '../components/AddUserModal';
import TaskModal from '../components/TaskModal';

const TaskDisplay = ({data}) => {
    const navigate = useNavigate()
    const { channelId } = useParams();
    const [channelTaskList,setChannelTaskList] = useState(null);
    const [displayTask,setDisplayTask] = useState(false)
    const [selectedTaskId, setSelectedTaskId] = useState(null);



    useEffect(()=>{
        addAuthToken(getToken())
        AxiosInstance.get(`/core/task/?channel=${channelId}`)
        .then((response) => {
            if (response.status) {
                setChannelTaskList(response.data)
                // console.log(response.data)
            }
            else {
                // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                // console.log("task fetch failed");
                
            }
        })
        .catch((error) => {
            // console.log("task fetch failed ",error)  
            if (error.response.status===401){
                navigate("/auth")
             }
                  

        })
    },[])


  return (
    <div className='w-full'>
        <div className='flex  flex-col flex-wrap '>
            {channelTaskList?.map((task,index)=>(
                <div className='flex flex-col items-center justify-between my-1 gap-1 bg-bgColor5 rounded-3xl'>
                    <div>
                        <p className='text-white text-2xl'>{task.title} </p>
                    </div>
                    <div className='flex  w-full flex-wrap justify-evenly'>
                        <div className='flex flex-col'>
                            <small>Assigned At</small>
                            <small>{task.createdAt}</small>
                        </div>
                        <div className='flex flex-col'>
                            <small>Deadline</small>
                            <small>{task.deadline}</small>
                        </div>

                    {/* </div> */}
                    {/* <div className='flex justify-evenly w-full'> */}

                    <div className='flex flex-col'>
                        <small>Status</small>
                        <small>{task.status}</small>
                    </div>
                    <div>
                        <button className='w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-1 text-center bg-blue-500 hover:bg-primary-700 focus:ring-primary-800' onClick={(e)=>{e.preventDefault(); setDisplayTask(!displayTask);setSelectedTaskId(task.id);}}>View</button>
                        {/* {
                            displayTask ?
                            <TaskModal data={data} enable={displayTask} setEnable={setDisplayTask} taskId={task.id} /> :"" 
                        } */}
                        {selectedTaskId === task.id && (
                            <TaskModal data={data} enable={true} setEnable={setSelectedTaskId} taskId={task.id} />
                            )}
                    </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TaskDisplay